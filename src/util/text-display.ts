import { EncounterData, EncounterType } from '../data/encounter-data'

export const getTimeText = (time:number):string => {
  if (time < 120) {
    return 'Morning';
  } else if (time < 240) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
}

export const encounterLog = (data:EncounterData, result:boolean):string => {
  const plural = data.amount && data.amount > 1 ? 's' : ''
  if (data.type === EncounterType.Buy) {
    return `You ${result ? 'sold' : 'did not sell'} ${data.amount} ${data.item}${plural} to ${data.actor.name}`
  } else if (data.type === EncounterType.Sell) {
    return `You ${result ? 'bought' : 'did not buy'} ${data.amount} ${data.item}${plural} from ${data.actor.name}`
  }

  throw 'Undefined encounter'
}
