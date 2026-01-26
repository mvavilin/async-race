import { BasePage } from '@pages';
import { ElementBuilder, ButtonBuilder, getErrorMessageFromError } from '@utils';
import {
  CreateCarForm,
  UpdateCarForm,
  NavButton,
  CarContainer,
  GenerateCarsButton,
} from '@components';
import { RoutePath } from '@types';
import type { CarOptions, QueryParam } from '@types';
import { getCars } from '@api/garage';

export default class GaragePage extends BasePage {
  private winnersButton: NavButton;
  private title: ElementBuilder;
  private totalCars = 0;

  private createForm: CreateCarForm;
  private updateForm: UpdateCarForm;

  private generateButton: GenerateCarsButton;

  private pageIndicator: ElementBuilder;
  private currentPage = 1;
  private prevButton: ButtonBuilder;
  private nextButton: ButtonBuilder;

  private track: ElementBuilder;
  private limit = 7;

  constructor() {
    super();

    this.winnersButton = new NavButton({ text: 'Winners', route: RoutePath.WINNERS });
    this.title = new ElementBuilder({ tag: 'h1', content: 'Garage' });

    this.createForm = new CreateCarForm({ onCreated: (car) => this.handleCarCreated(car) });
    this.updateForm = new UpdateCarForm({ onUpdated: (car) => car });

    this.generateButton = new GenerateCarsButton(() => this.loadCars());

    this.pageIndicator = new ElementBuilder({
      tag: 'p',
      classes: ['page-indicator'],
      content: `Page: ${this.currentPage}`,
    });
    this.prevButton = new ButtonBuilder({
      text: 'Prev',
      classes: ['pagination-btn'],
      event: { type: 'click', handler: () => this.changePage(this.currentPage - 1) },
    });
    this.nextButton = new ButtonBuilder({
      text: 'Next',
      classes: ['pagination-btn'],
      event: { type: 'click', handler: () => this.changePage(this.currentPage + 1) },
    });

    this.track = new ElementBuilder({ id: 'track', classes: ['track'] });

    this.root.addChild(
      this.title,
      this.winnersButton,
      this.createForm,
      this.updateForm,
      this.generateButton,
      this.pageIndicator,
      this.prevButton,
      this.nextButton,
      this.track
    );

    this.loadCars();
  }

  public render(): void {}

  private changePage(page: number) {
    if (page < 1) return;

    this.currentPage = page;

    console.log(this.currentPage);

    this.loadCars();
  }

  private async loadCars(page: number = this.currentPage, limit: number = this.limit) {
    try {
      const queryParams: QueryParam[] = [
        { key: '_page', value: page.toString() },
        { key: '_limit', value: limit.toString() },
      ];

      const { items, count } = await getCars(queryParams);

      this.totalCars = count;
      this.title.setContent(`Garage (${this.totalCars})`);
      this.pageIndicator.setContent(`Page: ${this.currentPage}`);

      this.track.removeContent();
      items.forEach((car) => this.addCarToTrack(car));

      this.prevButton.setDisabled(this.currentPage <= 1);
      this.nextButton.setDisabled(this.currentPage * this.limit >= this.totalCars);
    } catch (error) {
      throw new Error(getErrorMessageFromError(error));
    }
  }

  private addCarToTrack(car: CarOptions): void {
    if (this.track.getChildCount() === this.limit) return;

    const carContainer = new CarContainer(car, (container) => this.updateForm.setCar(container));

    carContainer.onDeleted = () => this.handleCarDeleted();

    this.track.addChild(carContainer.getElement());
  }

  private async handleCarCreated(car: CarOptions) {
    this.totalCars += 1;

    this.title.setContent(`Garage (${this.totalCars})`);
    this.nextButton.setDisabled(!(this.track.getChildCount() + 1 > this.limit));

    this.addCarToTrack(car);
  }

  public handleCarDeleted(): void {
    this.totalCars -= 1;
    this.title.setContent(`Garage (${this.totalCars})`);

    if (this.track.getChildCount() === 0) this.currentPage = Math.max(this.currentPage - 1, 1);

    this.loadCars();
  }
}
