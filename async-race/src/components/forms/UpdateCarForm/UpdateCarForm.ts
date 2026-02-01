import ElementBuilder from '@utils/element-builder';
import TextInput from '@components/inputs/TextInput/TextInput';
import ColorInput from '@components/inputs/ColorInput/ColorInput';
import UpdateCarButton from '@components/forms/UpdateCarForm/UpdateCarButton';
import type { CarOptions, UpdateCarFormProps } from '@types';
import type { Car, CarContainer } from '@components/CarContainer';
import { COLOR_CODES } from '@/constants';

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
    this.colorInput = new ColorInput({ value: COLOR_CODES.DEFAULT_CAR_COLOR_UPDATE, disabled: true });

    this.updateButton = new UpdateCarButton({
      carContainer: undefined,
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

  public setCar(carContainer: CarContainer): void {
    const car: Car = carContainer.getCar();
    const carData: CarOptions = car.getInfo();

    this.idInput.setValue(String(carData.id));
    this.nameInput.setValue(carData.name);
    this.colorInput.setValue(carData.color);

    this.updateButton.setCarContainer(carContainer);

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
