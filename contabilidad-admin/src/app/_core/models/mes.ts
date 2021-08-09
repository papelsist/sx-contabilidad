export class Mes {
  constructor(public clave: number, public descripcion: string) {}

  static MESES: Mes[] = [
    new Mes(1, 'Enero'),
    new Mes(2, 'Febrero'),
    new Mes(3, 'Marzo'),
    new Mes(4, 'Abril'),
    new Mes(5, 'Mayo'),
    new Mes(6, 'Junio'),
    new Mes(7, 'Julio'),
    new Mes(8, 'Agosto'),
    new Mes(9, 'Septiembre'),
    new Mes(10, 'Octubre'),
    new Mes(11, 'Noviembre'),
    new Mes(12, 'Diciembre'),
    new Mes(13, 'Cierre')
  ];

  static getMes(index: number) {
    return this.MESES.find(item => item.clave === index);
  }

  toString(): string {
    return this.descripcion;
  }
}
