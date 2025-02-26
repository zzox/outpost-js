import { generateActor } from '../data/actor-data'
import { EncounterData, EncounterType } from '../data/encounter-data'
import { getScale, itemData, ItemType, targetItems, TargetType } from '../data/items'
import { randomInt } from '../util/util'
import { GameState } from './game-state'

// TEMP:
const SPAWN_TIME = 1

export class World {
  state: GameState
  time:number = 0
  day:number = 0

  // TEMP:
  spawnTime:number = SPAWN_TIME

  onEncounter:(d:EncounterData) => void

  constructor (state:GameState, onEncounter:(d:EncounterData) => void) {
    this.onEncounter = onEncounter
    this.state = state
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

    // weird types here! items is truthy here if the actors target is a target type and
    // not a specific item
    let items = targetItems.get(actor.target as TargetType)
    if (!items) {
      items = [actor.target as ItemType]
    }

    // get max value from scale for each item
    items.sort((a:ItemType, b:ItemType) =>
      (getScale(a, actor.level) * itemData.get(a)!.price) - getScale(b, actor.level) * itemData.get(b)!.price
    )
    console.log(items, getScale(items[0], actor.level) * itemData.get(items[0])!.price, getScale(items[1], actor.level) * itemData.get(items[1])!.price)

    let chosenItem: ItemType | undefined
    // get a random amount between 0 and max

    for (let i = 0; i < items.length; i++) {
      // check if we have items
    }

    // do we have the items the actor wants?
    // do we have all the backup items
    // check to see if the prices are set
    // otherwise launch an encounter

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
