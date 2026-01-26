import { ElementBuilder, ButtonBuilder, startRace } from '@utils';
import { Car } from '@components/CarContainer';
import { raceState } from '@state/RaceState';

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
      this.setDisabled(this.car.isInit() === false || raceState.getRacing());
    };
    updateState();

    this.car.subscribe(updateState);
  }

  private handleClick = async () => {
    this.setDisabled(true);
    const distance = this.carContainer.getOffsetWidth() - this.car.getOffsetWidth();
    raceState.setRacing(true);
    await startRace(this.car, distance);
  };
}
