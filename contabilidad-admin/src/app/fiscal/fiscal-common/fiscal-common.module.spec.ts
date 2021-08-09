import { FiscalCommonModule } from './fiscal-common.module';

describe('FiscalCommonModule', () => {
  let fiscalCommonModule: FiscalCommonModule;

  beforeEach(() => {
    fiscalCommonModule = new FiscalCommonModule();
  });

  it('should create an instance', () => {
    expect(fiscalCommonModule).toBeTruthy();
  });
});
