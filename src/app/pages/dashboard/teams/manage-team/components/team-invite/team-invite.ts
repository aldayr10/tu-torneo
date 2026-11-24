import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../../../../../services/request';
import { AuthService } from '../../../../../../services/auth';
import { Team } from '../../../../../../models/team';
import { Request } from '../../../../../../models/request';

@Component({
  selector: 'app-team-invite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-invite.html',
  styleUrls: ['./team-invite.css']
})
export class TeamInvite implements OnInit, OnChanges {

  @Input() team!: Team;
  @Output() changed = new EventEmitter<void>();

  inviteLink = '';
  pendingRequests: Request[] = [];
  loading = false;
  message = '';
  isOwner = false;

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.refresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['team']) {
      this.refresh();
    }
  }

  private refresh(): void {
    if (!this.team) return;
    const code = this.team?.invitationCode ?? (this.team as any)?.code ?? '';
    this.inviteLink = code ? `${window.location.origin}/player-join-team?code=${code}` : '';
    const user = this.authService.getCurrentUser();
    this.isOwner = !!user && user.idUser === this.team.ownerId;
    this.loadPendingRequests();
  }

  loadPendingRequests(): void {
    if (!this.team?.idTeam) return;
    this.loading = true;
    this.requestService.getRequestsByTeam(this.team.idTeam).subscribe({
      next: requests => {
        this.pendingRequests = requests.filter(r => r.type === 'Unirse' && r.status === 'Pendiente');
        this.loading = false;
      },
      error: () => {
        this.pendingRequests = [];
        this.loading = false;
      }
    });
  }

  accept(request: Request): void {
    this.requestService.updateStatus(request.idRequest, 'Aceptada').subscribe({
      next: () => {
        this.message = 'Solicitud aceptada.';
        this.loadPendingRequests();
        this.changed.emit();
      },
      error: (err) => {
        this.message = err?.error?.message || 'No se pudo aceptar la solicitud.';
      }
    });
  }

  reject(request: Request): void {
    this.requestService.updateStatus(request.idRequest, 'Rechazada').subscribe({
      next: () => {
        this.message = 'Solicitud rechazada.';
        this.loadPendingRequests();
        this.changed.emit();
      },
      error: (err) => {
        this.message = err?.error?.message || 'No se pudo rechazar la solicitud.';
      }
    });
  }

  copyCode() {
    const code: string = String(this.team?.invitationCode ?? (this.team as any)?.code ?? '');
    navigator.clipboard.writeText(code);
  }

  copyLink() {
    navigator.clipboard.writeText(this.inviteLink);
  }
}
