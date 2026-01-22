import ElementBuilder from '@utils/element-builder';
import TextInput from '@components/inputs/TextInput/TextInput';
import ColorInput from '@components/inputs/ColorInput/ColorInput';
import UpdateCarButton from '@/components/forms/UpdateCarForm/UpdateCarButton';
import type { Car, UpdateCarFormProps } from '@types';

export default class UpdateCarForm extends ElementBuilder {
  private idInput: TextInput;
  private nameInput: TextInput;
  private colorInput: ColorInput;
  private updateButton: UpdateCarButton;

  constructor({ onUpdated }: UpdateCarFormProps) {
    super({ tag: 'form', classes: ['form', 'car-update-form'] });

    this.idInput = new TextInput({ id: 'car-id', placeholder: 'Car ID', disabled: true });
    this.nameInput = new TextInput({
      id: 'new-car-name',
      placeholder: 'New car name',
      disabled: true,
    });
    this.colorInput = new ColorInput({ value: '#00ff00', disabled: true });

    this.updateButton = new UpdateCarButton({
      carForm: {
        idInput: this.idInput,
        nameInput: this.nameInput,
        colorInput: this.colorInput,
        clear: () => this.clear(),
      },
      onUpdated,
    });

    this.addChild(this.idInput, this.nameInput, this.colorInput, this.updateButton);
  }

  public setCarData(car: Car): void {
    this.idInput.setValue(String(car.id));
    this.nameInput.setValue(car.name);
    this.colorInput.setValue(car.color);

    this.nameInput.setDisabled(false);
    this.colorInput.setDisabled(false);
    this.updateButton.setDisabled(false);
  }

  public clear(): void {
    this.idInput.clear();
    this.nameInput.clear();
    this.colorInput.clear();

    this.nameInput.setDisabled(true);
    this.colorInput.setDisabled(true);
    this.updateButton.setDisabled(true);
  }
}
