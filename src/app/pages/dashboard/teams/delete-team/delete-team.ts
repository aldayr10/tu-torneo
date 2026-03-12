import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog';

@Component({
  selector: 'app-delete-team',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './delete-team.html',
  styleUrls: ['./delete-team.css']
})
export class DeleteTeam {

  equipos = [
    { nombre: 'Team Alpha' },
    { nombre: 'Team Beta' },
    { nombre: 'Team Gamma' }
  ];

  constructor(private dialog: MatDialog) {}

  abrirDialogoEliminar(index: number) {

    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.equipos.splice(index, 1);
      }

    });

  }

}