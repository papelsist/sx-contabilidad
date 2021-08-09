import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'sx-activo-create-modal',
  templateUrl: './create-activo-modal.component.html',
  styleUrls: ['./create-activo-modal.component.scss']
})
export class CreateActivoModalComponent implements OnInit {
  form: FormGroup;

  oficinas = {
    id: '402880fc5e4ec411015e4ec64161012c',
    clave: '1',
    nombre: 'OFICINAS'
  };

  constructor(
    public dialogRef: MatDialogRef<CreateActivoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      fecha: [new Date(), Validators.required],
      descripcion: [null, [Validators.required]]
    });
  }

  submit() {
    if (this.form.valid) {
      const { id } = this.form.get('proveedor').value;
      const sucursal = this.form.get('sucursal').value || this.oficinas;
      const data = {
        ...this.form.value,
        fecha: new Date(),
        proveedor: id,
        sucursal: sucursal.id
      };
      this.dialogRef.close(data);
    }
  }
}
