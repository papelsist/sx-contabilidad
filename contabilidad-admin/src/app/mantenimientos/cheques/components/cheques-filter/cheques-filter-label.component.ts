import { Component, OnInit, Input } from '@angular/core';
import { ChequesFilter } from '../../models/cheque';


@Component({
  selector: 'sx-cheques-filter-label',
  template: `
  <div layout layout-align="center center" class="pad-bottom text-sm tc-indigo-500">
    <span *ngIf="filter.nombre" >{{filter.nombre}}</span>
    <span *ngIf="filter.fechaInicial" class="pad-left">Del: {{filter.fechaInicial | date: 'dd/MM/yyyy'}}</span>
    <span *ngIf="filter.fechaFinal" class="pad-left">al: {{filter.fechaFinal | date: 'dd/MM/yyyy'}}</span>
  <div>
  `
})
export class ChequesFilterLabelComponent implements OnInit {
  @Input()
  filter: ChequesFilter;
  constructor() {}

  ngOnInit() {}
}
