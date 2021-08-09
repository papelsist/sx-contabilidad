import { FiscalModule } from './fiscal.module';

describe('FiscalModule', () => {
  let fiscalModule: FiscalModule;

  beforeEach(() => {
    fiscalModule = new FiscalModule();
  });

  it('should create an instance', () => {
    expect(fiscalModule).toBeTruthy();
  });
});
