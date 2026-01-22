import { BasePage } from '@pages';
import ElementBuilder from '@utils/element-builder';
import NavButton from '@components/NavButton/NavButton';
import { RoutePath } from '@types';

export default class GaragePage extends BasePage {
  protected title: ElementBuilder;
  protected winnersButton: NavButton;

  constructor() {
    super();

    this.title = new ElementBuilder({ tag: 'h1', content: 'Garage' });
    this.root.addChild(this.title);

    this.winnersButton = new NavButton({ text: 'Winners', route: RoutePath.WINNERS });
    this.root.addChild(this.winnersButton);

    this.render();
  }

  public render(): void {}
}
