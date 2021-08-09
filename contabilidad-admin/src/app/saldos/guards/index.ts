import { SaldosGuard } from './saldos.guard';
import { SaldoExistsGuard } from './saldo-exists.guard';

export const guards: any[] = [SaldosGuard, +SaldoExistsGuard];

export * from './saldos.guard';
export * from './saldo-exists.guard';
