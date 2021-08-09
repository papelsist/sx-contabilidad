import { IvaAcreditableModule } from './iva-acreditable.module';

describe('IvaAcreditableModule', () => {
  let ivaAcreditableModule: IvaAcreditableModule;

  beforeEach(() => {
    ivaAcreditableModule = new IvaAcreditableModule();
  });

  it('should create an instance', () => {
    expect(ivaAcreditableModule).toBeTruthy();
  });
});
