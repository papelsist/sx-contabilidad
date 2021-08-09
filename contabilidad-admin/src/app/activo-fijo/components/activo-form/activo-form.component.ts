import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { ActivoFijo } from 'app/activo-fijo/models/activo-fijo';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as moment from 'moment';
import * as _ from 'lodash';

import { Depreciacion } from 'app/activo-fijo/models/depreciacion';

@Component({
  selector: 'sx-activo-form',
  templateUrl: './activo-form.component.html',
  styleUrls: ['./activo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivoFormComponent implements OnInit {
  @Input()
  activo: ActivoFijo;

  _depreciaciones: Depreciacion[] = [];

  @Output()
  save = new EventEmitter<Partial<ActivoFijo>>();

  @Output()
  update = new EventEmitter<{ id: number; changes: Partial<ActivoFijo> }>();

  @Output()
  findGasto = new EventEmitter();

  form: FormGroup;

  STORE_KEY = 'sx-activo-form';

  tabIndex = 0;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    if (this.activo) {
      // console.log('Activo: ', this.activo);
      this.form.patchValue(this.activo);
      this.tabIndex =
        parseFloat(localStorage.getItem(this.STORE_KEY + '.tab')) || 0;
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      adquisicion: [new Date(), [Validators.required]],
      gastoDet: [null],
      facturaSerie: [],
      facturaFolio: [],
      facturaFecha: [],
      uuid: [],
      descripcion: [null, [Validators.required]],
      serie: [],
      modelo: [],
      proveedor: [],
      sucursalOrigen: [null],
      sucursalActual: [null],
      departamentoOrigen: [],
      departamentoActual: [],
      consignatario: [],
      cuentaContable: [null, [Validators.required]],
      montoOriginal: [0.0, [Validators.required, Validators.min(10.0)]],
      montoOriginalFiscal: [0.0, [Validators.required, Validators.min(10.0)]],
      depreciacionInicial: [0.0, [Validators.required]],
      tasaDepreciacion: [
        0.0,
        [Validators.required, Validators.min(0), Validators.max(70)]
      ]
    });
  }

  isValid() {
    return this.form.valid;
  }
  isPristine() {
    return this.form.pristine;
  }

  get gasto() {
    return this.form.get('gastoDet').value;
  }

  submit() {
    if (this.form.valid) {
      const data = this.resolveData();
      if (!this.activo) {
        this.save.emit(data);
      } else {
        this.update.emit({ id: this.activo.id, changes: data });
      }
    }
  }

  private resolveData(): Partial<ActivoFijo> {
    const fecha = moment(this.form.get('adquisicion').value).toISOString();
    return {
      ...this.form.value,
      fecha
    };
  }

  onTabSelected(event) {
    localStorage.setItem(this.STORE_KEY + '.tab', event.toString());
  }

  get depreciacionAcumulada() {
    return _.sumBy(this._depreciaciones, 'depreciacion');
  }

  @Input()
  set depreciaciones(data: Depreciacion[]) {
    this._depreciaciones = data;
    if (this._depreciaciones.length > 0) {
      this.form.get('adquisicion').disable();
      this.form.get('montoOriginal').disable();
      this.form.get('tasaDepreciacion').disable();
      // this.form.get('depreciacionInicial').disable();
    } else {
      this.form.get('adquisicion').enable();
      this.form.get('montoOriginal').enable();
      this.form.get('tasaDepreciacion').enable();
      // this.form.get('depreciacionInicial').enable();
    }
  }
}
