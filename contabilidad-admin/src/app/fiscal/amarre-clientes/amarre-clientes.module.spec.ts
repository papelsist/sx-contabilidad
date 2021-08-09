import { AmarreClientesModule } from './amarre-clientes.module';

describe('AmarreClientesModule', () => {
  let amarreClientesModule: AmarreClientesModule;

  beforeEach(() => {
    amarreClientesModule = new AmarreClientesModule();
  });

  it('should create an instance', () => {
    expect(amarreClientesModule).toBeTruthy();
  });
});
