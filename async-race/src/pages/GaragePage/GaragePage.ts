import { BasePage } from '@pages';
import { ElementBuilder, ButtonBuilder, getErrorMessageFromError, startRace } from '@utils';
import {
  Car,
  CreateCarForm,
  UpdateCarForm,
  NavButton,
  CarContainer,
  GenerateCarsButton,
} from '@components';
import { RoutePath } from '@types';
import type { CarOptions, QueryParam } from '@types';
import { getCars } from '@api/garage';
import { getWinner, updateWinner, createWinner } from '@api/winners';
import { raceState } from '@state/RaceState';
import { WINNER_MESSAGE_DURATION_MS, GARAGE_PAGE_LIMIT  } from '@/constants';

export default class GaragePage extends BasePage {
  private winnersButton: NavButton;
  private title: ElementBuilder;
  private totalCars = 0;

  private createForm: CreateCarForm;
  private updateForm: UpdateCarForm;

  private startRaceButton: ButtonBuilder;
  private resetButton: ButtonBuilder;
  private generateButton: GenerateCarsButton;

  private pageIndicator: ElementBuilder;
  private currentPage = 1;
  private prevButton: ButtonBuilder;
  private nextButton: ButtonBuilder;

  private track: ElementBuilder;
  private limit = GARAGE_PAGE_LIMIT;

  private cars: Car[] = [];
  private lastSelectedCarContainer: CarContainer | null = null;

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
    this.prevButton = new ButtonBuilder({ text: 'Prev', classes: ['pagination-btn'] });
    this.nextButton = new ButtonBuilder({ text: 'Next', classes: ['pagination-btn'] });

    this.startRaceButton = new ButtonBuilder({ text: 'Start Race', classes: ['start-race-btn'] });
    this.resetButton = new ButtonBuilder({
      text: 'Reset Race',
      classes: ['reset-race-btn'],
      disabled: true,
    });

    this.track = new ElementBuilder({ id: 'track', classes: ['track'] });

    this.render();
  }

  public render(): void {
    this.prevButton.addEvent({
      type: 'click',
      handler: () => this.changePage(this.currentPage - 1),
    });
    this.nextButton.addEvent({
      type: 'click',
      handler: () => this.changePage(this.currentPage + 1),
    });

    this.startRaceButton.addEvent({ type: 'click', handler: () => this.handleStartRace() });
    this.resetButton.addEvent({ type: 'click', handler: () => this.handleResetRace() });

    raceState.subscribe((racing) => {
      this.winnersButton.setDisabled(racing);
      this.startRaceButton.setDisabled(racing);
      this.generateButton.setDisabled(racing);
      this.prevButton.setDisabled(racing || this.currentPage <= 1);
      this.nextButton.setDisabled(racing || this.currentPage * this.limit >= this.totalCars);
    });

    this.root.addChild(
      this.title,
      this.winnersButton,
      this.createForm,
      this.updateForm,
      this.startRaceButton,
      this.resetButton,
      this.generateButton,
      this.pageIndicator,
      this.prevButton,
      this.nextButton,
      this.track
    );

    this.loadCars();
  }

  private async loadCars(page: number = this.currentPage, limit: number = this.limit) {
    try {
      this.cars = [];

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
    const carContainer = new CarContainer(car, (container) => {
      if (this.lastSelectedCarContainer && this.lastSelectedCarContainer !== container) {
        this.lastSelectedCarContainer.restoreDelete();
      }

      this.lastSelectedCarContainer = container;

      return this.updateForm.setCar(container);
    });

    const carId = carContainer.getCar().getInfo().id;
    carContainer.onDeleted = () => this.handleCarDeleted(carId);

    if (this.track.getChildCount() === this.limit) return;

    this.track.addChild(carContainer.getElement());

    this.cars.push(carContainer.getCar());
  }

  private async handleStartRace() {
    if (raceState.getRacing()) return;

    raceState.setRacing(true);

    try {
      const promises = this.cars.map((car) => {
        const distance = this.track.getOffsetWidth() - car.getOffsetWidth();
        return startRace(car, distance);
      });
      const results = await Promise.all(promises);

      const finished = results.filter((result) => result !== null);
      if (finished.length === 0) return;

      const winner = finished.reduce((previousValue, currentValue) =>
        currentValue.duration < previousValue.duration ? currentValue : previousValue
      );

      const winnerCar = winner.car;
      const winnerData = {
        id: winnerCar.getInfo().id,
        wins: 1,
        time: Number(winner.duration.toFixed(2)),
      };

      const winnerNameElement = new ElementBuilder({
        tag: 'div',
        content: `Winner: ${winnerCar.getInfo().name}`,
        classes: ['winner-name'],
      });

      this.track.addChild(winnerNameElement);

      setTimeout(() => {
        winnerNameElement.remove();
      }, WINNER_MESSAGE_DURATION_MS);

      const existingWinner = await getWinner(winnerData.id);

      if (existingWinner) {
        const updatedWins = existingWinner.wins + 1;
        const bestTime = Math.min(existingWinner.time, winnerData.time);
        await updateWinner(winnerData.id, { wins: updatedWins, time: bestTime });
      } else await createWinner(winnerData);
    } finally {
      this.resetButton.setDisabled(false);
    }
  }

  private handleResetRace() {
    raceState.setRacing(false);
    this.resetButton.setDisabled(true);

    this.cars.forEach((car) => car.reset());
  }

  private changePage(page: number) {
    if (page < 1) return;

    this.currentPage = page;

    this.loadCars();
  }

  private handleCarCreated(car: CarOptions) {
    this.totalCars += 1;

    this.title.setContent(`Garage (${this.totalCars})`);
    this.nextButton.setDisabled(!(this.track.getChildCount() + 1 > this.limit));

    this.addCarToTrack(car);
  }

  private handleCarDeleted(carId: number): void {
    this.cars = this.cars.filter((car) => car.getInfo().id !== carId);

    this.totalCars -= 1;
    this.title.setContent(`Garage (${this.totalCars})`);

    if (this.track.getChildCount() === 0) this.currentPage = Math.max(this.currentPage - 1, 1);

    this.loadCars();
  }
}
