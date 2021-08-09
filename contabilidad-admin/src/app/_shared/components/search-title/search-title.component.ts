import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';

@Component({
  selector: 'sx-search-title',
  template: `
  <div layout layout-align="start center"  class="pad-left-sm pad-right-sm">
    <span class="push-left-sm">
      <span class="mat-title">{{title}}</span>
    </span>
    <span flex></span>
    <ng-content select=".info" flex></ng-content>
    <span flex></span>
    <td-search-box class="push-right-sm" placeholder="{{searchLabel}}" flex (searchDebounce)="search.emit($event)"
      [(ngModel)]="inputValue" [alwaysVisible]="visible">
    </td-search-box>
    <ng-content select=".options"></ng-content>
    <span>
      <button mat-icon-button [matMenuTriggerFor]="toolbarMenu">
        <mat-icon>more_vert</mat-icon>
      </button>
      <mat-menu #toolbarMenu="matMenu">
        <ng-content select=".actions"></ng-content>
      </mat-menu>
    </span>
  </div>
  `
})
export class SearchTitleComponent implements OnInit, OnChanges {
  @Input()
  title = 'Title';

  @Input()
  inputValue = '';

  @Input()
  visible = false;

  @Input()
  searchLabel: 'Buscar';

  @Output()
  search = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes) {
    // console.log('Changes:', changes);
  }
}
