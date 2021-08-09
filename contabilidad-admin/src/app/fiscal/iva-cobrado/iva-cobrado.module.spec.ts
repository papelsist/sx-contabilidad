import { IvaCobradoModule } from './iva-cobrado.module';

describe('IvaCobradoModule', () => {
  let ivaCobradoModule: IvaCobradoModule;

  beforeEach(() => {
    ivaCobradoModule = new IvaCobradoModule();
  });

  it('should create an instance', () => {
    expect(ivaCobradoModule).toBeTruthy();
  });
});
