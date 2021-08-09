import * as moment from 'moment';

export interface EjercicioMes {
  ejercicio: number;
  mes: number;
}

export function buildCurrentPeriodo(): EjercicioMes {
  const now = moment();
  return {
    ejercicio: now.year(),
    mes: now.month() + 1
  };
}

export function loadEjercicioMesFromStorage(
  key: string,
  notFound: EjercicioMes = buildCurrentPeriodo()
): EjercicioMes {
  return parseEjercicioMes(localStorage.getItem(key)) || notFound;
}

export function saveOnStorage(key: string, periodo: EjercicioMes) {
  return localStorage.setItem(key, JSON.stringify(periodo));
}

export function parseEjercicioMes(jsonString: string): EjercicioMes {
  try {
    const data = JSON.parse(jsonString);
    const ejercicio: number = data.ejercicio;
    const mes: number = data.mes;
    return { ejercicio, mes };
  } catch (error) {
    // console.log(error);
    return null;
  }
}
