import * as moment from 'moment';

export class Periodo {
  static parse(json: string) {
    const pJson = JSON.parse(json);
    const f1 = new Date(pJson.fechaInicial);
    const f2 = new Date(pJson.fechaFinal);
    return new Periodo(f1, f2);
  }

  static mesActual(): Periodo {
    const now = moment();
    const f1 = moment(now).startOf('month');
    const f2 = moment(now).endOf('month');
    return new Periodo(f1.toDate(), f2.toDate());
  }

  static fromJson(jsonString: string) {
    try {
      const data = JSON.parse(jsonString);
      const f1 = moment(data.fechaInicial).toDate();
      const f2 = moment(data.fechaFinal).toDate();
      return new Periodo(f1, f2);
    } catch (error) {
      // console.log(error);
      return null;
    }
  }

  static fromNow(days: number): Periodo {
    const f1 = moment().subtract(days, 'days');
    const f2 = moment();
    return new Periodo(f1.toDate(), f2.toDate());
  }

  static monthToDay(): Periodo {
    const now = moment();
    const f1 = moment(now).startOf('month');
    const f2 = moment(now);
    return new Periodo(f1.toDate(), f2.toDate());
  }

  static toPeriodo(ejercicio: number, mes: number) {
    const now = moment()
      .set('year', ejercicio)
      .set('month', mes - 1)
      .set('date', 1)
      .toDate();
    const f1 = moment(now).startOf('month');
    const f2 = moment(now).endOf('month');
    return new Periodo(f1.toDate(), f2.toDate());
  }

  static fromStorage(key: string, notFound: Periodo = Periodo.monthToDay()) {
    return this.fromJson(localStorage.getItem(key)) || notFound;
  }
  static saveOnStorage(key: string, periodo: Periodo) {
    return localStorage.setItem(key, periodo.toJson());
  }

  static getEjercicioMes(
    date: Date = new Date()
  ): { ejercicio: number; mes: number } {
    return { ejercicio: date.getFullYear(), mes: date.getMonth() };
  }

  constructor(
    public fechaInicial: Date = new Date(),
    public fechaFinal: Date = new Date()
  ) {}

  toString() {
    return `${moment(this.fechaInicial).format('DD/MM/YYYY')} - ${moment(
      this.fechaFinal
    ).format('DD/MM/YYYY')}`;
  }

  toJson() {
    return JSON.stringify(this);
  }

  toApiJSON() {
    return {
      fechaInicial: this.fechaInicial.toISOString(),
      fechaFinal: this.fechaFinal.toISOString()
    };
  }
}
