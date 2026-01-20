import { type Route, RoutePath } from '@types';
import { GaragePage, WinnersPage } from '@pages';

export const routes: Route[] = [
  { path: RoutePath.GARAGE, component: new GaragePage() },
  { path: RoutePath.WINNERS, component: new WinnersPage() },
];

export const BASE_URL = 'http://127.0.0.1:3000';
