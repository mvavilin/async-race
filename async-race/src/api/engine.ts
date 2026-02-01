import { ApiPath, HttpStatus, type QueryParam, type EngineResponse, EngineStatus } from '@types';
import { BASE_URL, QUERY_PARAMS } from '@/constants/constants';
import { generateQueryString, getErrorMessage } from '@utils/api';

const setEngineStatus = async (queryParams: QueryParam[] = []): Promise<EngineResponse> => {
  const response = await fetch(`${BASE_URL}${ApiPath.ENGINE}${generateQueryString(queryParams)}`, {
    method: 'PATCH',
  });

  switch (response.status) {
    case HttpStatus.OK:
      return await response.json();
    case HttpStatus.BAD_REQUEST:
    case HttpStatus.NOT_FOUND:
    case HttpStatus.TOO_MANY_REQUESTS:
    case HttpStatus.INTERNAL_SERVER_ERROR:
      throw new Error(getErrorMessage(response));
    default:
      throw new Error(getErrorMessage(response));
  }
};

export const startEngine = (id: number): Promise<EngineResponse> =>
  setEngineStatus([
    { key: QUERY_PARAMS.ID, value: `${id}` },
    { key: QUERY_PARAMS.STATUS, value: EngineStatus.STARTED },
  ]);

export const stopEngine = (id: number): Promise<EngineResponse> =>
  setEngineStatus([
    { key: QUERY_PARAMS.ID, value: `${id}` },
    { key: QUERY_PARAMS.STATUS, value: EngineStatus.STOPPED },
  ]);

export const driveEngine = (id: number): Promise<EngineResponse> =>
  setEngineStatus([
    { key: QUERY_PARAMS.ID, value: `${id}` },
    { key: QUERY_PARAMS.STATUS, value: EngineStatus.DRIVE },
  ]);
