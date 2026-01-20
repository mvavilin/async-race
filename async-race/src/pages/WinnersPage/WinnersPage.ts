import { BasePage } from '@pages';
import ElementBuilder from '@utils/element-builder';

export default class WinnersPage extends BasePage {
  protected title: ElementBuilder;

  constructor() {
    super();

    this.title = new ElementBuilder({ tag: 'h1', content: 'Winners' });
    this.root.addChild(this.title);

    this.render();
  }

  public render(): void {}
}
