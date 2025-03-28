import { Inventory } from '../data/items'

export const clamp = (value:number, min:number, max:number):number => Math.max(Math.min(value, max), min)
export const intClamp = (value:number, min:number, max:number):number => Math.floor(Math.max(Math.min(value, max), min))

// WARN: uses ceil here instead of floor
export const randomInt = (num:number) => {
  return Math.ceil(Math.random() * num)
}

export const getRandom = <T>(items:T[]):T => items[Math.floor(Math.random() * items.length)]

type SeedFunction = () => number

export const seedShuffle = <T>(items:T[], seedFunc?:SeedFunction) => {
  if (!seedFunc) {
    seedFunc = Math.random
  }

  // from: https://stackoverflow.com/a/12646864
  for (let i = items.length - 1; i >= 0; i--) {
    const j = Math.floor(seedFunc() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
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
