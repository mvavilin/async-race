import { BasePage } from '@pages';
import { RoutePath } from '@types';

export type Route = {
  path: RoutePath;
  component: BasePage;
};

export type CarOptions = {
  id: number;
  name: string;
  color: string;
};

export type QueryParam = {
  key: string;
  value: string;
};

export type ButtonType = HTMLButtonElement['type'];

export type InputType = HTMLInputElement['type'];
