import { BasePage } from '@pages';
import { RoutePath, CarStatus } from '@types';

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

export type CarListener = (status: CarStatus) => void;

export type RaceStateListener = (racing: boolean) => void;
