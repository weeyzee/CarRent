import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface ConfirmDialogData {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.title || 'Подтверждение' }}</h2>
    <mat-dialog-content class="text-base">{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button *ngIf="data.showCancel !== false" (click)="close(false)">
        {{ data.cancelText || 'Отмена' }}
      </button>
      <button mat-flat-button color="primary" (click)="close(true)">
        {{ data.confirmText || 'ОК' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content { margin-top: 8px; }
  `],
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule
  ]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}
