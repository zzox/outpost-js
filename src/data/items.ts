import { scale, Scale } from './globals'

export enum ItemType {
  Rope = 'Rope',
  Wood = 'Wood',
  Potion = 'Potion',
  // ElvenBlade = 'Elven Blade',
  RiseLeaf = 'Rise Leaf',
}

type ItemData = {
  price:number
  common:number
  scale:Scale
}

// TODO: parse from config file
export const itemData:Map<ItemType, ItemData> = new Map()
itemData.set(ItemType.Wood, { price: 2, common: 2, scale: scale(1, 10, 200) })
itemData.set(ItemType.Rope, { price: 5, common: 1, scale: scale(2, 50, 100) })
itemData.set(ItemType.Potion, { price: 20, common: 4, scale: scale(0.2, 0, 10) })
itemData.set(ItemType.RiseLeaf, { price: 200, common: 1, scale: scale(1, -10, 2) })

// export const targetItems:Map<TargetType, ItemType[]> = new Map()
// targetItems.set(TargetType.Health, [ItemType.SmallPotion, ItemType.LargePotion])
// targetItems.set(TargetType.Weapon, [ElvenBlade, LargePotion])

export type Inventory = Map<ItemType, number>

export const removeFromInventory = (inv:Inventory, item:ItemType, amount:number) => {
  if (!inv.get(item) || getNumFromInventory(inv, item) < amount) throw 'Not enough in inventory'
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

export const getScale = (item:ItemType, level:number) => {
  const data = itemData.get(item)
  if (!data) {
    throw 'Cant get scale for this'
  }
  return Math.round(Math.min(data.scale.m * level + data.scale.b, data.scale.l))
}

export const getActorMaxPrice = (price:number, leeway:number):number =>
  Math.ceil(price * (1 + leeway / 100))
