import { Component, OnInit, Input } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ReportService } from '../../services/report.service';

@Component({
  selector: 'sx-report-button',
  template: `
  <!--
  <ng-template tdLoading="report-running" tdLoadingStrategy="overlay">
  </ng-template> -->
  <mat-icon class="cursor-pointer"
    [color]="color" (click)="runReport($event)"  *ngIf="smallIcon">
    print
  </mat-icon>

  <button mat-button [color]="color" (click)="runReport($event)" *ngIf="!smallIcon">
    <mat-icon>print</mat-icon> {{title}}
  </button>
  `
})
export class ReportButtonComponent implements OnInit {
  @Input() color = 'default';
  @Input() title = 'Imprimir';
  @Input() smallIcon = false;
  @Input() url: string;
  @Input() params: HttpParams;
  constructor(private service: ReportService) {}

  ngOnInit() {}

  runReport(event: Event) {
    event.preventDefault();
    console.log(`Ejecutando reporte ${this.url} Params:${this.params}`);
    this.service.runReport(this.url);
  }
}
