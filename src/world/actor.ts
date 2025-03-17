import { ActorType, getName, GenerationData, getActorType } from '../data/actor-data'
import { EncounterType } from '../data/encounter-data'
import { Inventory, ItemType } from '../data/items'

export class Actor {
  id:number
  money:number
  // leeway:number // 0-100 percentage OVER they are willing to pay
  cheapness:number // 0-100 how much they desire things discounted
  zealous:number // 0-100 how much they try to over-sell

  level:number
  name?:String
  type:ActorType

  inventory:Inventory

  target!:ItemType
  targetType!:EncounterType
  genData?:GenerationData

  constructor (id:number, level:number, money:number, /* leeway:number */ cheapness:number, zealous:number) {
    this.id = id
    this.level = level

    this.money = money
    // this.leeway = leeway
    this.cheapness = cheapness
    this.zealous = zealous

    this.inventory = new Map()

    this.name = getName(id)
    this.type = getActorType(id)
  }
}
