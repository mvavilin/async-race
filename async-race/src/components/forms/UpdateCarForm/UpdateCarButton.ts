import ButtonBuilder from '@utils/button-builder';
import type { UpdateCarButtonProps } from '@types';
import { updateCar } from '@api/garage';
import { getErrorMessageFromError } from '@utils/api';
import type { CarContainer } from '@components/CarContainer';

export default class UpdateCarButton extends ButtonBuilder {
  private carContainer: CarContainer | undefined;
  private carForm: UpdateCarButtonProps['carForm'];
  private onUpdated: UpdateCarButtonProps['onUpdated'];

  constructor({
    id = 'update-car-btn',
    classes = [],
    text = 'Update',
    type = 'submit',
    carContainer,
    carForm,
    onUpdated,
  }: UpdateCarButtonProps) {
    super({
      id,
      text,
      classes: ['update-car-btn', ...classes],
      type,
      disabled: true,
      event: { type: 'click', handler: (event: Event) => this.handleClick(event) },
    });

    if (carContainer) this.carContainer = carContainer;

    this.carForm = carForm;
    this.onUpdated = onUpdated;
  }

  public setCarContainer(carContainer: CarContainer) {
    this.carContainer = carContainer;
  }

  private handleClick = async (event: Event) => {
    event.preventDefault();
    if (this.carForm.nameInput.isValidate() === false) return;
    if (this.carContainer === undefined) return;

    const carId = this.carContainer.getCar().getInfo().id;
    const carData = {
      name: this.carForm.nameInput.getValue(),
      color: this.carForm.colorInput.getValue(),
    };

    this.setDisabled(true);

    try {
      if (carId === undefined) return;

      const updateCarResponse = await updateCar(carId, carData);

      if (updateCarResponse === null) return;
      this.onUpdated(updateCarResponse);
      this.carContainer.update(updateCarResponse);

      this.carForm.clear();
    } catch (error: unknown) {
      throw new Error(getErrorMessageFromError(error));
    } finally {
      // this.setDisabled(false);
    }
  };
}
