import { ItemType, Inventory, getNumFromInventory, addToInventory, removeFromInventory } from '../data/items'

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
  orders:Set<number>

  history:History

  constructor () {
    this.money = 500
    this.wares = startingWares
    this.prices = startingPrices

    this.history = new History()
    this.orders = new Set()
  }

  buyItem (item:ItemType, amount:number, totalPrice:number) {
    this.money -= totalPrice
    addToInventory(this.wares, item, amount)

    // stats
    addToInventory(this.history.itemsBought, item, amount)
    this.history.expenses += totalPrice
  }

  sellItem (item:ItemType, amount:number, totalPrice:number) {
    this.money += totalPrice
    removeFromInventory(this.wares, item, amount)

    // stats
    addToInventory(this.history.itemsSold, item, amount)
    this.history.revenue += totalPrice
  }
}

export class History {
  itemsSold:Inventory = new Map()
  itemsBought:Inventory = new Map()
  revenue:number = 0
  expenses:number = 0
}
