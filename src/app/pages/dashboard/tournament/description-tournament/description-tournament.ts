import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Tournament } from '../../../../models/tournament';
import { CatTypeTeam } from '../../../../services/cat-type-team';

@Component({
  selector: 'app-description-tournament',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './description-tournament.html',
  styleUrl: './description-tournament.css',
})
export class DescriptionTournament implements OnInit{
  tournamentData: any = {};
  catalogoTeam: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DescriptionTournament>,
    @Inject(MAT_DIALOG_DATA) public data: { tournament: Tournament },
    private catalogoTipoEquipo: CatTypeTeam,
  ) {}

  ngOnInit(): void {
    this.catalogoTeam = this.catalogoTipoEquipo.getCatTypeTournamentTeam();
    const tournament = this.data.tournament;
    this.tournamentData = {
      name: tournament.name,
      description: tournament.description ?? 'Sin descripción',
      owner: tournament.owner?.name ?? `Usuario #${tournament.idOwner}`,
      category: this.catalogoTeam.find((type: any) => type.id === tournament.categoryId)?.name ?? `Categoría ${tournament.categoryId}`,
      estado: tournament.estado,
    };
  }

  inscribirse() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}
