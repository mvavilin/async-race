import { CAR_NAMES } from '@/constants/constants';
import { startEngine, driveEngine } from '@api/engine';
import { Car } from '@components/CarContainer';

export const getRandomName: () => string = () => {
  const brands: string[] = Object.keys(CAR_NAMES);
  const brand: string | undefined = brands[Math.floor(Math.random() * brands.length)];

  if (brand === undefined) return '';
  const models = CAR_NAMES[brand];

  if (models === undefined) return `${brand}`;
  const model: string | undefined = models[Math.floor(Math.random() * models.length)];

  return `${brand} ${model}`;
};

export const getRandomColor: () => string = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;

export async function startRace(
  car: Car,
  distance: number
): Promise<{ car: Car; duration: number } | null> {
  if (car.isInit() === false) return null;

  car.start();

  try {
    const startResponse = await startEngine(car.getInfo().id);
    if (startResponse.velocity === undefined) return { car, duration: 0 };

    const duration = distance / startResponse.velocity;
    car.drive(distance, duration);

    await driveEngine(car.getInfo().id);

    car.finish();

    return { car, duration };
  } catch {
    car.break();
    return null;
  }
}
