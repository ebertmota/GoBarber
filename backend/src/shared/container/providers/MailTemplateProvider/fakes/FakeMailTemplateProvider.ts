import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplaProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTemplaProvider;
