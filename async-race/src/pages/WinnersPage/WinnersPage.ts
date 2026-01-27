import '@pages/WinnersPage/WinnersPage.css';

import { BasePage } from '@pages';
import { ElementBuilder, ButtonBuilder } from '@utils';
import { RoutePath, WinnerSortField, SortOrder } from '@types';
import type { WinnerUIOptions, QueryParam, Column } from '@types';
import { getWinners } from '@api/winners';
import { getCar } from '@api/garage';
import { NavButton } from '@components';

export default class WinnersPage extends BasePage {
  private garageButton: ButtonBuilder;
  private title: ElementBuilder;
  private table: ElementBuilder;
  private pageIndicator: ElementBuilder;
  private prevButton: ButtonBuilder;
  private nextButton: ButtonBuilder;
  private refreshButton: ButtonBuilder;
  private currentPage = 1;
  private limit = 10;
  private totalWinners = 0;
  private sortField: WinnerSortField | null = null;
  private sortOrder: SortOrder = SortOrder.ASC;
  private winners: WinnerUIOptions[] = [];

  constructor() {
    super();

    this.garageButton = new NavButton({ text: 'Garage', route: RoutePath.GARAGE });
    this.title = new ElementBuilder({ tag: 'h1', content: 'Winners' });
    this.table = new ElementBuilder({ tag: 'table', classes: ['winners-table'] });
    this.pageIndicator = new ElementBuilder({
      tag: 'p',
      classes: ['page-indicator'],
      content: `Page: ${this.currentPage}`,
    });
    this.prevButton = new ButtonBuilder({ text: 'Prev' });
    this.nextButton = new ButtonBuilder({ text: 'Next' });
    this.refreshButton = new ButtonBuilder({ text: 'Refresh Table' });

    this.prevButton.addEvent({
      type: 'click',
      handler: () => this.changePage(this.currentPage - 1),
    });
    this.nextButton.addEvent({
      type: 'click',
      handler: () => this.changePage(this.currentPage + 1),
    });
    this.refreshButton.addEvent({ type: 'click', handler: () => this.loadWinners() });

    this.root.addChild(
      this.garageButton,
      this.title,
      this.pageIndicator,
      this.prevButton,
      this.nextButton,
      this.refreshButton,
      this.table
    );

    this.loadWinners();
  }

  public async loadWinners() {
    const query: QueryParam[] = [
      { key: '_page', value: `${this.currentPage}` },
      { key: '_limit', value: `${this.limit}` },
    ];

    if (this.sortField) {
      query.push({ key: '_sort', value: this.sortField }, { key: '_order', value: this.sortOrder });
    }

    const { items, count } = await getWinners(query);
    this.totalWinners = count;
    this.title.setContent(`Winners (${count})`)
    this.winners = await Promise.all(
      items.map(async (winner) => {
        const car = await getCar(winner.id);
        if (car === null) return { ...winner, name: '', color: '#000000' };
        else return { ...winner, name: car.name, color: car.color };
      })
    );

    this.render();
  }

  public render() {
    this.table.removeContent();

    const tableRow = new ElementBuilder({ tag: 'tr' });
    const columns: Column[] = [
      { label: '№' },
      { label: 'Car' },
      { label: 'Name' },
      { label: 'Wins', field: WinnerSortField.WINS },
      { label: 'Best time (s)', field: WinnerSortField.TIME },
    ];

    columns.forEach((column) => {
      const tableHeader = new ElementBuilder({ tag: 'th', content: column.label });
      if (column.field)
        tableHeader.addEvent({ type: 'click', handler: () => this.sortBy(column.field) });
      tableRow.addChild(tableHeader);
    });

    this.table.addChild(tableRow);

    this.winners.forEach((winner, index) => {
      const tableRow = new ElementBuilder({ tag: 'tr' });
      const carIcon = new ElementBuilder({
        tag: 'div',
        classes: ['car-icon'],
        styles: { backgroundColor: winner.color },
      });

      tableRow.addChild(
        new ElementBuilder({
          tag: 'td',
          content: `${(this.currentPage - 1) * this.limit + index + 1}`,
        }),
        new ElementBuilder({ tag: 'td', children: [carIcon] }),
        new ElementBuilder({ tag: 'td', content: winner.name }),
        new ElementBuilder({ tag: 'td', content: `${winner.wins}` }),
        new ElementBuilder({ tag: 'td', content: `${winner.time}` })
      );

      this.table.addChild(tableRow);
    });

    this.pageIndicator.setContent(`Page: ${this.currentPage}`);
    this.prevButton.setDisabled(this.currentPage <= 1);
    this.nextButton.setDisabled(this.currentPage * this.limit >= this.totalWinners);
  }

  private sortBy(field: WinnerSortField | undefined) {
    if (field === undefined) return;
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    } else {
      this.sortField = field;
      this.sortOrder = SortOrder.ASC;
    }
    this.loadWinners();
  }

  private changePage(page: number) {
    if (page < 1) return;
    this.currentPage = page;
    this.loadWinners();
  }
}
