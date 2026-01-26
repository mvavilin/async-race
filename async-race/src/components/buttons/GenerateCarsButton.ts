import ButtonBuilder from '@utils/button-builder';
import { createCar } from '@api/garage';
import { getRandomName, getRandomColor } from '@utils';
import type { CarOptions } from '@types';

export default class GenerateCarsButton extends ButtonBuilder {
  constructor(private onGenerated: () => void) {
    super({
      text: 'Generate Cars',
      classes: ['generate-cars-btn'],
      event: { type: 'click', handler: () => this.handleClick() },
    });
  }

  private handleClick: () => Promise<void> = async () => {
    this.setDisabled(true);
    try {
      const requests: Promise<CarOptions>[] = Array.from({ length: 100 }, () =>
        createCar({ name: getRandomName(), color: getRandomColor() })
      );
      await Promise.all(requests);
      this.onGenerated();
    } finally {
      this.setDisabled(false);
    }
  };
}
