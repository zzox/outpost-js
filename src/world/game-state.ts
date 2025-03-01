import { ItemType, Inventory } from '../data/items'

const startingWares = new Map<ItemType, number>()
startingWares.set(ItemType.Rope, 200)
startingWares.set(ItemType.Wood, 100)
startingWares.set(ItemType.Potion, 50)
startingWares.set(ItemType.RiseLeaf, 2)

const startingPrices = new Map<ItemType, number>()
startingPrices.set(ItemType.Rope, 5)
startingPrices.set(ItemType.Wood, 2)
startingPrices.set(ItemType.Potion, 20)
startingPrices.set(ItemType.RiseLeaf, 0)

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
