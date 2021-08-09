import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";
import { EcontaTipo } from "app/econta/models";
import { EcontaDocument } from "app/econta/models/econta";

import { EcontaService } from "../../services";

@Component({
  selector: "sx-econta-item-buttons",
  template: `
    <ng-container>
      <button mat-button (click)="showXml()" matTooltip="Mostrar XML">
        <mat-icon>code</mat-icon>
        <mat-label>XML</mat-label>
      </button>

      <button mat-button (click)="downloadXml()" matTooltip="Descargar XML">
        <mat-icon>file_download</mat-icon>
        <mat-label>XML</mat-label>
      </button>

      <a mat-button
        href="https://ceportalvalidacionprod.clouda.sat.gob.mx/"
        target="_blank"
        rel="noopener"
        matTooltip="Validar XML en el portal del SAT" color="warning">
        <mat-icon >spellcheck</mat-icon>
        <span>Validar</span>
      </a>

      <button mat-button (click)="showAcuse()"
        matTooltip="Mostrar Acuse"
        [disabled]="!documento.acuseUrl">
        <mat-icon>code</mat-icon>
        <mat-label>Acuse</mat-label>
      </button>

      <button mat-button (click)="downloadAcuse()"
        matTooltip="Descargar Acuse"
        [disabled]="!documento.acuseUrl">
        <mat-icon>file_download</mat-icon>
        <mat-label>Acuse</mat-label>
      </button>

      <button
        color="accent"
        (click)="fileInput.click()"
        mat-button
        matTooltip="Subir Acuse" >
        <mat-icon >file_upload</mat-icon>
        <span>Acuse</span>
      </button>
      <input hidden
        (change)="uploadAcuse($event)" #fileInput type="file" id="file">

    </ng-container>
  `,
  styles: [
    `
      .mat-label {
        padding-left: 5px;
      }
      span {
        padding-left: 5px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcontaItemButtonsComponent implements OnInit {
  @Input()
  documento: EcontaDocument;

  @Input()
  tipo: EcontaTipo;

  @ViewChild("fileUpload")
  fileUpload: ElementRef;

  files = [];

  constructor(private service: EcontaService) {}

  ngOnInit() {}

  showXml() {
    this.service.mostrarXml(this.tipo, this.documento.id);
  }

  showAcuse() {
    this.service.mostrarAcuse(this.tipo, this.documento.id);
  }

  downloadXml() {
    const { id, fileName } = this.documento;
    this.service.descargarXml(this.tipo, id, fileName);
  }

  downloadAcuse() {
    const { id, fileName } = this.documento;
    this.service.descargarXml(this.tipo, id, fileName);
  }

  uploadAcuse(event: any) {
    if (event) {
      const file: File = event.target.files[0];
      if (file) {
        this.service.uploadAcuse(this.documento, this.tipo, file).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log("Errors: ", err);
          }
        );
      }
    }
  }
}
