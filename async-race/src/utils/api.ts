import type { QueryParam } from '@types';

export const generateQueryString = (queryParams: QueryParam[] = []): string =>
  queryParams.length
    ? `?${queryParams.map((queryParam) => `${queryParam.key}=${queryParam.value}`).join('&')}`
    : '';

export const getErrorMessage = (response: Response): string =>
  `Request failed with HTTP status ${response.status} (${response.statusText})`;

export const getErrorMessageFromError = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unknown error occurred';
};
