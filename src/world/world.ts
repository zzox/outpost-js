import { generateActor } from '../data/actor-data'
import { EncounterData, EncounterResData, EncounterResType, EncounterType } from '../data/encounter-data'
import { getActorMaxPrice, getNumFromInventory, getScale, itemData } from '../data/items'
import { randomInt } from '../util/util'
import { GameState } from './game-state'

// TEMP:
const SPAWN_TIME = 10

export class World {
  state:GameState
  time:number = 0
  day:number = 0

  // TEMP:
  spawnTime:number = SPAWN_TIME

  currentEncounter?:EncounterData

  // callback denoting an encounter starting
  onEncounter:(d:EncounterData) => void
  // callback on an encounter resolving
  onEncounterRes:(d:EncounterResData) => void

  constructor (
    state:GameState,
    onEncounter:(d:EncounterData) => void,
    onEncounterRes:(d:EncounterResData) => void
  ) {
    this.onEncounter = onEncounter
    this.onEncounterRes = onEncounterRes
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
    this.spawnTime = SPAWN_TIME

    const actor = generateActor()

    const encounter = {
      type: EncounterType.Buy,
      actor,
      amount: 0,
      // TEMP:
      price: 0,
      item: actor.target
    }

    console.log(actor.target)

    /* following chunk is about getting a specific item that the actor wants from their target */

    // do we have the items the actor wants?
    // do we have all the backup items
    // check to see if the prices are set
    // otherwise launch an encounter

    // // weird types here! items is truthy here if the actors target is a target type and
    // // not a specific item
    // let items = targetItems.get(actor.target as TargetType)
    // if (!items) {
    //   items = [actor.target as ItemType]
    // }

    // // get max value from scale for each item
    // items.sort((a:ItemType, b:ItemType) =>
    //   (getScale(a, actor.level) * itemData.get(a)!.price) - getScale(b, actor.level) * itemData.get(b)!.price
    // )
    // console.log(items, getScale(items[0], actor.level) * itemData.get(items[0])!.price, getScale(items[1], actor.level) * itemData.get(items[1])!.price)

    // let chosenItem: ItemType | undefined
    // // get a random amount between 0 and max

    // for (let i = 0; i < items.length; i++) {
    //   // check if we have items
    // }
    /* chunk end */

    const data = itemData.get(actor.target)
    if (!data) {
      throw 'Cannot find item'
    }

    // calculate the scale of a target item between
    // TODO: random num between half scale and scale
    let amountWanted = getScale(actor.target, actor.level)

    const itemsInInventory = getNumFromInventory(this.state.wares, actor.target)
    if (itemsInInventory === 0) {
      this.onEncounterRes({ type: EncounterResType.DontHave, encounter })
      return
    }

    if (itemsInInventory < amountWanted) {
      amountWanted = itemsInInventory
    }

    const totalPrice = data.price * amountWanted
    if (totalPrice > actor.money) {
      this.onEncounterRes({ type: EncounterResType.CantAfford, encounter })
      return
    }

    let itemPrice = getNumFromInventory(this.state.prices, actor.target)

    encounter.amount = amountWanted
    encounter.price = amountWanted * itemPrice

    if (itemPrice !== 0) {
      if (itemPrice <= getActorMaxPrice(data.price, actor.leeway)) {
        this.onEncounterRes({ type: EncounterResType.Sold, encounter })
      } else {
        this.onEncounterRes({ type: EncounterResType.TooExpensive, encounter })
      }
      return
    } else {
      // TODO: update price with actor cheapness
      itemPrice = data.price
    }

    this.currentEncounter = encounter
    this.onEncounter(this.currentEncounter)
  }

  doEncounter (result:boolean) {
    if (!this.currentEncounter) {
      throw 'No encounter exists'
    }

    if (this.currentEncounter.type === EncounterType.Buy) {
      this.onEncounterRes({ type: result ? EncounterResType.Sold : EncounterResType.DenySold, encounter: this.currentEncounter })
      this.currentEncounter = undefined
    } else {
      throw 'Not Implemented'
    }
  }
}
