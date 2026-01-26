import '@components/CarContainer/Car/Car.css';
import ElementBuilder from '@utils/element-builder';
import { CarStatus, type CarOptions, type Listener } from '@types';

export default class Car {
  private car: ElementBuilder;
  private status: CarStatus = CarStatus.INIT;

  private listeners = new Set<Listener>();

  constructor(
    private id: number,
    private name: string,
    private color: string
  ) {
    this.car = new ElementBuilder({
      classes: ['car'],
      attributes: { id: `${id}`, 'data-name': name },
      styles: { backgroundColor: color, left: '0px' },
    });
  }

  public subscribe(fn: Listener) {
    this.listeners.add(fn);
  }

  public unsubscribe(fn: Listener) {
    this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.status));
  }

  public getCar = (): ElementBuilder => this.car;
  public getStatus = (): CarStatus => this.status;
  public getElement = (): HTMLElement => this.car.getElement();
  public getOffsetWidth = (): number => this.car.getElement().offsetWidth;
  public getOffsetLeft = (): number => this.car.getElement().offsetLeft;
  public getInfo = (): CarOptions => ({ id: this.id, name: this.name, color: this.color });

  public updateInfo = ({ name, color }: Omit<CarOptions, 'id'>): void => {
    if (name) {
      this.name = name;
      this.car.addAttribute({ 'data-name': name });
    }
    if (color) {
      this.color = color;
      this.car.addStyle({ backgroundColor: color });
    }
  };

  public isInit = (): boolean => this.status === CarStatus.INIT;
  public isStarted = (): boolean => this.status === CarStatus.STARTED;
  public isDriving = (): boolean => this.status === CarStatus.DRIVING;
  public isBroken = (): boolean => this.status === CarStatus.BROKEN;
  public isFinished = (): boolean => this.status === CarStatus.FINISHED;

  public start = (): void => {
    if (this.isInit() === false) return;

    this.status = CarStatus.STARTED;

    this.notify();
  };

  public drive = (x: number, duration: number): void => {
    if (this.isStarted() === false) return;

    this.status = CarStatus.DRIVING;
    this.car.addStyle({
      left: `${x}px`,
      transition: `left ${duration}s linear`,
    });

    this.notify();

    setTimeout(() => {
      if (this.isFinished()) {
        this.status = CarStatus.FINISHED;
        this.car.addStyle({ backgroundColor: 'green' });

        this.notify();
      }
    }, duration * 1000);
  };

  public break = (): void => {
    if (this.isDriving() === false) return;

    this.status = CarStatus.BROKEN;
    this.car.addStyle({
      left: `${this.getOffsetLeft()}px`,
      transition: 'none',
      backgroundColor: 'red',
    });

    this.notify();
  };

  public finish = (): void => {
    if (this.isDriving() === false) return;

    this.status = CarStatus.FINISHED;
  };

  public reset = (): void => {
    this.status = CarStatus.INIT;

    this.car.removeStyle('left', 'transition');
    this.car.addStyle({ backgroundColor: this.color });

    this.notify();
  };
}
