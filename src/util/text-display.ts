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
  if (type === EncounterResType.Sold) {
    return `You sold ${encounter.amount} ${encounter.item}${plural} to ${encounter.actor.name}`
  } else if (type === EncounterResType.DenySold) {
    return `You denied selling ${encounter.amount} ${encounter.item}${plural} to ${encounter.actor.name}`
  } else if (type === EncounterResType.DontHave) {
    return `You didnt have any ${encounter.item} for ${encounter.actor.name}`
  } else if (type === EncounterResType.TooExpensive) {
    return `Your ${encounter.item} prices are too expensive for ${encounter.actor.name}`
  } else if (type === EncounterResType.CantAfford) {
    return `${encounter.actor.name} cannot afford your ${encounter.item}s`
  }

  throw 'Undefined encounter'
}

export const encounterText = (data:EncounterData):string => {
  const plural = data.amount && data.amount > 1 ? 's' : ''
  return `Do you want to sell ${data.amount} ${data.item}${plural} to ${data.actor.name} for $${data.price}?`
}
