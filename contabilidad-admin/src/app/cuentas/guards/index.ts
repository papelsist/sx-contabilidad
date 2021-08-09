import { CuentasGuard } from './cuentas.guard';
import { CuentaExistsGuard } from './cuenta-exists.guard';

export const guards: any[] = [CuentasGuard, CuentaExistsGuard];

export * from './cuentas.guard';
export * from './cuenta-exists.guard';
