import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inpc } from 'app/inpc/models/inpc';

@Component({
  selector: 'sx-inpc-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inpc-modal.component.html',
  styleUrls: ['./inpc-modal.component.scss']
})
export class InpcModalComponent implements OnInit {
  form: FormGroup;
  inpc: Inpc;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InpcModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.inpc = data.inpc;
    this.buildForm();
  }

  ngOnInit() {
    if (this.inpc) {
      this.form.patchValue(this.inpc);
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      ejercicio: [2019, Validators.required],
      mes: [null, Validators.required],
      tasa: [0.0, Validators.required]
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
