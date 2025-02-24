export enum ItemType {
  Rope = 'Rope',
  Wood = 'Wood',
  SmallPotion = 'Small Potion',
  LargePotion = 'Large Potion',
}

export type Inventory = Map<ItemType, number>

export const removeFromInventory = (inv:Inventory, item:ItemType, amount:number) => {
  if (inv.get(item) || getNumFromInventory(inv, item) < amount) throw 'Not enough in inventory'
  inv.set(item, getNumFromInventory(inv, item) - amount)
}

export const addToInventory = (inv:Inventory, item:ItemType, amount:number) => {
  if (inv.get(item) == null) {
    inv.set(item, 0)
  }

  inv.set(item, getNumFromInventory(inv, item) + amount)
}

export const getNumFromInventory = (inv:Inventory, item:ItemType):number => {
  const num = inv.get(item)
  if (num == null) return 0
  return num
}
