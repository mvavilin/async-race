import '@components/inputs/ColorInput/ColorInput.css';
import InputBuilder from '@utils/input-builder';
import type { InputBuilderOptions } from '@types';
import { COLOR_CODES } from '@/constants/constants';

export default class ColorInput extends InputBuilder {
  constructor({
    id = '',
    classes = [],
    value = COLOR_CODES.DEFAULT_COLOR_INPUT,
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
