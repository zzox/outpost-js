enum ItemType {
  Rope = 'rope',
  Wood = 'wood',
}

export type Inventory = Map<ItemType, number>;

type GameState = {
  money: number
  wares: Inventory
}

const startingWares = new Map()
startingWares.set(ItemType.Rope, 100)
startingWares.set(ItemType.Wood, 50)

export const state = {
  money: 500,
  wares: startingWares
}
