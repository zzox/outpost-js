import { Actor } from '../world/actor'
import { ItemType } from './items'

export enum EncounterType {
  Buy = 'Buy',
  Distribute = 'Distribute',
  // Service
  // Robbery
  // Stickup
}

export enum EncounterResType {
  Sold = 'Sold',
  DenySold = 'DenySold',
  Bought = 'Bought',
  NotBought = 'NotBought',
  DontHave = 'DontHave',
  TooExpensive = 'TooExpensive',
  CantAfford = 'CantAfford',
  // Service
  // Robbery
  // Stickup
}

export type EncounterData = {
  type:EncounterType
  actor:Actor
  item:ItemType
  amount:number
  price:number
}

export type EncounterResData = {
  type:EncounterResType
  encounter:EncounterData
  recurring?:boolean
  // actor:Actor
  // item:ItemType
}
