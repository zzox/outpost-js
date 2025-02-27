import { ItemType, Inventory } from '../data/items'

const startingWares = new Map()
startingWares.set(ItemType.Rope, 100)
startingWares.set(ItemType.Wood, 50)
startingWares.set(ItemType.Potion, 10)

export class GameState {
  money:number

  wares:Inventory

  constructor () {
    this.money = 500
    this.wares = startingWares
  }

  buyItem (item:ItemType, amount:number, totalPrice:number) {}

  sellItem (item:ItemType, amount:number, totalPrice:number) {}
}
