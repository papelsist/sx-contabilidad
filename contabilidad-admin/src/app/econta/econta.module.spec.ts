import { EcontaModule } from './econta.module';

describe('EcontaModule', () => {
  let econtaModule: EcontaModule;

  beforeEach(() => {
    econtaModule = new EcontaModule();
  });

  it('should create an instance', () => {
    expect(econtaModule).toBeTruthy();
  });
});
