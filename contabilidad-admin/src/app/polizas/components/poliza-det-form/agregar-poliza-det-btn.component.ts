import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { PolizaDetComponent } from './poliza-det-form.component';
import { PolizaDet, Poliza } from 'app/polizas/models';

@Component({
  selector: 'sx-agregar-polizadet',
  template: `
    <a
      mat-fab
      matTooltip="Agregar"
      matTooltipPosition="before"
      color="accent"
      class="mat-fab-position-bottom-right z-3"
      (click)="crearPartida()"
    >
      <mat-icon>add</mat-icon>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgregarPolizadetBtnComponent implements OnInit {
  @Output()
  agregar = new EventEmitter();

  @Input()
  poliza: Poliza;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  crearPartida() {
    const ref = this.dialog.open(PolizaDetComponent, {
      data: { poliza: this.poliza },
      width: '750px'
    });
    ref.afterClosed().subscribe((partida: PolizaDet) => {
      if (partida) {
        this.agregar.emit(partida);
      }
    });
  }
}
