import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as _ from 'lodash';

@Component({
  selector: 'sx-direccion-form',
  templateUrl: './direccion-form.component.html',
  styleUrls: ['./direccion-form.component.scss']
})
export class DireccionFormComponent implements OnInit, OnDestroy {
  @Input() parent: FormGroup;

  @Input() colonias: string[] = [];

  subscription: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  buscarDatos(event) {
    const zip = this.parent.get('codigoPostal').value;
    const params = new HttpParams().set('zip_code', zip);
    this.http
      .get('http://sepomex.icalialabs.com/api/v1/zip_codes', {
        params: params
      }).pipe(
        map((response: any) => response.zip_codes)
      )
      .subscribe((registros: any[]) => {
        const estado: string = _.map(registros, item => item.d_estado)[0];
        const municipio: string = _.map(registros, item => item.d_mnpio)[0];
        if (estado) {
          this.parent.get('estado').setValue(estado.toUpperCase());
        }
        if (municipio) {
          this.parent.get('municipio').setValue(municipio.toUpperCase());
        }
        const colonias = _.map(registros, item => item.d_asenta.toUpperCase());
        this.colonias = colonias;
      });
  }
}
