import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'sx-print-cell',
  template: `
    <mat-icon
      smallIcon="true"
      class="cursor-pointer"
      [inline]="false"
      (click)="onPrint()"
      >print</mat-icon
    >
  `
})
export class PrintCellRendererComponent implements ICellRendererAngularComp {
  private params: ICellRendererParams;
  public value: number;

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.value = this.params.value;
  }

  // getValue(): any {
  //   return this.value;
  // }

  refresh(): boolean {
    return false;
  }

  onPrint() {}
}
