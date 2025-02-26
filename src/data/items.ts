export enum ItemType {
  Rope = 'Rope',
  Wood = 'Wood',
  SmallPotion = 'Small Potion',
  LargePotion = 'Large Potion',
}

export enum TargetType {
  Wood = 'Wood',
  Rope = 'Rope',
  Weapon = 'Weapon',
  Health = 'Health'
}

// y = mx + b, <= limit
type Scale = {
  m:number
  b:number
  l:number
}

type ItemData = {
  price:number
  scale:Scale
}

const scale = (m:number, b:number, l:number):Scale => ({ m, b, l })

// TODO: parse from config file
export const itemData:Map<ItemType, ItemData> = new Map()
itemData.set(ItemType.Wood, { price: 2, scale: scale(10, 100, 1000) })
itemData.set(ItemType.Rope, { price: 5, scale: scale(5, 50, 100) })
itemData.set(ItemType.SmallPotion, { price: 10, scale: scale(1, 0, 10) })
itemData.set(ItemType.LargePotion, { price: 25, scale: scale(0.5, 2, 5) })
// itemData.set(ItemType.RiseLeaf, { price: 200, scale: scale(1, -10, 2) })

export const targetItems:Map<TargetType, ItemType[]> = new Map()
targetItems.set(TargetType.Health, [ItemType.SmallPotion, ItemType.LargePotion])
// targetItems.set(TargetType.Weapon, [ElvenBlade, LargePotion])

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

export const getScale = (item:ItemType, level:number) => {
  const data = itemData.get(item)
  if (!data) {
    throw 'Cant get scale for this'
  }
  return Math.min(data.scale.m * level + data.scale.b, data.scale.l)
}
