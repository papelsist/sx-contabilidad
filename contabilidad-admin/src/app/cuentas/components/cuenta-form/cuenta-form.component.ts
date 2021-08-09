import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CuentaContable } from 'app/cuentas/models';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'sx-cuenta-form',
  template: `
    <mat-card>
      <div layout layout-align="start center"  class="pad-left-sm pad-right-sm">
        <span class="push-left-sm">
          <span class="mat-title">{{title}}</span>
        </span>
      </div>
      <mat-card-subtitle *ngIf="cuenta">
        <div layout>
          <span> Padre: {{cuenta?.padre?.descripcion}} ({{cuenta?.padre?.clave}})</span>
          <span flex></span>
          Última modificación {{cuenta?.lastUpdated | date: 'dd/MM/yyyy HH:mm'}}
          <span class="pad-left"></span>
          Usuario: {{cuenta?.updateUser}}
        </div>
      </mat-card-subtitle>
      <mat-divider></mat-divider>

      <mat-card-content>
        <form [formGroup]="form">
          <div layout>
            <mat-form-field flex>
              <input matInput placeholder="Clave" autocomplete="off" formControlName="clave"
                type='text'  mask="AAA-AAAA-AAAA-AAAA" [dropSpecialCharacters]="false" >
              <mat-error>Clave incorrecta</mat-error>
            </mat-form-field>
            <mat-form-field flex class="pad-left">
              <input matInput type="number" placeholder="Nivel" formControlName="nivel" autocomplete="off">
            </mat-form-field>
            <mat-form-field flex class="pad-left">
              <input matInput type="number" placeholder="Sub cuentas" [value]="cuenta?.subcuentas?.length" [disabled]="true">
            </mat-form-field>

          </div>
          <div layout>
            <sx-upper-case-field formControlName="descripcion" autocomplete="off" placeholder="Descripción" flex>
            </sx-upper-case-field>

          </div>
          <div layout>
            <sx-naturaleza-field [parent]="form" flex></sx-naturaleza-field>
            <sx-tipo-cuenta-field [parent]="form" flex class="pad-left"></sx-tipo-cuenta-field>
            <sx-subtipo-cuenta-field [parent]="form" flex class="pad-left"></sx-subtipo-cuenta-field>
          </div>
          <div layout>
            <sx-cuenta-sat-field formControlName="cuentaSat" flex > </sx-cuenta-sat-field>
          </div>
          <div layout class="pad-top">
            <mat-checkbox formControlName="deResultado" flex >De resultado</mat-checkbox>
            <mat-checkbox formControlName="detalle" flex class="pad-left">Detalle</mat-checkbox>
            <mat-checkbox formControlName="presentacionFinanciera" flex class="pad-left">Presentación financiera</mat-checkbox>
          </div>
          <div layout class="pad-top">
            <mat-checkbox formControlName="presentacionFiscal" flex >Presentación fiscal</mat-checkbox>
            <mat-checkbox formControlName="presentacionContable" flex class="pad-left">Presentación contable</mat-checkbox>
            <mat-checkbox formControlName="presentacionPresupuestal" flex class="pad-left">Presentación presupuestal</mat-checkbox>
          </div>

        </form>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button type="button" (click)="cancel.emit()">
          <mat-icon>arrow_back</mat-icon> Regresar
        </button>
        <button mat-button (click)="onSubmit()" color="primary" [disabled]="form.invalid || form.pristine">
          <mat-icon>save</mat-icon> Salvar
        </button>
        <button mat-button type="button" (click)="agregar.emit(cuenta)" *ngIf="cuenta && !cuenta.detalle">
          <mat-icon>my_library_add</mat-icon> Agregar subcuenta
        </button>
        <button mat-button type="button" (click)="delete.emit(cuenta)" color="warn"
           *ngIf="cuenta" [disabled]="!canDelete(cuenta)">
          <mat-icon>delete</mat-icon> Eliminar
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CuentaFormComponent implements OnInit, OnChanges {
  @Input()
  cuenta: CuentaContable;

  @Input()
  padre: CuentaContable;

  @Output()
  cancel = new EventEmitter();

  @Output()
  save = new EventEmitter();

  @Output()
  update = new EventEmitter();

  @Output()
  delete = new EventEmitter();

  @Output()
  agregar = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    if (this.cuenta) {
      console.log('Cuenta: ', this.cuenta);
      this.form.patchValue(this.cuenta);
    } else {
      if (this.padre) {
        this.form.patchValue({
          ...this.padre,
          descripcion: null,
          clave: null
        });
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cuenta && !changes.cuenta.firstChange) {
      this.form.patchValue(changes.cuenta.currentValue);
      this.form.markAsPristine();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      clave: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      cuentaSat: [null, [Validators.required]],
      naturaleza: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      subTipo: [null, [Validators.required]],
      nivel: [{ value: null, disabled: true }],
      deResultado: [false],
      detalle: [false],
      presentacionContable: [false],
      presentacionFinanciera: [false],
      presentacionFiscal: [false],
      presentacionPresupuestal: [false]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const entity = {
        ...this.form.value,
        cuentaSat: this.form.get('cuentaSat').value.id
      };
      if (this.cuenta) {
        const update = {
          id: this.cuenta.id,
          changes: entity
        };
        this.update.emit(update);
      } else {
        this.save.emit(entity);
      }

      this.form.markAsPristine();
    }
  }

  get title() {
    if (this.cuenta) {
      return `Cuenta ${this.cuenta.clave}`;
    } else {
      if (this.padre) {
        return `Alta de sub cuenta a ${this.padre.clave}`;
      } else {
        return 'Alta de cuenta ';
      }
    }
  }
  /*
  validarClave(control: AbstractControl) {
    if (!this.form) {
      return null;
    }
    const clave = control.value;
    const origen = this.cuentaOrigen;
    if (origen) {
      return destino.id === origen.id ? { mismaCuenta: true } : null;
    }
    return null;
  }
  */

  canDelete(cuenta: CuentaContable) {
    return !this.cuenta.subcuentas || this.cuenta.subcuentas.length === 0;
  }
}
