import ButtonBuilder from '@utils/button-builder';
import type { CreateCarButtonProps } from '@types';
import { createCar } from '@api/garage';
import { getErrorMessageFromError } from '@utils/api';
import { raceState } from '@state/RaceState';

export default class CreateCarButton extends ButtonBuilder {
  constructor({
    id = 'create-car-btn',
    classes = [],
    text = 'Create',
    type = 'submit',
    carForm,
    onCreated,
  }: CreateCarButtonProps) {
    super({
      id,
      text,
      classes: ['create-car-btn', ...classes],
      type,
      event: {
        type: 'click',
        handler: async (event: Event) => {
          event.preventDefault();

          try {
            if (!carForm.nameInput.isValidate()) return;

            const carData = {
              name: carForm.nameInput.getValue(),
              color: carForm.colorInput.getValue(),
            };

            const car = await createCar(carData);
            onCreated(car);

            carForm.clear();
          } catch (error: unknown) {
            throw new Error(getErrorMessageFromError(error));
          }
        },
      },
    });

    raceState.subscribe((racing) => {
      this.setDisabled(racing);
    });
  }
}
