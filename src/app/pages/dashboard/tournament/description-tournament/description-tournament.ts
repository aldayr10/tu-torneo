import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Tournament } from '../../../../models/tournament';
import { PlayerService } from '../../../../services/player';
import { CatTypeTeam } from '../../../../services/cat-type-team';

@Component({
  selector: 'app-description-tournament',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './description-tournament.html',
  styleUrl: './description-tournament.css',
})
export class DescriptionTournament implements OnInit{
  tournamentData:any={}
  catalogoTeam:any[]=[];
  owner:any=[]
  constructor(
    public dialogRef: MatDialogRef<DescriptionTournament>,
    @Inject(MAT_DIALOG_DATA) public data: { tournament: Tournament },
    private playerService:PlayerService,
    private catalogoTipoEquipo: CatTypeTeam,
  ) {

    this.owner=playerService.getPlayerByIdUser(data.tournament.idOwner)
    console.log(this.owner);
    
  }
  
  ngOnInit(): void {
    
    this.catalogoTeam=this.catalogoTipoEquipo.getCatTypeTournamentTeam()
    console.log(this.catalogoTeam);
    
    
    
    this.tournamentData={
      'name':this.data.tournament.name,
      'description':this.data.tournament.description,
      'owner':this.owner.name,
      'category': this.catalogoTeam.find((type:any)=>type.id==this.data.tournament.categoryId).name
    }
    console.log(this.data);
    
  }

  inscribirse() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}
