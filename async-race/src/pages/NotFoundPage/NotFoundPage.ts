import BasePage from '@pages/BasePage';
import ElementBuilder from '@utils/element-builder';

export default class NotFoundPage extends BasePage {
  private title: ElementBuilder;

  constructor() {
    super();
    this.title = new ElementBuilder({ tag: 'h1', content: '404 - Page Not Found' });
    this.root.addChild(this.title);
    this.render();
  }

  public render(): void {}
}
