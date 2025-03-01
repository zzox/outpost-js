import { ItemType, Inventory } from '../data/items'

const startingWares = new Map<ItemType, number>()
startingWares.set(ItemType.Rope, 100)
startingWares.set(ItemType.Wood, 50)
startingWares.set(ItemType.Potion, 10)

const startingPrices = new Map<ItemType, number>()
startingPrices.set(ItemType.Rope, 5)
startingPrices.set(ItemType.Wood, 2)
startingPrices.set(ItemType.Potion, 20)

export class GameState {
  money:number

  wares:Inventory
  prices:Inventory

  constructor () {
    this.money = 500
    this.wares = startingWares
    this.prices = startingPrices
  }

  buyItem (item:ItemType, amount:number, totalPrice:number) {}

  sellItem (item:ItemType, amount:number, totalPrice:number) {}
}
