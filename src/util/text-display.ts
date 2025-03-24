import { EncounterData, EncounterResData, EncounterResType, EncounterType } from '../data/encounter-data'
import { Color } from '../ui/colors'
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

export type EncounterLog = {
  text: string,
  color: Color
}

export const encounterLog = ({ encounter, type }:EncounterResData):EncounterLog => {
  const plural = encounter.amount && encounter.amount > 1 ? 's' : ''
  if (encounter.type === EncounterType.Buy) {
    if (type === EncounterResType.Sold) {
      return { color: Color.Emerald, text: `You sold ${encounter.amount} ${encounter.item}${plural} to ${getDisplayName(encounter.actor, false)}` }
    } else if (type === EncounterResType.DenySold) {
      return { color: Color.Brown, text: `You denied selling ${encounter.amount} ${encounter.item}${plural} to ${getDisplayName(encounter.actor, false)}` }
    } else if (type === EncounterResType.DontHave) {
      return { color: Color.Grey, text: `You didnt have any ${encounter.item}s for ${getDisplayName(encounter.actor, false)}` }
    } else if (type === EncounterResType.TooExpensive) {
      return { color: Color.Grey, text: `"Your ${encounter.item} prices are too expensive" says a ${getDisplayName(encounter.actor, false)}` }
    } else if (type === EncounterResType.CantAfford) {
      return { color: Color.Grey, text: `${getDisplayName(encounter.actor, true)} cannot afford your ${encounter.item}s` }
    }
  } else if (encounter.type === EncounterType.Distribute) {
    if (type === EncounterResType.Bought) {
      return { color: Color.Green, text: `You bought ${encounter.amount} ${encounter.item}${plural} from ${getDisplayName(encounter.actor, false)}` }
    } else if (type === EncounterResType.NotBought) {
      return { color: Color.Brown, text: `You did not buy ${encounter.item}${plural} from ${getDisplayName(encounter.actor, false)}` }
    } else if (type === EncounterResType.CantAfford) {
      return { color: Color.WhiteSmoke, text: `You cannot afford ${getDisplayName(encounter.actor, false)}\'s ${encounter.item}s` }
    }
  }

  throw 'Undefined encounter'
}

export const encounterOption = ({ type }:EncounterData, option:number):string => {
  if (type === EncounterType.Buy) {
    return ['Sell', 'Deny'][option]
  } else if (type === EncounterType.Distribute) {
    return ['Buy', 'Dont'][option]
  }

  throw 'Undefined encounter option'
}

export const encounterText = (data:EncounterData):string => {
  const plural = data.amount && data.amount > 1 ? 's' : ''
  if (data.type === EncounterType.Buy) {
    return `Sell ${data.amount} ${data.item}${plural} to ${getDisplayName(data.actor, false)} for $${data.price}?`
  } else if (data.type === EncounterType.Distribute) {
    return `Buy ${data.amount} ${data.item}${plural} from ${getDisplayName(data.actor, false)} for $${data.price}?`
  }

  throw 'Undefined enctounter text'
}

export const encounterSubtext = (data:EncounterData):string => {
  if (data.type === EncounterType.Distribute) {
    return `Repeat this order in the future`
  }

  throw 'Undefined encounter text'
}
