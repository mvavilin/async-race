import { ApiPath, type QueryParam, type EngineResponse } from '@types';
import { BASE_URL } from '@/constants';
import { generateQueryString, getErrorMessage } from '@utils/api';

const setEngineStatus = async (queryParams: QueryParam[] = []): Promise<EngineResponse> => {
  const response = await fetch(`${BASE_URL}${ApiPath.ENGINE}${generateQueryString(queryParams)}`, {
    method: 'PATCH',
  });

  switch (response.status) {
    case 200:
      return await response.json();
    case 400:
    case 404:
    case 429:
    case 500:
      throw new Error(getErrorMessage(response));
    default:
      throw new Error(getErrorMessage(response));
  }
};

export const startEngine = (id: number): Promise<EngineResponse> =>
  setEngineStatus([
    { key: 'id', value: `${id}` },
    { key: 'status', value: 'started' },
  ]);

export const stopEngine = (id: number): Promise<EngineResponse> =>
  setEngineStatus([
    { key: 'id', value: `${id}` },
    { key: 'status', value: 'stopped' },
  ]);

export const driveEngine = (id: number): Promise<EngineResponse> =>
  setEngineStatus([
    { key: 'id', value: `${id}` },
    { key: 'status', value: 'drive' },
  ]);
