import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sx-auxiliar-form',
  templateUrl: './auxiliar-form.component.html',
  styleUrls: ['./auxiliar-form.component.scss']
})
export class AuxiliarFormComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {}

  private buildForm() {
    this.form = this.fb.group({
      cuentaInicial: [null, [Validators.required]],
      cuentaFinal: [null, [Validators.required]],
      fechaInicial: [null, [Validators.required]],
      fechaFinal: [null, [Validators.required]]
    });
  }
}
