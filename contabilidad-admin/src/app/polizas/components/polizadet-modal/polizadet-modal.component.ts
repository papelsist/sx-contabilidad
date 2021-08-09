import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CuentaContable } from 'app/cuentas/models';
import { PolizaDet } from '../../models';

@Component({
  selector: 'sx-polizadet-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './polizadet-modal.component.html',
  styleUrls: ['./polizadet-modal.component.scss']
})
export class PolizadetModalComponent implements OnInit {
  form: FormGroup;
  polizadet: Partial<PolizaDet>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PolizadetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.polizadet = data.polizadet;
    this.buildForm();
  }

  ngOnInit() {
    if (this.polizadet) {
      this.form.patchValue(this.polizadet);
    } else {
      const template =  {
        asiento: 'GENERICA',
        sucursal: 'OFICINAS',
        referencia: 'GENERICA',
        referencia2: 'GENERICA'
      };
      this.form.patchValue(template);
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      cuenta: [null, Validators.required],
      debe: [0.0, [Validators.required]],
      haber: [0.0, [Validators.required]],
      descripcion: [],
      asiento: [],
      sucursal: [],
      referencia: [],
      referencia2: [],
      uuid: []
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    if (this.form.valid) {
      const cuenta: CuentaContable = this.form.get('cuenta').value;
      const res = {
        ...this.form.value,
        cuenta,
        clave: cuenta.clave
      };
      this.dialogRef.close(res);
    }
  }
}
