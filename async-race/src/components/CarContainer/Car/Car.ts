import '@components/CarContainer/Car/Car.css';
import ElementBuilder from '@utils/element-builder';
import { CarStatus, type CarOptions } from '@types';

export default class Car {
  private car: ElementBuilder;
  private status: CarStatus = CarStatus.INIT;

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
  };

  public drive = (x: number, duration: number): void => {
    if (this.isStarted() === false) return;

    this.status = CarStatus.DRIVING;
    this.car.addStyle({
      left: `${x}px`,
      transition: `left ${duration}s linear`,
    });
  };

  public break = (): void => {
    if (this.isDriving() === false) return;

    this.status = CarStatus.BROKEN;
    this.car.addStyle({
      left: `${this.getOffsetLeft()}px`,
      transition: 'none',
    });
  };

  public finish = (): void => {
    if (this.isDriving() === false) return;

    this.status = CarStatus.FINISHED;
  };

  public reset = (): void => {
    this.status = CarStatus.INIT;
    this.car.addStyle({ left: '0px', transition: 'none' });
  };
}
