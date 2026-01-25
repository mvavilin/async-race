import { RoutePath } from '@types';
import { BasePage } from '@pages';
import ElementBuilder from '@utils/element-builder';
import ButtonBuilder from '@utils/button-builder';
import NavButton from '@components/buttons/NavButton';
import CarCreateForm from '@components/forms/CreateCarForm/CreateCarForm';
import UpdateCarForm from '@components/forms/UpdateCarForm/UpdateCarForm';
import type { Car } from '@types';
import { CarContainer } from '@components/CarContainer';

export default class GaragePage extends BasePage {
  private title: ElementBuilder;
  private winnersButton: NavButton;
  private createForm: CarCreateForm;
  private updateForm: UpdateCarForm;
  private track: ElementBuilder;
  private selectCarButton: ButtonBuilder;
  // TODO
  private carContainer: CarContainer;

  constructor() {
    super();

    this.title = new ElementBuilder({ tag: 'h1', content: 'Garage' });

    this.winnersButton = new NavButton({ text: 'Winners', route: RoutePath.WINNERS });

    this.createForm = new CarCreateForm({
      onCreated: (car) => {
        // TODO
        console.log('Car created:', car);
      },
    });

    this.updateForm = new UpdateCarForm({
      // TODO
      onUpdated: (car) => console.log('Car updated:', car),
    });
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

    this.track = new ElementBuilder({ id: 'track', classes: ['track'] });
    // TODO
    this.carContainer = new CarContainer({
      name: 'Tesla',
      color: '#515188ff',
      id: 1,
    });

    this.track.addChild(this.carContainer.getElement());
    this.root.addChild(
      this.title,
      this.winnersButton,
      this.createForm,
      this.updateForm,
      this.selectCarButton,
      this.track
    );

    this.render();
  }

  public render(): void {}
}
