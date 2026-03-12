import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'confirm-delete-dialog',
  standalone: true,
  template: `
  
  <h2 mat-dialog-title>Eliminar equipo</h2>

  <mat-dialog-content>
    ¿Estás seguro de que deseas eliminar este equipo?
  </mat-dialog-content>

  <mat-dialog-actions align="end">
  
    <button mat-button (click)="cancelar()">Cancelar</button>

    <button mat-raised-button color="warn" (click)="confirmar()">
      Eliminar
    </button>

  </mat-dialog-actions>

  `
})
export class ConfirmDeleteDialogComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>) {}

  cancelar() {
    this.dialogRef.close(false);
  }

  confirmar() {
    this.dialogRef.close(true);
  }

}