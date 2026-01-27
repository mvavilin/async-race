import ButtonBuilder from '@utils/button-builder';
import { deleteCar } from '@api/garage';
import { getErrorMessageFromError } from '@utils/api';
import type { CarContainer } from '@components/CarContainer';
import { raceState } from '@state/RaceState';
import { getWinner, deleteWinner } from '@api/winners';

export default class DeleteCarButton extends ButtonBuilder {
  private carContainer: CarContainer;

  constructor(carContainer: CarContainer) {
    super({
      classes: ['delete-car-btn'],
      text: 'Delete',
      event: { type: 'click', handler: () => this.handleClick() },
    });

    this.carContainer = carContainer;

    this.carContainer.onDeleteRestore(() => this.setDisabled(false));
    this.carSubscribe();
  }

  private carSubscribe() {
    const car = this.carContainer.getCar();

    const updateState = () => {
      this.setDisabled(car.isInit() === false || raceState.getRacing());
    };
    updateState();

    car.subscribe(updateState);
  }

  public setCarContainer(carContainer: CarContainer) {
    this.carContainer = carContainer;
  }

  private handleClick = async () => {
    const carId: number = this.carContainer.getCar().getInfo().id;
    this.setDisabled(true);

    try {
      await deleteCar(carId);
      this.carContainer.remove();

      const existingWinner = await getWinner(carId);
      if (existingWinner) await deleteWinner(carId);

      if (this.carContainer.onDeleted) this.carContainer.onDeleted();
    } catch (error: unknown) {
      throw new Error(getErrorMessageFromError(error));
    }
  };
}
