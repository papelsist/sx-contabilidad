import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formaDePago'
})
export class FormaDePagoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 'TARJETA_DEBITO':
        return 'TAR_DEV';
      case 'TARJETA_CREDITO':
        return 'TAR_CRE';
      case 'TRANSFERENCIA':
        return 'TRANSF';
      case 'DEPOSITO_EFECTIVO':
        return 'DEP_EFE';
      case 'DEPOSITO_CHEQUE':
        return 'DEP_CHE';
      default:
        return value;
    }
  }



}
