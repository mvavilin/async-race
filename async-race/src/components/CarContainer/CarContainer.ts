import '@components/CarContainer/CarContainer.css';

import type { CarOptions } from '@types';
import { ElementBuilder } from '@utils';
import {
  Car,
  StartEngineButton,
  StopEngineButton,
  SelectCarButton,
  DeleteCarButton,
} from '@components';

export default class CarContainer {
  private carContainer: ElementBuilder;
  private title: ElementBuilder;
  private car: Car;
  private startButton: StartEngineButton;
  private stopButton: StopEngineButton;
  private selectCarButton: SelectCarButton;
  private deleteCarButton: DeleteCarButton;
  private onSelect: (carContainer: CarContainer) => void;

  public onDeleted?: () => void;
  private deleteRestoreCallbacks: (() => void)[] = [];

  constructor({ id, name, color }: CarOptions, onSelect: (car: CarContainer) => void) {
    this.onSelect = onSelect;

    this.carContainer = new ElementBuilder({ classes: ['car-container'] });
    this.title = new ElementBuilder({ tag: 'h3', classes: ['car-title'], content: name });
    this.car = new Car(id, name, color);

    this.startButton = new StartEngineButton(this.car, this.carContainer);
    this.stopButton = new StopEngineButton(this.car);
    this.selectCarButton = new SelectCarButton(this, this.onSelect);
    this.deleteCarButton = new DeleteCarButton(this);

    this.carContainer.addChild(
      this.title,
      this.startButton,
      this.stopButton,
      this.selectCarButton,
      this.deleteCarButton,
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

  public remove() {
    this.carContainer.getElement().remove();
  }

  public onDeleteRestore(callback: () => void) {
    this.deleteRestoreCallbacks.push(callback);
  }

  public restoreDelete() {
    this.deleteRestoreCallbacks.forEach((callback) => callback());
  }

  public setDeleteButtonDisabled(disabled: boolean) {
    this.deleteCarButton.setDisabled(disabled);
  }
}
