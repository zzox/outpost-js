import { EncounterData, EncounterType } from '../data/encounter-data';

export class World {
  time:number = 0
  day:number = 0

  // TEMP:
  spawnTime:number = 10

  onEncounter:(d:EncounterData) => void

  constructor (onEncounter:(d:EncounterData) => void) {
    this.onEncounter = onEncounter
  }

  step () {
    this.time++;
    if (this.time == 360) {
      this.time = 0;
      this.day++;
    }

    if (--this.spawnTime === 0) {
      this.onEncounter({ type: EncounterType.Sell });
      this.spawnTime = 10
    }

    // tiles.update();
  }
}
