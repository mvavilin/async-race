import ElementBuilder from '@utils/element-builder';
import TextInput from '@/components/inputs/TextInput/TextInput';
import ColorInput from '@/components/inputs/ColorInput/ColorInput';
import type { ButtonType, InputType, CarOptions } from '@types';
import type { CarContainer } from '@components/CarContainer';
import { RoutePath } from '@types';

interface EventOptions {
  type: InputType | ButtonType;
  handler: EventListenerOrEventListenerObject;
  options?: boolean | AddEventListenerOptions;
}

export interface ElementBuilderOptions {
  tag?: keyof HTMLElementTagNameMap;
  id?: string;
  classes?: string[];
  attributes?: Record<string, string>;
  content?: string;
  event?: EventOptions;
  children?: ElementBuilder[];
  styles?: Partial<CSSStyleDeclaration>;
}

export interface EngineResponse {
  velocity?: number;
  distance?: number;
  success?: boolean;
}

export interface ButtonBuilderOptions {
  id?: string;
  classes?: string[];
  text?: string;
  event?: EventOptions;
  type?: ButtonType;
  disabled?: boolean;
}

export interface NavButtonProps {
  id?: string;
  classes?: string[];
  text?: string;
  route: RoutePath;
}

export interface InputBuilderOptions {
  id?: string;
  classes?: string[];
  value?: string;
  type?: InputType;
  placeholder?: string;
  disabled?: boolean;
  event?: EventOptions;
}

interface BaseCarForm {
  nameInput: TextInput;
  colorInput: ColorInput;
  clear: () => void;
}

interface UpdateCarForm extends BaseCarForm {
  idInput: TextInput;
}

interface BaseCarButtonProps<FormType extends BaseCarForm> {
  id?: string;
  classes?: string[];
  text?: string;
  type?: ButtonType;
  carForm: FormType;
}

export interface CreateCarButtonProps extends BaseCarButtonProps<BaseCarForm> {
  onCreated: (car: CarOptions) => void;
}

export interface UpdateCarButtonProps extends BaseCarButtonProps<UpdateCarForm> {
  carContainer: CarContainer | undefined;
  onUpdated: (car: CarOptions) => void;
}

export interface CreateCarFormProps {
  onCreated: (car: CarOptions) => void;
}

export interface UpdateCarFormProps {
  onUpdated: (car: CarOptions) => void;
}
