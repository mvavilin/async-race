import { type Route, RoutePath } from '@types';
import { GaragePage, WinnersPage } from '@pages';

export const routes: Route[] = [
  { path: RoutePath.GARAGE, component: new GaragePage() },
  { path: RoutePath.WINNERS, component: new WinnersPage() },
];
