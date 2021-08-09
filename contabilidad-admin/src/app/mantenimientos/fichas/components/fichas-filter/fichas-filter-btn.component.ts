import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FichasFilterComponent } from './fichas-filter.component';
import { FichaFilter } from '../../models/ficha';

@Component({
  selector: 'sx-fichas-filter-btn',
  template: `
  <button mat-button mat-icon-button (click)="openFilter()" ><mat-icon [color]="color">filter_list</mat-icon></button>
  `
})
export class FichasFilterBtnComponent implements OnInit {
  @Input()
  color = 'primary';

  @Input()
  filter: FichaFilter;

  @Output()
  change = new EventEmitter<FichaFilter>();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openFilter() {
    this.dialog
      .open(FichasFilterComponent, {
        data: { filter: this.filter },
        width: '600px'
      })
      .afterClosed()
      .subscribe(command => {
        if (command) {
          this.change.emit(command);
        }
      });
  }
}
