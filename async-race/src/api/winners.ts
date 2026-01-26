import { ApiPath, type QueryParam, type WinnerOptions } from '@types';
import { BASE_URL } from '@/constants';
import { generateQueryString, getErrorMessage } from '@utils/api';

export const getWinners = async (
  queryParams: QueryParam[] = []
): Promise<{ items: WinnerOptions[]; count: number }> => {
  const response = await fetch(`${BASE_URL}${ApiPath.WINNERS}${generateQueryString(queryParams)}`);
  
  switch (response.status) {
    case 200: {
      const items: WinnerOptions[] = await response.json();
      const count: number = Number(response.headers.get('X-Total-Count'));
      return { items, count };
    }
    default:
      throw new Error(getErrorMessage(response));
  }
};

export const getWinner = async (winnerId: number): Promise<WinnerOptions | null> => {
  const response = await fetch(`${BASE_URL}${ApiPath.WINNERS}/${winnerId}`);

  switch (response.status) {
    case 200:
      return await response.json();
    case 404:
      return null;
    default:
      throw new Error(getErrorMessage(response));
  }
};

export const createWinner = async (winnerData: WinnerOptions): Promise<WinnerOptions> => {
  const response = await fetch(`${BASE_URL}${ApiPath.WINNERS}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winnerData),
  });

  switch (response.status) {
    case 201:
      return await response.json();
    default:
      throw new Error(getErrorMessage(response));
  }
};

export const updateWinner = async (
  winnerId: number,
  winnerData: Omit<WinnerOptions, 'id'>
): Promise<WinnerOptions | null> => {
  const response = await fetch(`${BASE_URL}${ApiPath.WINNERS}/${winnerId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winnerData),
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

export const deleteWinner = async (winnerId: number): Promise<null> => {
  const response = await fetch(`${BASE_URL}${ApiPath.WINNERS}/${winnerId}`, { method: 'DELETE' });
  
  switch (response.status) {
    case 200:
    case 404:
      return null;
    default:
      throw new Error(getErrorMessage(response));
  }
};
