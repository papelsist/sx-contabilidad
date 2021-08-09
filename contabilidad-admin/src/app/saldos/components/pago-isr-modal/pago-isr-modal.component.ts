import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'sx-pago-isr-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pago-isr-modal.component.html',
  styleUrls: ['./pago-isr-modal.component.scss']
})
export class PagoIsrModalComponent implements OnInit {
  form: FormGroup;
  mes: number;
  ejercicio: number;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PagoIsrModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildForm();
    this.ejercicio = data.ejercicio;
    this.mes = data.mes;
  }

  ngOnInit() {}

  private buildForm() {
    this.form = this.fb.group({
      utilidadFiscalAf: [0.0, Validators.required],
      cfUtilidad: [1.79, Validators.required],
      perdidaFiscal: [0.0, Validators.required],
      tasaIsr: [30.0, Validators.required],
      isrAcreDiv: [0.0, Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
