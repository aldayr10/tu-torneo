import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-tournament',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './delete-tournament.html',
  styleUrls: ['./delete-tournament.css']
})
export class DeleteTournament {
  
  constructor(

    private dialogRef: MatDialogRef<DeleteTournament>
  ) {}

  cancelar() {
    this.dialogRef.close()
  }

  confirmar() {
    this.dialogRef.close(true)
  }
}