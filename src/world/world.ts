import { getName } from '../data/actor-data';
import { EncounterData, EncounterType } from '../data/encounter-data';
import { ItemType } from '../data/items';
import { randomInt } from '../util/util';
import { Actor } from './actor';

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
      // TODO: separate spawning an actor and an actor encounter
      const actor = new Actor(getName())
      const amount = randomInt(5)
      this.onEncounter({
        type: EncounterType.Buy,
        actor,
        amount,
        price: amount * 5,
        item: Math.random() < 0.5 ? ItemType.Wood : ItemType.SmallPotion
      });
      this.spawnTime = 10
    }

    // tiles.update();
  }
}
