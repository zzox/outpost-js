import { generateName } from '../data/actor-data'
import { Inventory, TargetType } from '../data/items'

export class Actor {
  id:number
  money:number
  leeway:number // 0-100 percentage OVER they are willing to pay
  cheapness:number // 0-100 how much they desire things discounted
  zealous:number // 0-100 how much they try to over-sell

  level:number
  name:String

  inventory:Inventory

  target!: TargetType

  constructor (id:number, level:number, money:number, leeway:number, cheapness:number, zealous:number) {
    this.id = id;
    this.level = level;

    this.money = money;
    this.leeway = leeway;
    this.cheapness = cheapness;
    this.zealous = zealous;

    this.inventory = new Map()

    // this.name = generateName(id)
    this.name = generateName()
  }
}
