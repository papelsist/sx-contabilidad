import { PolizasGuard } from './polizas.guard';
import { PolizaExistsGuard } from './poliza-exists.guard';

export const guards: any[] = [PolizasGuard, PolizaExistsGuard];

export * from './polizas.guard';
export * from './poliza-exists.guard';
