import { ConsolidacionModule } from './consolidacion.module';

describe('ConsolidacionModule', () => {
  let consolidacionModule: ConsolidacionModule;

  beforeEach(() => {
    consolidacionModule = new ConsolidacionModule();
  });

  it('should create an instance', () => {
    expect(consolidacionModule).toBeTruthy();
  });
});
