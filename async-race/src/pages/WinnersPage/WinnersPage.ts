import { BasePage } from '@pages';
import ElementBuilder from '@utils/element-builder';
import NavButton from '@/components/NavButton';
import { RoutePath } from '@types';

export default class WinnersPage extends BasePage {
  protected title: ElementBuilder;
  protected garageButton: NavButton;

  constructor() {
    super();

    this.title = new ElementBuilder({ tag: 'h1', content: 'Winners' });
    this.root.addChild(this.title);

    this.garageButton = new NavButton({ text: 'Garage', route: RoutePath.GARAGE });
    this.root.addChild(this.garageButton);

    this.render();
  }

  public render(): void {}
}
