import ButtonBuilder from '@utils/button-builder';
import type { CarContainer } from '@components/CarContainer';

export default class SelectCarButton extends ButtonBuilder {
  constructor(
    private carContainer: CarContainer,
    private onSelect: (carContainer: CarContainer) => void
  ) {
    super({ classes: ['select-car-btn'], text: 'Select' });
    this.addEvent({ type: 'click', handler: () => this.handleClick() });

    this.carSubscribe();
  }

  private carSubscribe() {
    const car = this.carContainer.getCar();

    const updateState = () => {
      this.setDisabled(car.isInit() === false);
    };
    updateState();

    car.subscribe(updateState);
  }

  private handleClick = (): void => {
    this.onSelect(this.carContainer);
  };
}
