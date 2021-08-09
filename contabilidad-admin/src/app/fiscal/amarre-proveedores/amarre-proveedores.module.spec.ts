import { AmarreProveedoresModule } from './amarre-proveedores.module';

describe('AmarreProveedoresModule', () => {
  let amarreProveedoresModule: AmarreProveedoresModule;

  beforeEach(() => {
    amarreProveedoresModule = new AmarreProveedoresModule();
  });

  it('should create an instance', () => {
    expect(amarreProveedoresModule).toBeTruthy();
  });
});
