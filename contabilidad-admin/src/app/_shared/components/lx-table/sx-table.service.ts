import { Injectable, LOCALE_ID, Inject } from '@angular/core';

import {
  formatCurrency,
  formatNumber,
  formatDate,
  formatPercent
} from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SxTableService {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  formatCurrency(data: number) {
    if (data === undefined) {
      data = 0.0;
    }
    return formatCurrency(data, this.locale, '$');
  }

  formatDate(data: string | number | Date, format: string = 'dd/MM/yyyy') {
    if (!data) {
      return '';
    }
    return formatDate(data, format, this.locale);
  }

  formatNumber(data: number, digitsInfo: string = null) {
    return formatNumber(data, this.locale, digitsInfo);
  }

  formatPercent(data: number, digitsInfo: string = null) {
    return formatPercent(data, this.locale);
  }
}
