import '@components/ColorInput/ColorInput.css';
import InputBuilder from '@utils/input-builder';
import type { InputBuilderOptions } from '@types';

export default class ColorInput extends InputBuilder {
  constructor({
    id = '',
    classes = [],
    value = '#000000',
    disabled = false,
  }: InputBuilderOptions = {}) {
    super({
      id,
      classes: ['color-input', ...classes],
      type: 'color',
      value,
      disabled,
    });
  }
}
