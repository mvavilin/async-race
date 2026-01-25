import '@components/CarContainer/CarContainer.css';
import type { Car as CarOptions } from '@types';
import ElementBuilder from '@utils/element-builder';
import { Car, StartEngineButton, StopEngineButton } from '@components/CarContainer';

export default class CarContainer {
  private carContainer: ElementBuilder;
  private car: Car;
  private startButton: StartEngineButton;
  private stopButton: StopEngineButton;

  constructor({ id, name, color }: CarOptions) {
    this.carContainer = new ElementBuilder({ classes: ['car-container'] });
    this.car = new Car(id, name, color);

    this.startButton = new StartEngineButton(this.car, this.carContainer);
    this.stopButton = new StopEngineButton(this.car);

    this.carContainer.addChild(this.startButton, this.stopButton, this.car.getCar());
  }

  public getElement() {
    return this.carContainer;
  }
}
