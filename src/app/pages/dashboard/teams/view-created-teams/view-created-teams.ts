import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TeamService } from '../../../../services/team';
import { DeleteTeam } from '../delete-team/delete-team';
import { ManageTeam } from '../manage-team/manage-team';
import { Team } from '../../../../models/team';
import { ProfileService } from "../../../../services/profile";
import { ActivatedRoute } from '@angular/router';
import { Optional } from '@angular/core';

interface DialogData {
  typeForm?: number;
  tournament?: any;
}

@Component({
  selector: 'app-view-created-teams',
  standalone: true,
  imports: [CommonModule, MatDialogModule,],
  templateUrl: './view-created-teams.html',
  styleUrl: './view-created-teams.css',
})
export class ViewCreatedTeams implements OnInit {


  @Input() typeForm!: number;

  owner: any;
  teams$!: Observable<Team[]>;
  gestion: boolean = false;
  type:Number=-1;
  currentPage = 1;
  itemsPerPage = 5;



  constructor(
    private teamService: TeamService,
    private dialog: MatDialog,
    private profileService: ProfileService,
    @Optional() private route: ActivatedRoute,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData | null
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    let typeData:any,tournamentData


    this.profileService.getProfile().subscribe(owner => {
      if(this.data){
        typeData= this.data.typeForm
        tournamentData= this.data.tournament
        this.type = typeData
      }
      if (!owner) return;

      this.owner = owner;
      
      //let params = Number(this.route?.snapshot.paramMap.get('typeForm')) == 0 ? Number(this.route?.snapshot.paramMap.get('typeForm')) : undefined;
      
      
      console.log(this.route?.snapshot.paramMap);
      console.log('DATA:', this.data);
      console.log(this.typeForm);


      console.log('TYPE FINAL:', this.type);

      switch (this.type) {

        case -1:
          this.teams$ = this.teamService.getTeamsByOwner(owner.idPlayer);
          this.gestion = true;
          break;

        case -2:
          let tournament =this.data?.tournament
          this.teams$ =this.teamService.getTeamsByOwnerByCategory(owner.idPlayer, tournament.idTournament)
          this.gestion = false;
          break;

        default:
          break;
      }
    });
  }


  getPaginatedTeams(teams: Team[]) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return teams.slice(start, start + this.itemsPerPage);
  }

  getTotalPages(teams: Team[]) {
    return Math.ceil(teams.length / this.itemsPerPage);
  }

  openManageTeam(teamId: number) {
    this.dialog.open(ManageTeam, {
      width: '500px',
      data: { teamId }
    });
  }

  deleteTeam(id: number) {
    const dialogRef = this.dialog.open(DeleteTeam, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teamService.deteleTeam(id);
        alert('Equipo eliminado correctamente');
      }
    });
  }
}