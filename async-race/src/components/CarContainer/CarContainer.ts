import '@components/CarContainer/CarContainer.css';
import ElementBuilder from '@utils/element-builder';
import { Car } from '@/components/CarContainer/Car/Car';

export class CarContainer {
  private carContainer: ElementBuilder;
  private car: Car;

  constructor() {
    this.carContainer = new ElementBuilder({ classes: ['car-container'] });

    // TODO
    this.car = new Car({
      name: 'Tesla',
      color: '#e6e6fa',
      id: 1,
    });
    this.carContainer.addChild(this.car.getElement());
  }

  public getCarContainer() {
    return this.carContainer;
  }
}
