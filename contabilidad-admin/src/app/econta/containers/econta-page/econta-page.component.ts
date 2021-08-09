import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { TdMediaService } from "@covalent/core";

@Component({
  selector: "sx-econta-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./econta-page.component.html",
  styles: [
    `
      .document {
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class EcontaPageComponent implements OnInit {
  navmenu: Object[] = [
    {
      route: "catalogos",
      title: "CATALOGO",
      description: "Catalogo de cuentas SAT",
      icon: "storage"
    },
    {
      route: "balanzas",
      title: "BALANZA",
      description: "Balanzas de comprobación (SAT)",
      icon: "blur_linear"
    },
    // {
    //   route: 'polizas',
    //   title: 'POLIZAS',
    //   description: 'Pólizas por periodo (SAT)',
    //   icon: 'format_list_numbered'
    // },
    {
      route: "auxiliarDeFolios",
      title: "FOLIOS (AUX)",
      description: "XML Auxiliar de folios",
      icon: "subtitles"
    },
    {
      route: "auxiliarDeCuentas",
      title: "CUENTAS (AUX)",
      description: "XML Auxiliar de cuentas",
      icon: "view_comfy"
    },
    {
      route: "empresas",
      title: "EMPRESAS",
      description: "Empresas registradas",
      icon: "business"
    }
  ];

  constructor(public media: TdMediaService) {}

  ngOnInit() {}
}
