import ElementBuilder from '@utils/element-builder';
import type { ButtonBuilderOptions, ButtonType } from '@types';

export default class ButtonBuilder extends ElementBuilder {
  constructor({
    id = '',
    classes = [],
    text = '',
    event = { type: 'click', handler: () => { } },
    type = 'button',
    disabled = false,
  }: ButtonBuilderOptions = {}) {
    super({ tag: 'button', id, classes: ['btn', ...classes], content: text, event });

    this.setType(type);
    if (disabled) this.disable();
  }

  public setType(type: ButtonType): void {
    this.getElement().setAttribute('type', type);
  }

  private disable(): void {
    const button = this.getElement();
    if (button instanceof HTMLButtonElement) button.disabled = true;
  }

  private enable(): void {
    const button = this.getElement();
    if (button instanceof HTMLButtonElement) button.disabled = false;
  }

  public setDisabled(state: boolean): void {
    if (state) this.disable()
    else this.enable();
  }
}
