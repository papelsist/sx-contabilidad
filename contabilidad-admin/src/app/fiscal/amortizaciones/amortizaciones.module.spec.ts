import { AmortizacionesModule } from './amortizaciones.module';

describe('AmortizacionesModule', () => {
  let amortizacionesModule: AmortizacionesModule;

  beforeEach(() => {
    amortizacionesModule = new AmortizacionesModule();
  });

  it('should create an instance', () => {
    expect(amortizacionesModule).toBeTruthy();
  });
});
