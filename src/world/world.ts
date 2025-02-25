import { generateActor } from '../data/actor-data'
import { EncounterData, EncounterType } from '../data/encounter-data'
import { ItemType } from '../data/items'
import { randomInt } from '../util/util'

// TEMP:
const SPAWN_TIME = 1

export class World {
  time:number = 0
  day:number = 0

  // TEMP:
  spawnTime:number = SPAWN_TIME

  onEncounter:(d:EncounterData) => void

  constructor (onEncounter:(d:EncounterData) => void) {
    this.onEncounter = onEncounter
  }

  step () {
    this.time++
    if (this.time == 360) {
      this.time = 0
      this.day++
    }

    if (--this.spawnTime === 0) {
      // TODO: separate spawning an actor and an actor encounter
      this.spawnAction()
    }

    // tiles.update()
  }

  spawnAction () {
    const actor = generateActor()
    const amount = randomInt(5)

    console.log(actor.target)

    this.onEncounter({
      type: EncounterType.Buy,
      actor,
      amount,
      price: amount * 5,
      item: Math.random() < 0.5 ? ItemType.Wood : ItemType.SmallPotion
    })
    this.spawnTime = SPAWN_TIME
  }
}
