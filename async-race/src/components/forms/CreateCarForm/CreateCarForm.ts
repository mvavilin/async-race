import ElementBuilder from '@utils/element-builder';
import TextInput from '@components/inputs/TextInput/TextInput';
import ColorInput from '@components/inputs/ColorInput/ColorInput';
import CreateCarButton from '@components/forms/CreateCarForm/CreateCarButton';
import type { CreateCarFormProps } from '@types';

export default class CreateCarForm extends ElementBuilder {
  private nameInput: TextInput;
  private colorInput: ColorInput;
  private createButton: CreateCarButton;

  constructor({ onCreated }: CreateCarFormProps) {
    super({ tag: 'form', classes: ['form', 'car-create-form'] });

    this.nameInput = new TextInput({ id: 'car-name', placeholder: 'Car name' });
    this.colorInput = new ColorInput({ value: '#0000ff' });

    this.createButton = new CreateCarButton({
      carForm: {
        nameInput: this.nameInput,
        colorInput: this.colorInput,
        clear: () => this.clear(),
      },
      onCreated,
    });

    this.addChild(this.nameInput, this.colorInput, this.createButton);
  }

  public clear(): void {
    this.nameInput.clear();
  }
}
