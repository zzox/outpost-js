import { EncounterData, EncounterResData, EncounterResType, EncounterType } from '../data/encounter-data'

export const getTimeText = (time:number):string => {
  if (time < 120) {
    return 'Morning';
  } else if (time < 240) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
}

export const encounterLog = ({ encounter, type }:EncounterResData):string => {
  const plural = encounter.amount && encounter.amount > 1 ? 's' : ''
  if (encounter.type === EncounterType.Buy) {
    if (type === EncounterResType.Sold) {
      return `You sold ${encounter.amount} ${encounter.item}${plural} to ${encounter.actor.name}`
    } else if (type === EncounterResType.DenySold) {
      return `You denied selling ${encounter.amount} ${encounter.item}${plural} to ${encounter.actor.name}`
    } else if (type === EncounterResType.DontHave) {
      return `You didnt have any ${encounter.item}s for ${encounter.actor.name}`
    } else if (type === EncounterResType.TooExpensive) {
      return `Your ${encounter.item} prices are too expensive for ${encounter.actor.name}`
    } else if (type === EncounterResType.CantAfford) {
      return `${encounter.actor.name} cannot afford your ${encounter.item}s`
    }
  } else if (encounter.type === EncounterType.Sell) {
    if (type === EncounterResType.Bought) {
      return `You bought ${encounter.amount} ${encounter.item}${plural} from ${encounter.actor.name}`
    } else if (type === EncounterResType.NotBought) {
      return `You did not buy ${encounter.item}${plural} from ${encounter.actor.name}`
    } else if (type === EncounterResType.CantAfford) {
      return `You cannot afford ${encounter.actor.name}\'s ${encounter.item}s`
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
    return `Do you want to sell ${data.amount} ${data.item}${plural} to ${data.actor.name} for $${data.price}?`
  } else if (data.type === EncounterType.Sell) {
    return `Do you want to buy ${data.amount} ${data.item}${plural} from ${data.actor.name} for $${data.price}?`
  }

  throw 'Undefined enctounter text'
}
