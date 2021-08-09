import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivoFijo } from 'app/activo-fijo/models/activo-fijo';

@Component({
  selector: 'sx-activo-baja-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activo-baja-modal.component.html',
  styleUrls: ['./activo-baja-modal.component.scss']
})
export class ActivoBajaModalComponent implements OnInit {
  form: FormGroup;
  activo: ActivoFijo;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ActivoBajaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.activo = data.activo;
    this.buildForm();
  }

  ngOnInit() {}

  private buildForm() {
    this.form = this.fb.group({
      fecha: [new Date(), Validators.required],
      comentario: [null],
      facturaSerie: [null],
      facturaFolio: [null],
      fechaFactura: [null],
      importeDeVenta: [null]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    if (this.form.valid) {
      const fecha: Date = this.form.get('fecha').value;
      const fechaFactura: Date = this.form.get('fechaFactura').value;
      const res = {
        ...this.form.value,
        fecha: fecha.toISOString(),
        fechaFactura: fechaFactura ? fechaFactura.toISOString() : null,
        activo: { id: this.activo.id }
      };
      this.dialogRef.close(res);
    }
  }
}
