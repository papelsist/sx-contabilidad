import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl
} from '@angular/forms';

import { Poliza } from '../../models';

import * as _ from 'lodash';

import { Subscription, BehaviorSubject } from 'rxjs';
import { Update } from '@ngrx/entity';
import { PolizaDet } from 'app/polizas/models/poliza-det';
import { PolizaPartidasTableComponent } from '../poliza-partidas-table/poliza-partidas-table.component';
import { TdDialogService } from '@covalent/core';
import { MatDialog } from '@angular/material';
import { ComprobantesDialogComponent } from '../comprobantes-dialog/comprobantes-dialog.component';
import { ReclasificarModalComponent } from '../reclasificar/reclasificar-modal.component';
import { PolizadetModalComponent } from '../polizadet-modal/polizadet-modal.component';
import { ProrrateoModalComponent } from '../prorrateo-modal/prorrateo-modal.component';

@Component({
  selector: 'sx-poliza-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './poliza-form.component.html',
  styles: [
    `
      .mat-card {
        width: calc(100% - 15px);
        height: calc(100% - 10px);
      }
    `
  ]
})
export class PolizaFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  poliza: Poliza;

  @Output()
  update = new EventEmitter<Update<Poliza>>();

  @Output()
  recalcular = new EventEmitter();

  @Output()
  cancel = new EventEmitter();

  @Output()
  delete = new EventEmitter();

  @Output()
  cerrar = new EventEmitter();

  @Output()
  print = new EventEmitter();

  @Output()
  comprobantes = new EventEmitter<{ id: number; tipo: 'N' | 'S' | 'P' }>();

  @Output()
  toogleManual = new EventEmitter();

  @Output()
  generarComplementosDePago = new EventEmitter();

  @Output()
  cambiarFormaDePago = new EventEmitter();

  @Output()
  prorratearPartida = new EventEmitter<{ polizaDetId: number; data: any }>();

  subscription: Subscription;

  form: FormGroup;

  debe = new BehaviorSubject<number>(0.0);
  haber = 0.0;

  totales$ = new BehaviorSubject<{
    debe: number;
    haber: number;
    cuadre: number;
  }>({ debe: 0, haber: 0, cuadre: 0 });

  @ViewChild('partidasGrid')
  partidasGrid: PolizaPartidasTableComponent;

  constructor(
    private fb: FormBuilder,
    private chr: ChangeDetectorRef,
    private dialogService: TdDialogService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.poliza && changes.poliza.currentValue) {
      this.setPoliza();
      this.chr.detectChanges();
      // console.log('Poliza: ', this.poliza);
    }
  }

  setPoliza() {
    if (!this.form) {
      this.buildForm();
    }
    this.form.patchValue(this.poliza);
    const debe = _.sumBy(this.poliza.partidas, 'debe');
    const haber = _.sumBy(this.poliza.partidas, 'haber');
    const cuadre = debe - haber;

    this.totales$.next({ debe, haber, cuadre });

    if (this.poliza.cierre) {
      this.form.disable();
    }
  }

  private buildForm() {
    if (!this.form) {
      this.form = this.fb.group({
        concepto: [null, [Validators.required]],
        manual: [false, [Validators.required]]
      });
    }
  }

  onUpdate() {
    if (this.poliza.manual) {
      if (this.form.valid && !this.form.disabled) {
        const changes = { concepto: this.form.get('concepto') }
          ? { ...this.form.value }
          : {};
        const entity: Update<Poliza> = {
          id: this.poliza.id,
          changes
        };
        this.update.emit(entity);
        this.form.markAsPristine();
      }
    }
  }

  get partidas() {
    return this.poliza.partidas;
  }

  get cuadre() {
    return 0.0;
  }

  onTotales(event: { debe: number; haber: number }) {
    const cuadre = event.debe - event.haber;
    this.totales$.next({
      ...event,
      cuadre
    });
    this.chr.detectChanges();
  }

  onPrint() {
    this.partidasGrid.printGrid();
  }

  actualizarManual(event: Poliza) {
    this.toogleManual.emit(event);
  }

  changeConcepto() {
    if (this.poliza.manual) {
      this.dialogService
        .openPrompt({
          title: 'Cambio de concepto',
          message: 'Concepto:',
          value: this.form.get('concepto').value,
          acceptButton: 'ACEPTAR',
          cancelButton: 'CANCELAR'
        })
        .afterClosed()
        .subscribe(res => {
          if (res) {
            this.form.get('concepto').setValue(res);
            this.form.markAsDirty();
            this.chr.detectChanges();
          }
        });
    }
  }

  get concepto() {
    return this.form.get('concepto').value;
  }

  mostrarComprobantes(poliza: Poliza, tipo: string) {
    // console.log('Comprobantes de la poliza: ', poliza);
    this.dialog
      .open(ComprobantesDialogComponent, {
        data: { poliza, tipo },
        width: '650px'
      })
      .afterClosed()
      .subscribe(res => {});
  }

  doubleClick(data: any) {
    const clave: string = data.clave;
    if (clave.startsWith('105')) {
      const asiento: string = data.asiento;
      if (asiento.includes('OGST') || asiento.includes('FICHA_EFE')) {
        if (data.haber >= 0.01 && data.haber <= 1.0) {
          let tipo = '';
          let nvoTipo = '';
          if (asiento.includes('OGST')) {
            tipo = 'PAGO_DIF';
            nvoTipo = 'EFECTIVO';
          } else {
            tipo = 'EFECTIVO';
            nvoTipo = 'PAGO_DIF';
          }

          const msg = `CAMBIAR EL COBRO A TIPO: ${nvoTipo}`;
          this.dialogService
            .openConfirm({
              title: 'CAMBIO DE FORMA DE PAGO',
              message: msg,
              cancelButton: 'CANCELAR',
              acceptButton: 'ACEPTAR',
              width: '600px'
            })
            .afterClosed()
            .subscribe(res => {
              if (res) {
                this.cambiarFormaDePago.emit({
                  id: data.origen,
                  formaDePago: nvoTipo
                });
              }
            });
        }
      }
    }
  }

  onReclasificar(event: { row: any; data: any }) {
    this.dialog
      .open(ReclasificarModalComponent, {
        data: { clave: event.data.clave, descripcion: event.data.concepto },
        width: '750px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          const partidas = [...this.poliza.partidas];
          const partida: Partial<PolizaDet> = partidas.find(
            det => det.id === event.data.id
          );
          partida.cuenta = { id: res.id };
          this.update.emit({ id: this.poliza.id, changes: { partidas } });
        }
      });
  }

  onInsert() {
    this.dialog
      .open(PolizadetModalComponent, {
        data: {},
        width: '750px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          const partidas = [...this.poliza.partidas];
          partidas.push(res);
          this.update.emit({ id: this.poliza.id, changes: { partidas } });
        }
      });
  }

  onEdit(event: Partial<PolizaDet>) {
    this.dialog
      .open(PolizadetModalComponent, {
        data: { polizadet: event },
        width: '750px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          const partidas = [...this.poliza.partidas];
          const partida: Partial<PolizaDet> = partidas.find(
            det => det.id === event.id
          );
          _.assign(partida, res);
          this.update.emit({ id: this.poliza.id, changes: { partidas } });
        }
      });
  }

  onCopy(event: Partial<PolizaDet>) {
    const partidas: any[] = [...this.poliza.partidas];
    const index = partidas.findIndex(item => item.id === event.id);
    const targetIdx = index + 1;

    const clone: Partial<PolizaDet> = {
      cuenta: event.cuenta,
      clave: event.clave,
      debe: event.debe || 0.0,
      haber: event.haber || 0.0,
      concepto: event.concepto,
      descripcion: event.descripcion,
      asiento: event.asiento,
      referencia: event.referencia,
      referencia2: event.referencia2,
      origen: event.origen,
      entidad: event.entidad,
      documento: event.documento,
      documentoTipo: event.documentoTipo,
      documentoFecha: event.documentoFecha,
      sucursal: event.sucursal
    };
    partidas.splice(targetIdx, 0, clone);
    this.update.emit({ id: this.poliza.id, changes: { partidas } });
  }

  onDelete(event: { index: number; data: Partial<PolizaDet> }) {
    this.dialogService
      .openConfirm({
        title: 'Mantenimiento de poliza',
        message: `Eliminar partida ${event.index + 1}
          Cuenta: ${event.data.clave}
          Debe: ${event.data.debe || 0.0}
          Haber: ${event.data.haber}`,
        acceptButton: 'ACEPTAR',
        cancelButton: 'CANCELAR',
        minWidth: '650px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          // console.log('Eliminando ', event.index);
          const partidas: any[] = [...this.poliza.partidas];
          partidas.splice(event.index, 1);
          // console.log('After: ', partidas);
          // this.partidasGrid.gridApi.setRowData(partidas);
          this.update.emit({ id: this.poliza.id, changes: { partidas } });
        }
      });
  }

  onProrratear(event: { index: number; data: Partial<PolizaDet> }) {
    this.dialog
      .open(ProrrateoModalComponent, {
        data: { polizadet: event.data }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.prorratearPartida.emit({
            polizaDetId: event.data.id,
            data: res
          });
        }
      });
  }
}
