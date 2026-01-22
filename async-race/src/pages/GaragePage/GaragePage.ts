import { BasePage } from '@pages';
import ElementBuilder from '@utils/element-builder';
import NavButton from '@/components/buttons/NavButton';
import { RoutePath } from '@types';
import CarCreateForm from '@/components/forms/CreateCarForm/CreateCarForm';
import UpdateCarForm from '@/components/forms/UpdateCarForm/UpdateCarForm';

import ButtonBuilder from '@utils/button-builder';
import type { Car } from '@types';

export default class GaragePage extends BasePage {
  protected title: ElementBuilder;
  protected winnersButton: NavButton;
  protected createForm: CarCreateForm;
  protected updateForm: UpdateCarForm;

  protected selectCarButton: ButtonBuilder;

  constructor() {
    super();

    this.title = new ElementBuilder({ tag: 'h1', content: 'Garage' });
    this.root.addChild(this.title);

    this.winnersButton = new NavButton({ text: 'Winners', route: RoutePath.WINNERS });
    this.root.addChild(this.winnersButton);

    this.createForm = new CarCreateForm({
      onCreated: (car) => {
        // TODO
        console.log('Car created:', car);
      },
    });
    this.root.addChild(this.createForm);

    this.updateForm = new UpdateCarForm({
      // TODO
      onUpdated: (car) => console.log('Car updated:', car),
    });
    this.root.addChild(this.updateForm);

    // TODO
    this.selectCarButton = new ButtonBuilder({
      text: 'Select Car',
      classes: ['select-car-btn'],
      event: {
        type: 'click',
        handler: () => {
          const car: Car = { id: 1, name: 'Tesla Model S', color: '#ff0000' };
          this.updateForm.setCarData(car);
        },
      },
    });
    this.root.addChild(this.selectCarButton);

    this.render();
  }

  public render(): void {}
}
