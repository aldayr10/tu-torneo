import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../../../../services/request';
import { Request } from '../../../../../models/request';

@Component({
  selector: 'app-request-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-status.html',
  styleUrls: ['./request-status.css']
})
export class RequestStatus implements OnInit {
  solicitudes: Request[] = [];
  loading = false;
  error = '';

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.requestService.getRequests().subscribe({
      next: (requests) => {
        this.solicitudes = requests;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'No se pudieron cargar las solicitudes.';
        this.loading = false;
      },
    });
  }
}
