import { generateActor } from '../data/actor-data'
import { EncounterData, EncounterResData, EncounterResType, EncounterType } from '../data/encounter-data'
import { getActorMaxPrice, getNumFromInventory, getScale, itemData } from '../data/items'
import { randomInt } from '../util/util'
import { Actor } from './actor'
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

    if (actor.targetType === EncounterType.Buy) {
      this.handleBuy(actor)
    } else {
      this.handleSell(actor)
    }
  }

  handleBuy (actor:Actor) {
    const encounter = {
      type: EncounterType.Buy,
      actor,
      amount: 0,
      price: 0,
      item: actor.target
    }

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

    // calculate the scale of a target item from level
    // TODO: random num between half scale and scale
    let amountWanted = Math.max(getScale(actor.target, actor.level), 1)

    const itemsInInventory = getNumFromInventory(this.state.wares, actor.target)
    if (itemsInInventory === 0) {
      this.onEncounterRes({ type: EncounterResType.DontHave, encounter })
      return
    }

    // buy all items if we want too many
    if (itemsInInventory < amountWanted) {
      amountWanted = itemsInInventory
    }
    encounter.amount = amountWanted

    const itemPrice = getNumFromInventory(this.state.prices, actor.target)
    encounter.price = amountWanted * itemPrice

    // if the prices are set, decide here if the actor buys
    if (itemPrice !== 0) {
      if (encounter.price > actor.money) {
        this.onEncounterRes({ type: EncounterResType.CantAfford, encounter })
      } else if (itemPrice <= getActorMaxPrice(data.price, actor.leeway)) {
        this.onEncounterRes({ type: EncounterResType.Sold, encounter })
      } else {
        this.onEncounterRes({ type: EncounterResType.TooExpensive, encounter })
      }
      return
    } else {
      // TODO: update price with actor cheapness
      encounter.price = amountWanted * data.price
    }

    this.currentEncounter = encounter
    this.onEncounter(this.currentEncounter)
  }

  handleSell (actor:Actor) {
    const encounter = {
      type: EncounterType.Sell,
      actor,
      amount: 0,
      price: 0,
      item: actor.target
    }

    const data = itemData.get(actor.target)
    if (!data) {
      throw 'Cannot find item'
    }

    // TODO: specific scaling per item
    const amount = Math.max(getScale(actor.target, actor.level) * 10, 1)
    // TODO: specific margin per item
    const price = Math.ceil(data.price * 0.5)

    encounter.amount = amount
    encounter.price = price * amount

    if (encounter.price > this.state.money) {
      this.onEncounterRes({ type: EncounterResType.CantAfford, encounter })
      return
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
    } else if (this.currentEncounter.type === EncounterType.Sell) {
      this.onEncounterRes({ type: result ? EncounterResType.Bought : EncounterResType.NotBought, encounter: this.currentEncounter })
      this.currentEncounter = undefined
    } else {
      throw 'Not Implemented'
    }
  }
}
