import { RoutePath } from '@types';
import { BasePage } from '@pages';
import ElementBuilder from '@utils/element-builder';
import NavButton from '@components/buttons/NavButton';
import CarCreateForm from '@components/forms/CreateCarForm/CreateCarForm';
import UpdateCarForm from '@components/forms/UpdateCarForm/UpdateCarForm';
import { CarContainer } from '@components/CarContainer';
import type { CarOptions } from '@types';

export default class GaragePage extends BasePage {
  private title: ElementBuilder;
  private winnersButton: NavButton;
  private createForm: CarCreateForm;
  private updateForm: UpdateCarForm;
  private track: ElementBuilder;

  constructor() {
    super();

    this.title = new ElementBuilder({ tag: 'h1', content: 'Garage' });
    this.winnersButton = new NavButton({ text: 'Winners', route: RoutePath.WINNERS });
    this.createForm = new CarCreateForm({ onCreated: (car) => this.addCarToTrack(car) });
    this.updateForm = new UpdateCarForm({ onUpdated: (car) => car });
    this.track = new ElementBuilder({ id: 'track', classes: ['track'] });


    // TODO
    const car: CarOptions = { name: 'Tesla', color: '#515188', id: 2 };
    //
    this.addCarToTrack(car);

    this.root.addChild(
      this.title,
      this.winnersButton,
      this.createForm,
      this.updateForm,
      this.track
    );

    this.render();
  }

  private addCarToTrack(car: CarOptions): void {
    if (this.track.getChildCount() > 7) return;

    const carContainer = new CarContainer(car, (carContainer) =>
      this.updateForm.setCar(carContainer)
    );
    this.track.addChild(carContainer.getElement());
  }

  public render(): void { }
}
