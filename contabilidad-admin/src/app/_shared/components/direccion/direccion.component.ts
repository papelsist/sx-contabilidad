import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sx-direccion',
  template: `
    <address>
    {{direccion.calle}} #{{direccion.numeroInterior}} {{direccion.numerExterior}}<br>
    {{direccion.colonia}}<br>
    {{direccion.municipio}} <br>
    {{direccion.estado}} {{direccion.pais}}<br>
    {{direccion.codigoPostal}}
    <address>
  `
})
export class DireccionComponent implements OnInit {
  @Input() direccion: any;
  constructor() {}

  ngOnInit() {}
}
