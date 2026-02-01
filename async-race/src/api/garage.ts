import { ApiPath, HttpStatus, type QueryParam, type CarOptions } from '@types';
import { BASE_URL } from '@/constants/constants';
import { generateQueryString, getErrorMessage } from '@utils/api';

export const getCars = async (
  queryParams: QueryParam[] = []
): Promise<{ items: CarOptions[]; count: number }> => {
  const response = await fetch(`${BASE_URL}${ApiPath.GARAGE}${generateQueryString(queryParams)}`);

  switch (response.status) {
    case HttpStatus.OK: {
      const items: CarOptions[] = await response.json();
      const count: number = Number(response.headers.get('X-Total-Count'));
      return { items, count };
    }
    default:
      throw new Error(getErrorMessage(response));
  }
};

export const getCar = async (carId: number): Promise<CarOptions | null> => {
  const response = await fetch(`${BASE_URL}${ApiPath.GARAGE}/${carId}`);

  switch (response.status) {
    case HttpStatus.OK:
      return await response.json();
    case HttpStatus.NOT_FOUND:
      return null;
    default:
      throw new Error(getErrorMessage(response));
  }
};

export const createCar = async (carData: Omit<CarOptions, 'id'>): Promise<CarOptions> => {
  const response = await fetch(`${BASE_URL}${ApiPath.GARAGE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData),
  });

  switch (response.status) {
    case HttpStatus.CREATED:
      return await response.json();
    default:
      throw new Error(getErrorMessage(response));
  }
};

export const updateCar = async (
  carId: number,
  carData: Omit<CarOptions, 'id'>
): Promise<CarOptions | null> => {
  const response = await fetch(`${BASE_URL}${ApiPath.GARAGE}/${carId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData),
  });

  switch (response.status) {
    case HttpStatus.OK:
      return await response.json();
    case HttpStatus.NOT_FOUND:
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
    case HttpStatus.OK:
    case HttpStatus.NOT_FOUND:
      return null;
    default:
      throw new Error(getErrorMessage(response));
  }
};
