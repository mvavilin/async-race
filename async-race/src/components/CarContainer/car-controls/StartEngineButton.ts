import { startEngine, driveEngine } from '@api/engine';
import { ElementBuilder, ButtonBuilder } from '@utils';
import { Car } from '@components/CarContainer';

export default class StartEngineButton extends ButtonBuilder {
  constructor(
    private car: Car,
    private carContainer: ElementBuilder
  ) {
    super({ classes: ['start-engine-btn'], text: 'Start Engine / Drive' });
    this.addEvent({ type: 'click', handler: () => this.handleClick() });

    this.carSubscribe();
  }

  private carSubscribe() {
    const updateState = () => {
      this.setDisabled(this.car.isInit() === false);
    };
    updateState();

    this.car.subscribe(updateState);
  }

  private handleClick = async () => {
    if (this.car.isInit() === false) return;

    this.setDisabled(true);

    try {
      this.car.start();

      const startResponse = await startEngine(this.car.getInfo().id);
      if (startResponse.velocity === undefined) return;

      const distance = this.carContainer.getOffsetWidth() - this.car.getOffsetWidth();
      const duration = distance / startResponse.velocity;

      this.car.drive(distance, duration);

      await driveEngine(this.car.getInfo().id);

      this.car.finish();
    } catch {
      this.car.break();
    }
  };
}
