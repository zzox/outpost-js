enum ItemType {
  Rope = 'rope',
  Wood = 'wood',
}

export type Inventory = Map<ItemType, number>;

const startingWares = new Map()
startingWares.set(ItemType.Rope, 100)
startingWares.set(ItemType.Wood, 50)

class GameState {
  money:number

  wares:Inventory

  constructor () {
    this.money = 500
    this.wares = startingWares
  }

  buyItem (item:ItemType, amount:number, totalPrice:number) {

  }

  sellItem (item:ItemType, amount:number, totalPrice:number) {
    
  }
}

export const state = new GameState()
