import ButtonBuilder from '@utils/button-builder';
import type { UpdateCarButtonProps } from '@types';
import { updateCar } from '@api/garage';
import { getErrorMessageFromError } from '@utils/api';

export default class UpdateCarButton extends ButtonBuilder {
  constructor({
    id = 'update-car-btn',
    classes = [],
    text = 'Update',
    type = 'submit',
    carForm,
    onUpdated,
  }: UpdateCarButtonProps) {
    super({
      id,
      text,
      classes: ['update-car-btn', ...classes],
      type,
      disabled: true,
      event: {
        type: 'click',
        handler: async (event: Event) => {
          event.preventDefault();

          try {
            if (!carForm.nameInput.isValidate()) return;

            const carId = Number(carForm.idInput.getValue());
            const carData = {
              name: carForm.nameInput.getValue(),
              color: carForm.colorInput.getValue(),
            };

            const updatedCar = await updateCar(carId, carData);
            if (updatedCar) onUpdated(updatedCar);

            carForm.clear();
          } catch (error: unknown) {
            throw new Error(getErrorMessageFromError(error));
          }
        },
      },
    });
  }
}
