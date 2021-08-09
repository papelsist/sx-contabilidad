import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'sx-auditoria-page',
  templateUrl: './auditoria-page.component.html',
  styles: []
})
export class AuditoriaPageComponent implements OnInit {
  comprobantesMenu: Object[] = [
    {
      route: 'metadata',
      title: 'Metadata',
      description: 'Comprobantes en el SAT',
      icon: 'list'
    },
    {
      route: 'cfdi',
      title: 'Revisión',
      description: 'SAT vs SIIPAP',
      icon: 'done_all'
    }
  ];

  constructor(public media: TdMediaService) {}

  ngOnInit() {}
}
