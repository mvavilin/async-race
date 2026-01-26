import '@components/CarContainer/CarContainer.css';
import type { CarOptions } from '@types';
import ElementBuilder from '@utils/element-builder';
import {
  Car,
  StartEngineButton,
  StopEngineButton,
  SelectCarButton,
} from '@components/CarContainer';

export default class CarContainer {
  private carContainer: ElementBuilder;
  private title: ElementBuilder;
  private car: Car;
  private startButton: StartEngineButton;
  private stopButton: StopEngineButton;
  private selectCarButton: SelectCarButton;
  private onSelect: (carContainer: CarContainer) => void;

  constructor({ id, name, color }: CarOptions, onSelect: (car: CarContainer) => void) {
    this.onSelect = onSelect;

    this.carContainer = new ElementBuilder({ classes: ['car-container'] });
    this.title = new ElementBuilder({ tag: 'h3', classes: ['car-title'], content: name });

    this.car = new Car(id, name, color);

    this.startButton = new StartEngineButton(this.car, this.carContainer);
    this.stopButton = new StopEngineButton(this.car);
    this.selectCarButton = new SelectCarButton(this, this.onSelect);

    this.carContainer.addChild(
      this.title,
      this.startButton,
      this.stopButton,
      this.selectCarButton,
      this.car.getCar()
    );
  }

  public getElement() {
    return this.carContainer;
  }

  public getCar() {
    return this.car;
  }

  public update({ name, color }: Omit<CarOptions, 'id'>) {
    if (name) this.title.setContent(name);
    if (color) this.car.updateInfo({ name, color });
  }
}
