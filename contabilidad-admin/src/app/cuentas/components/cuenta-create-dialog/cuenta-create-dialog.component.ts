import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { CuentaContable } from '../../models';

@Component({
  selector: 'sx-cuenta-create-dialog',
  template: `
      <sx-cuenta-form (save)="onSave($event)" [padre]="padre"
        (cancel)="dialogRef.close()"></sx-cuenta-form>
    `
})
export class CuentaCreateDialogComponent implements OnInit {
  padre: CuentaContable;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CuentaCreateDialogComponent>
  ) {
    this.padre = data.padre;
    console.log('Padre: ', this.padre);
  }

  ngOnInit() {}

  onSave(cuenta: Partial<CuentaContable>) {
    this.dialogRef.close(cuenta);
  }
}
