import type { RaceStateListener } from '@types';

class RaceState {
  private racing = false;
  private listeners = new Set<RaceStateListener>();

  setRacing(racing: boolean) {
    this.racing = racing;
    this.notify();
  }

  getRacing() {
    return this.racing;
  }

  subscribe(func: RaceStateListener) {
    this.listeners.add(func);
  }

  unsubscribe(func: RaceStateListener) {
    this.listeners.delete(func);
  }

  private notify() {
    this.listeners.forEach((func) => func(this.racing));
  }
}

export const raceState = new RaceState();
