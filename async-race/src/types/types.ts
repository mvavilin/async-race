import { BasePage } from '@pages';
import { RoutePath } from '@types';

export type Route = {
  path: RoutePath;
  component: BasePage;
};

export type Car = {
  id: number;
  name: string;
  color: string;
};

export type QueryParam = {
  key: string;
  value: string;
};

export type ButtonType = HTMLButtonElement['type'];
