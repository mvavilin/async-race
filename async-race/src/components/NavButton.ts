import ButtonBuilder from '@utils/button-builder';
import type { NavButtonProps } from '@types';
import { navigateTo } from '@utils/navigation';

export default class NavButton extends ButtonBuilder {
  constructor({ id = '', classes = [], text = '', route }: NavButtonProps) {
    super({
      id,
      classes: ['nav-btn', ...classes],
      text,
      event: { type: 'click', handler: () => navigateTo(route) },
    });
  }
}
