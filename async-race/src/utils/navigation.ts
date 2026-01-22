import { RoutePath } from '@types';

export function navigateTo(route: RoutePath) {
  window.location.hash = route;
}
