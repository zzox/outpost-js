import { ActorType, getName, GenerationData, getActorType } from '../data/actor-data'
import { BattleData } from '../data/battle'
import { EncounterType } from '../data/encounter-data'
import { Inventory, ItemType } from '../data/items'
import { randomInt } from '../util/util'

// TODO: better name and move into battledata
type SkillItems = {
  health:number
  strength:number
  defense:number
  speed:number
  magic:number
}

const generateSkillFromData = (skill:SkillItems, level:number):SkillItems => {
  const vals = {
    health: 0,
    strength: 0,
    defense: 0,
    speed: 0,
    magic: 0
  }

  while (level--) {
    vals.health += skill.health
    vals.strength += skill.strength
    vals.defense += skill.defense
    vals.speed += skill.speed
    vals.magic += skill.magic
  }

  return vals
}

export class Actor {
  id:number
  money:number
  leeway:number // 0-100 percentage OVER they are willing to pay
  cheapness:number // 0-100 how much they desire things discounted
  zealous:number // 0-100 how much they try to over-sell

  level:number
  name?:string
  type:ActorType

  experience:number
  health:number
  maxHealth:number

  baseSkill:SkillItems
  skill:SkillItems

  inventory:Inventory

  target!:ItemType
  targetType!:EncounterType
  genData?:GenerationData

  battleData?:BattleData

  constructor (id:number, level:number, money:number, leeway:number, cheapness:number, zealous:number) {
    this.id = id
    this.level = level

    this.money = money
    this.leeway = leeway
    this.cheapness = cheapness
    this.zealous = zealous

    this.experience = 0
    this.baseSkill = {
      health: 5 + randomInt(10),
      strength: 4 + randomInt(8),
      defense: 4 + randomInt(8),
      magic: 4 + randomInt(8),
      speed: 4 + randomInt(8)
    }
    this.skill = generateSkillFromData(this.baseSkill, level)

    this.maxHealth = this.baseSkill.health
    this.health = this.baseSkill.health

    this.inventory = new Map()

    this.name = getName(id)
    this.type = getActorType(id)
  }

  get isDead ():boolean {
    return this.health <= 0
  }
}
