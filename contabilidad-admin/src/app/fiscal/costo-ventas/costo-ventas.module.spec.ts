import { CostoVentasModule } from './costo-ventas.module';

describe('CostoVentasModule', () => {
  let costoVentasModule: CostoVentasModule;

  beforeEach(() => {
    costoVentasModule = new CostoVentasModule();
  });

  it('should create an instance', () => {
    expect(costoVentasModule).toBeTruthy();
  });
});
