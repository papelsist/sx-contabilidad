import { Component } from '@angular/core';
import { DateAdapter, MatIconRegistry, NativeDateAdapter } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'sx-root',
  templateUrl: './app.component.html',
  styles: [`
      :host {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        width: 100%;
        height: 100%;
        min-width: 0;
    }
  `]
})
export class AppComponent {

  constructor(
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private dateAdapter: DateAdapter<NativeDateAdapter>,
  ) {
    this.iconRegistry.addSvgIconInNamespace('assets', 'siipapx',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/siipapx.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'paper',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/paper.svg'));

    // moment.locale('es');
    dateAdapter.setLocale('es_MX');
  }
}
