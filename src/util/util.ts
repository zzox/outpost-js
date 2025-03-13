import { Inventory } from '../data/items'

export const clamp = (value:number, min:number, max:number):number => Math.max(Math.min(value, max), min)
export const intClamp = (value:number, min:number, max:number):number => Math.floor(Math.max(Math.min(value, max), min))

export const randomInt = (num:number) => {
  return Math.ceil(Math.random() * num)
}

type RandomWeight<T> = {
  weight:number
  item:T
}

export const getWeightedRandom = <T>(items:RandomWeight<T>[]):T => {
  const total = items.reduce((tot, item) => tot + item.weight, 0)

  let value = randomInt(total)
  while (true) {
    const item = items.shift()
    if (item === undefined) {
      throw 'Shouldnt be without items'
    }

    value -= item.weight
    if (value <= 0) {
      return item.item
    }
  }
}

export const totalInventory = (inv:Inventory):number => {
  let total = 0
  for (let value of inv.values()) {
    total += value
  }
  return total
}
