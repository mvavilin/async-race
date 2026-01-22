import '@components/inputs/TextInput/TextInput.css';
import InputBuilder from '@utils/input-builder';
import type { InputBuilderOptions } from '@types';

export default class TextInput extends InputBuilder {
  constructor({
    id = '',
    classes = [],
    value = '',
    placeholder = '',
    disabled = false,
  }: InputBuilderOptions = {}) {
    super({
      id,
      classes: ['text-input', ...classes],
      type: 'text',
      value,
      placeholder,
      disabled,
      event: { type: 'blur', handler: () => this.isValidate() },
    });
  }

  public isValidate(): boolean {
    const value = this.getValue().trim();

    if (value) {
      this.removeClass('input-error');
      return true;
    }

    this.addClass('input-error');
    return false;
  }
}
