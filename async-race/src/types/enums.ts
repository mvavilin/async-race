export enum RoutePath {
  GARAGE = '#/garage',
  WINNERS = '#/winners',
}

export enum ApiPath {
  GARAGE = '/garage',
  ENGINE = '/engine',
  WINNERS = '/winners',
}

export enum CarStatus {
  INIT = 'init',
  STARTED = 'started',
  DRIVING = 'driving',
  BROKEN = 'broken',
  FINISHED = 'finished',
}

export enum WinnerSortField {
  WINS = 'wins',
  TIME = 'time',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum EngineStatus {
  STARTED = 'started',
  STOPPED = 'stopped',
  DRIVE = 'drive',
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}