import ElementBuilder from '@utils/element-builder';
import type { InputBuilderOptions, InputType } from '@types';

export default class InputBuilder extends ElementBuilder {
  constructor({
    id = '',
    classes = [],
    value = '',
    type = 'text',
    placeholder = '',
    disabled = false,
  }: InputBuilderOptions = {}) {
    super({ tag: 'input', id, classes: ['input', ...classes] });

    this.setType(type);
    this.setValue(value);
    this.setPlaceholder(placeholder);
    if (disabled) this.setDisabled(true);
  }

  public setType(type: InputType): void {
    const input = this.getElement();
    if (input instanceof HTMLInputElement) input.type = type;
  }

  public setValue(value: string): void {
    const input = this.getElement();
    if (input instanceof HTMLInputElement) input.value = value;
  }

  public getValue(): string {
    const input = this.getElement();
    if (input instanceof HTMLInputElement) return input.value;
    return '';
  }

  public setPlaceholder(placeholder: string): void {
    const input = this.getElement();
    if (input instanceof HTMLInputElement) input.placeholder = placeholder;
  }

  public setDisabled(state: boolean): void {
    const input = this.getElement();
    if (input instanceof HTMLInputElement) input.disabled = state;
  }

  public clear(): void {
    this.setValue('');
  }
}
