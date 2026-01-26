import { BasePage } from '@pages';
import { ElementBuilder } from '@utils';
import { CreateCarForm, UpdateCarForm, NavButton, CarContainer } from '@components';
import { RoutePath, type CarOptions } from '@types';

export default class GaragePage extends BasePage {
  private title: ElementBuilder;
  private winnersButton: NavButton;
  private createForm: CreateCarForm;
  private updateForm: UpdateCarForm;
  private track: ElementBuilder;

  constructor() {
    super();

    this.title = new ElementBuilder({ tag: 'h1', content: 'Garage' });
    this.winnersButton = new NavButton({ text: 'Winners', route: RoutePath.WINNERS });
    this.createForm = new CreateCarForm({ onCreated: (car) => this.addCarToTrack(car) });
    this.updateForm = new UpdateCarForm({ onUpdated: (car) => car });
    this.track = new ElementBuilder({ id: 'track', classes: ['track'] });

    // TODO
    const car: CarOptions = { name: 'Tesla', color: '#515188', id: 2 };
    //
    this.addCarToTrack(car);

    this.root.addChild(this.title, this.winnersButton, this.createForm, this.updateForm);

    this.render();
  }

  private addCarToTrack(car: CarOptions): void {
    if (this.track.getChildCount() > 7) return;

    const carContainer = new CarContainer(car, (carContainer) =>
      this.updateForm.setCar(carContainer)
    );
    this.track.addChild(carContainer.getElement());
  }

  public render(): void {
    this.root.addChild(this.track);
  }
}
