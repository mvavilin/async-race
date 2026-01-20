import { type Car, type QueryParam, ApiPath } from '@types';
import { BASE_URL } from '@/constants';
import { generateQueryString, getErrorMessage } from '@utils/api';

export const getCars = async (
  queryParams: QueryParam[] = []
): Promise<{ items: Car[]; count: number }> => {
  const response = await fetch(`${BASE_URL}${ApiPath.GARAGE}${generateQueryString(queryParams)}`);

  switch (response.status) {
    case 200: {
      const items: Car[] = await response.json();
      const count: number = Number(response.headers.get('X-Total-Count'));
      return { items, count };
    }
    default:
      throw new Error(getErrorMessage(response));
  }
};

export const getCar = async (carId: number): Promise<Car | null> => {
  const response = await fetch(`${BASE_URL}${ApiPath.GARAGE}/${carId}`);

  switch (response.status) {
    case 200:
      return await response.json();
    case 404:
      return null;
    default:
      throw new Error(getErrorMessage(response));
  }
};

export const createCar = async (carData: Omit<Car, 'id'>): Promise<Car> => {
  const response = await fetch(`${BASE_URL}${ApiPath.GARAGE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData),
  });

  switch (response.status) {
    case 201:
      return await response.json();
    default:
      throw new Error(getErrorMessage(response));
  }
};

export const updateCar = async (carId: number, carData: Omit<Car, 'id'>): Promise<Car | null> => {
  const response = await fetch(`${BASE_URL}${ApiPath.GARAGE}/${carId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData),
  });

  switch (response.status) {
    case 200:
      return await response.json();
    case 404:
      return null;
    default:
      throw new Error(getErrorMessage(response));
  }
};

export const deleteCar = async (carId: number): Promise<null> => {
  const response = await fetch(`${BASE_URL}${ApiPath.GARAGE}/${carId}`, {
    method: 'DELETE',
  });

  switch (response.status) {
    case 200:
    case 404:
      return null;
    default:
      throw new Error(getErrorMessage(response));
  }
};
