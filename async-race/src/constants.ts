import { type Route, RoutePath } from '@types';
import { GaragePage, WinnersPage } from '@pages';

export const BASE_URL = 'http://127.0.0.1:3000';

export const COLOR_CODES = {
  CAR_COLOR_FINISHED: '#00aa00',
  CAR_COLOR_BROKEN: '#cc0000',
  DEFAULT_CAR_COLOR_CREATE: '#0000ff',
  DEFAULT_CAR_COLOR_UPDATE: '#00ff00',
  DEFAULT_COLOR_INPUT: '#000000',
  DEFAULT_FALLBACK_COLOR: '#000000',
}

export const routes: Route[] = [
  { path: RoutePath.GARAGE, component: new GaragePage() },
  { path: RoutePath.WINNERS, component: new WinnersPage() },
];

export const CAR_NAMES: Record<string, string[]> = {
  Tesla: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Roadster'],
  Ford: ['Mustang', 'F-150', 'Focus', 'Explorer', 'GT'],
  BMW: ['X5', 'X3', 'M3', 'M5', 'i8'],
  Audi: ['A4', 'A6', 'Q7', 'RS6', 'TT'],
  Toyota: ['Corolla', 'Camry', 'Supra', 'RAV4', 'Prius'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Fit', 'Pilot'],
  Mazda: ['CX-5', 'MX-5', 'Mazda3', 'Mazda6', 'CX-30'],
  Nissan: ['GT-R', 'Skyline', 'Juke', 'Qashqai', '370Z'],
  Chevrolet: ['Camaro', 'Impala', 'Corvette', 'Tahoe', 'Malibu'],
  Kia: ['Sportage', 'Rio', 'Sorento', 'Ceed', 'Stinger'],
};

