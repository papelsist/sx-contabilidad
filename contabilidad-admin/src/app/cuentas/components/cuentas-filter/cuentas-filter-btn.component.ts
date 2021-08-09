import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CatalogoFilter } from '../../models';
import { CuentasFilterComponent } from './cuentas-filter.component';

@Component({
  selector: 'sx-cuentas-filter-btn',
  template: `
  <button mat-button mat-icon-button (click)="openFilter()" ><mat-icon [color]="color">filter_list</mat-icon></button>
  `
})
export class CuentasFilterBtnComponent implements OnInit {
  @Input()
  color = 'primary';
  @Input()
  filter: CatalogoFilter;
  @Output()
  change = new EventEmitter<CatalogoFilter>();
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openFilter() {
    this.dialog
      .open(CuentasFilterComponent, {
        data: { filter: this.filter }
      })
      .afterClosed()
      .subscribe(command => {
        if (command) {
          this.change.emit(command);
        }
      });
  }
}
