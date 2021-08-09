import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'sx-fiscal-page',
  templateUrl: './fiscal-page.component.html'
})
export class FiscalPageComponent implements OnInit {
  navmenu: Object[] = [
    {
      route: 'ajusteAnualPorInflacion',
      title: 'Ajuste x Inflación',
      description: 'Ajuste anual por inflación',
      icon: 'storage'
    },
    {
      route: 'declaracionAnual',
      title: 'Declaración anual',
      description: 'Declaración anual',
      icon: 'storage'
    },
    {
      route: 'ivaAcreditable',
      title: 'Amarre de IVA (ACRE)',
      description: 'IVA acreditable',
      icon: 'receipt'
    },
    {
      route: 'ivaCobrado',
      title: 'Amarre de IVA (COB)',
      description: 'IVA cobrado',
      icon: 'receipt'
    },
    {
      route: 'amarreProveedores',
      title: 'Amarre PROV',
      description: 'Amarre de proveedores',
      icon: 'receipt'
    },
    {
      route: 'amarreClientes',
      title: 'Amarre CLIE',
      description: 'Amarre de clientes',
      icon: 'receipt'
    },
    {
      route: 'consolidacion',
      title: 'Consolidación',
      description: 'Consolidación de estados financieros',
      icon: 'receipt'
    },
    {
      route: 'costoDeVentas',
      title: 'Costo de Ventas',
      description: 'Análisis de costo de ventas',
      icon: 'receipt'
    },
    {
      route: 'amortizaciones',
      title: 'Amortizaciones',
      description: 'Seguros y fianzas',
      icon: 'receipt'
    }
  ];

  constructor(public media: TdMediaService) {}

  ngOnInit() {}
}
