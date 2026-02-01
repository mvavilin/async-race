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