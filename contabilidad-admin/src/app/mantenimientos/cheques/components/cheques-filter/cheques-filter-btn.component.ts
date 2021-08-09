import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ChequesFilterComponent } from './cheques-filter.component';
import { ChequesFilter } from '../../models/cheque';

@Component({
  selector: 'sx-cheques-filter-btn',
  template: `
  <button mat-button mat-icon-button (click)="openFilter()" ><mat-icon [color]="color">filter_list</mat-icon></button>
  `
})
export class ChequesFilterBtnComponent implements OnInit {
  @Input()
  color = 'primary';
  @Input()
  filter: ChequesFilter;
  @Output()
  change = new EventEmitter<ChequesFilter>();
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openFilter() {
    this.dialog
      .open(ChequesFilterComponent, {
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
