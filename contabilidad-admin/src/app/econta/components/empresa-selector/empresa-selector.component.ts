import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit
} from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Empresa } from "app/econta/models";
import { EmpresasService } from "app/econta/services";

@Component({
  selector: "sx-econta-empresa-selector",
  template: `
    <h2 mat-dialog-title>
      Seleccionar empresa
    </h2>
    <div class="content">

      <mat-form-field [style.width.%]="100">
        <mat-select
          placeholder="Empresa"
          class="field"
          [(ngModel)]="selected"
        >
          <mat-option *ngFor="let empresa of empresas" [value]="empresa">
            {{ empresa.clave }}
          </mat-option>
          </mat-select>
      </mat-form-field>

    </div>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>
        CANCELAR
      </button>
      <button mat-button color="primary" [mat-dialog-close]="selected">
        <mat-label>ACEPTAR</mat-label>
      </button>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpresaSelectorComponent implements OnInit {
  empresas: Empresa[] = [];
  selected: Empresa = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private service: EmpresasService
  ) {
    this.selected = data.selected;
  }

  ngOnInit() {
    console.log("Curent: ", this.selected);
    this.service.list().subscribe(data => (this.empresas = data));
  }
}
