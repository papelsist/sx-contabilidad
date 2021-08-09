import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit
} from "@angular/core";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Empresa } from "app/econta/models";

@Component({
  selector: "sx-econta-sql-form",
  template: `
    <div mat-dialog-title>
      SQL Query para {{title}}
    </div>
    <div class="form">
      <h3>{{empresa.clave}}</h3>
      <mat-divider></mat-divider>
      <textarea [(ngModel)]="sql" rows="25"></textarea>
    </div>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]>
        CANCELAR
      </button>
      <button mat-button color="primary" (click)="onSubmit()">
        <mat-label>SALVAR</mat-label>
        <mat-icon>save</mat-icon>
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .form {
        display: flex;
        flex-direction: column;

        textarea {
          width: 100%;
          height: 100%
          flex: 1 0 0;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SqlFormComponent implements OnInit {
  empresa: Empresa;
  sql: string;
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<SqlFormComponent>
  ) {
    this.empresa = data.empresa;
    this.title = data.title;
    this.sql = data.sql;
  }

  ngOnInit() {}

  onSubmit() {
    this.dialogRef.close(this.sql);
  }
}
