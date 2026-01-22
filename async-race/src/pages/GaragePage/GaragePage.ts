import { BasePage } from '@pages';
import ElementBuilder from '@utils/element-builder';
import NavButton from '@/components/NavButton';
import { RoutePath } from '@types';

import TextInput from '@/components/TextInput/TextInput';
import ColorInput from '@/components/ColorInput/ColorInput';

export default class GaragePage extends BasePage {
  protected title: ElementBuilder;
  protected winnersButton: NavButton;
  protected textInput1: TextInput;
  protected textInput2: TextInput;
  protected colorInput1: ColorInput;
  protected colorInput2: ColorInput;

  constructor() {
    super();

    this.title = new ElementBuilder({ tag: 'h1', content: 'Garage' });
    this.root.addChild(this.title);

    this.winnersButton = new NavButton({ text: 'Winners', route: RoutePath.WINNERS });
    this.root.addChild(this.winnersButton);

    this.textInput1 = new TextInput({ id: 'text1', placeholder: 'Enter model' });
    this.textInput2 = new TextInput({ id: 'text2', placeholder: 'Enter new model' });
    this.colorInput1 = new ColorInput({ id: 'color1', value: '#0000ff' });
    this.colorInput2 = new ColorInput({ id: 'color2', value: '#00ff00' });

    this.root.addChild(this.textInput1, this.colorInput1, this.textInput2, this.colorInput2);

    this.render();
  }

  public render(): void { }
}
