import { EncounterData, EncounterResData, EncounterResType, EncounterType } from '../data/encounter-data'
import { Actor } from '../world/actor'

export const getTimeText = (time:number):string => {
  if (time < 120) {
    return 'Morning'
  } else if (time < 240) {
    return 'Afternoon'
  } else {
    return 'Evening'
  }
}

const capitalize = (word:string) => word[0].toUpperCase() + word.slice(1)

const getDisplayName = (actor:Actor, capital:boolean) => actor.name ?? `${capital ? 'A' : 'a'} ${actor.type}`

export const encounterLog = ({ encounter, type }:EncounterResData):string => {
  const plural = encounter.amount && encounter.amount > 1 ? 's' : ''
  if (encounter.type === EncounterType.Buy) {
    if (type === EncounterResType.Sold) {
      return `You sold ${encounter.amount} ${encounter.item}${plural} to ${getDisplayName(encounter.actor, false)}`
    } else if (type === EncounterResType.DenySold) {
      return `You denied selling ${encounter.amount} ${encounter.item}${plural} to ${getDisplayName(encounter.actor, false)}`
    } else if (type === EncounterResType.DontHave) {
      return `You didnt have any ${encounter.item}s for ${getDisplayName(encounter.actor, false)}`
    } else if (type === EncounterResType.TooExpensive) {
      return `Your ${encounter.item} prices are too expensive for ${getDisplayName(encounter.actor, false)}`
    } else if (type === EncounterResType.CantAfford) {
      return `${getDisplayName(encounter.actor, true)} cannot afford your ${encounter.item}s`
    }
  } else if (encounter.type === EncounterType.Sell) {
    if (type === EncounterResType.Bought) {
      return `You bought ${encounter.amount} ${encounter.item}${plural} from ${getDisplayName(encounter.actor, false)}`
    } else if (type === EncounterResType.NotBought) {
      return `You did not buy ${encounter.item}${plural} from ${getDisplayName(encounter.actor, false)}`
    } else if (type === EncounterResType.CantAfford) {
      return `You cannot afford ${getDisplayName(encounter.actor, false)}\'s ${encounter.item}s`
    }
  }

  throw 'Undefined encounter'
}

export const encounterOption = ({ type }:EncounterData, option:number):string => {
  if (type === EncounterType.Buy) {
    return ['Sell', 'Deny'][option]
  } else if (type === EncounterType.Sell) {
    return ['Buy', 'Dont'][option]
  }

  throw 'Undefined encounter option'
}

export const encounterText = (data:EncounterData):string => {
  const plural = data.amount && data.amount > 1 ? 's' : ''
  if (data.type === EncounterType.Buy) {
    return `Sell ${data.amount} ${data.item}${plural} to ${getDisplayName(data.actor, false)} for $${data.price}?`
  } else if (data.type === EncounterType.Sell) {
    return `Buy ${data.amount} ${data.item}${plural} from ${getDisplayName(data.actor, false)} for $${data.price}?`
  }

  throw 'Undefined enctounter text'
}

export const encounterSubtext = (data:EncounterData):string => {
  if (data.type === EncounterType.Sell) {
    return `Repeat this order in the future`
  }

  throw 'Undefined encounter text'
}
