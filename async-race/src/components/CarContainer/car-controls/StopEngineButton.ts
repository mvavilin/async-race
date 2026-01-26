import { stopEngine } from '@api/engine';
import ButtonBuilder from '@utils/button-builder';
import { getErrorMessageFromError } from '@utils/api';
import { Car } from '@components/CarContainer';

export default class StopEngineButton extends ButtonBuilder {
  constructor(private car: Car) {
    super({ classes: ['stop-engine-btn'], text: 'Stop Engine / Reset' });
    this.addEvent({ type: 'click', handler: () => this.handleClick() });
    this.carSubscribe();
  }

  private carSubscribe() {
    const updateState = () => {
      this.setDisabled(!(this.car.isBroken() || this.car.isFinished()));
    };
    updateState();

    this.car.subscribe(updateState);
  }

  private handleClick = async () => {
    if (!(this.car.isBroken() || this.car.isFinished())) return;
    this.setDisabled(true);
    try {
      await stopEngine(this.car.getInfo().id);
      this.car.reset();
    } catch (error: unknown) {
      throw new Error(getErrorMessageFromError(error));
    }
  };
}
