import ElementBuilder from '@utils/element-builder';
import '@components/CarContainer/Car/Car.css';

export enum CarStatus {
  STOPPED = 'stopped',
  STARTED = 'started',
  DRIVING = 'driving',
}

interface CarOptions {
  id: number;
  name: string;
  color: string;
}

interface CarUpdateOptions {
  name: string;
  color: string;
}

export class Car {
  private car: ElementBuilder;
  private status: CarStatus = CarStatus.STOPPED;
  private x: number = 0;

  constructor({ id, name, color }: CarOptions) {
    this.car = new ElementBuilder({
      classes: ['car', this.status],
      attributes: { id: `${id}`, 'data-name': name },
      styles: {
        left: `${this.x}px`,
        backgroundColor: color,
      },
    });
  }

  public getElement(): ElementBuilder {
    return this.car;
  }

  public update({ name, color }: CarUpdateOptions): void {
    if (name) {
      this.car.addAttribute({ 'data-name': name });
    }
    if (color) {
      this.car.setStyle({ backgroundColor: color });
    }
  }

  public startEngine(): void {
    if (this.status === CarStatus.STOPPED) {
      this.status = CarStatus.STARTED;
      this.car.replaceClass([CarStatus.STOPPED], [CarStatus.STARTED]);
    }
  }

  public moveTo(x: number): void {
    if (this.status === CarStatus.STARTED) {
      this.status = CarStatus.DRIVING;
      this.car.replaceClass([CarStatus.STARTED], [CarStatus.DRIVING]);
    }

    this.x = x;
    this.car.setStyle({ left: `${this.x}px` });
  }

  public stop(): void {
    if (this.status === CarStatus.DRIVING) {
      this.status = CarStatus.STOPPED;
      this.car.replaceClass([CarStatus.DRIVING], [CarStatus.STOPPED]);
    }
  }
}
