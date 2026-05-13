import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


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
  
  constructor(

    private dialogRef: MatDialogRef<DeleteTeam>
  ) {}

  cancelar() {
    this.dialogRef.close()
  }

  confirmar() {
    this.dialogRef.close(true)
  }
}