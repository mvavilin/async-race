import ElementBuilder from '@utils/element-builder';
import type { ButtonType, InputType } from '@types';
import { RoutePath } from '@types';

interface EventOptions {
  type: string;
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
}
