import { BasePage } from '@pages';
import { RoutePath } from '@types';

export type Route = {
  path: RoutePath;
  component: BasePage;
};
