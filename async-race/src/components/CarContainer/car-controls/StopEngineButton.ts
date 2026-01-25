import { stopEngine } from '@api/engine';
import ButtonBuilder from '@utils/button-builder';
import { Car } from '@components/CarContainer';

export default class StopEngineButton extends ButtonBuilder {
  constructor(private car: Car) {
    super({ classes: ['stop-engine-btn'], text: 'Stop Engine' });
    this.addEvent({ type: 'click', handler: () => this.handleClick() });
  }

  private handleClick = async () => {
    if ((this.car.isBroken() || this.car.isFinished()) === false) return;

    this.setDisabled(true);

    try {
      await stopEngine(this.car.getInfo().id);
    } finally {
      this.car.reset();
      this.setDisabled(false);
    }
  };
}
