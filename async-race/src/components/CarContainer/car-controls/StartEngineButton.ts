import { startEngine, driveEngine } from '@api/engine';
import ElementBuilder from '@utils/element-builder';
import ButtonBuilder from '@utils/button-builder';
import { Car } from '@components/CarContainer';

export default class StartEngineButton extends ButtonBuilder {
  constructor(
    private car: Car,
    private carContainer: ElementBuilder
  ) {
    super({ classes: ['start-engine-btn'], text: 'Start Engine' });

    this.addEvent({ type: 'click', handler: () => this.handleClick() });
  }

  private handleClick = async () => {
    if (this.car.isInit() === false) return;

    this.setDisabled(true);

    try {
      const startResponse = await startEngine(this.car.getInfo().id);
      if (startResponse.velocity === undefined) return;

      this.car.start();

      const distance = this.carContainer.getOffsetWidth() - this.car.getOffsetWidth();
      const duration = distance / startResponse.velocity;

      this.car.drive(distance, duration);

      await driveEngine(this.car.getInfo().id);

      this.car.finish();
    } catch {
      this.car.break();
    } finally {
      this.setDisabled(false);
    }
  };
}
