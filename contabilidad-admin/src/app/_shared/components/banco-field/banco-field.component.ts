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
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import * as _ from 'lodash';
import { ConfigService } from 'app/utils/config.service';

export const BANCO_LOOKUPFIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BancoFieldComponent),
  multi: true
};

@Component({
  selector: 'sx-banco-field',
  providers: [BANCO_LOOKUPFIELD_VALUE_ACCESSOR],
  templateUrl: './banco-field.component.html',
  styles: [
    `
    .fill {
      width: 100%;
    }
  `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BancoFieldComponent implements OnInit, ControlValueAccessor {
  apiUrl: string;

  searchControl = new FormControl();

  @Input() required = false;

  @Input() placeholder = 'Banco';

  bancos$: Observable<any>;

  onChange;

  onTouch;

  @ViewChild('inputField') inputField: ElementRef;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('tesoreria/bancos');
  }

  ngOnInit() {
    this.bancos$ = this.searchControl.valueChanges.pipe(
      startWith(null),
      switchMap(term => {
        const params = new HttpParams().set('term', term);
        return this.http.get<any>(this.apiUrl, { params: params });
      })
    );
  }

  select(event) {
    this.onChange(event.option.value);
  }

  displayFn(banco: any) {
    return banco ? `${banco.nombre}` : '';
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
