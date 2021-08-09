import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  forwardRef,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import * as _ from 'lodash';

import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from '../../../utils/config.service';

export const CUENTA_DE_BANCO_LOOKUPFIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CuentaBancoFieldComponent),
  multi: true
};

@Component({
  selector: 'sx-cuenta-banco-field',
  providers: [CUENTA_DE_BANCO_LOOKUPFIELD_VALUE_ACCESSOR],
  templateUrl: './cuenta-banco-field.component.html',
  styles: [
    `
    .fill {
      width: 100%;
    }
  `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CuentaBancoFieldComponent implements OnInit, ControlValueAccessor {
  apiUrl: string;

  searchControl = new FormControl();

  @Input() required = false;

  @Input() placeholder = 'Cuenta';

  cuentas$: Observable<any[]>;

  onChange;

  onTouch;

  @ViewChild('inputField') inputField: ElementRef;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('tesoreria/cuentas');
  }

  ngOnInit() {
    this.cuentas$ = this.searchControl.valueChanges.pipe(
      startWith(null),
      switchMap((term: any) => {
        const params = new HttpParams()
          .set('term', term)
          .set('activa', 'activa');
        return this.http.get<any[]>(this.apiUrl, { params: params });
      })
    );
  }

  select(event) {
    this.onChange(event.option.value);
  }

  displayFn(cuenta) {
    return cuenta ? `${cuenta.descripcion} (${cuenta.numero})` : '';
  }

  writeValue(obj: any): void {
    this.searchControl.setValue(obj);
    if (obj === null) {
      this.searchControl.reset();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.searchControl.disable() : this.searchControl.enable();
  }

  focus() {
    this.inputField.nativeElement.focus();
  }

  onBlur() {
    if (this.onTouch) {
      this.onTouch();
    }
  }
}
