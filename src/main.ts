import { Alert, LogList } from './ui/windows'
import { $id, addToMain, makeWorldAscii } from './ui/ui'
import { World } from './world/world'
import { getTimeText } from './util/text-display'
import { EncounterData } from './data/encounter-data'

console.log('hi world')

let logs: LogList

let time = 0

let alert: Alert | undefined

let world: World

const handleEncounter = (data:EncounterData) => {
  alert = new Alert(0, 0, 'Do you want to sell a potion?', [
    { text: 'Sell', cb: () => {
      alert = undefined
      console.log('selling')
    } },
    { text: 'Deny', cb: () => {
      alert = undefined
      console.log('denied')
    } },
  ])
  addToMain(alert)
  alert.alignToCenter()
}

const update = () => {
  // HACK: if alert is visible, dont step the world
  if (alert === undefined) {
    world.step()
  }
}

const next = (now:number) => {
  if (now - time > 100) {
    // doUpdate();
    update();

    // for the overflow
    // TODO: calculate correctly
    time = now + 100 - (now - time)
  }

  $id('time-of-day').innerHTML = getTimeText(world.time)
  $id('day-num').innerHTML = `Day ${world.day + 1}`

  if (Math.random() < 0.01) {
    logs.addLog(`here is a random log: ${Math.random()}`)
    logs.render()
  }

  requestAnimationFrame(next)
}

const go = () => {
  makeWorldAscii()
  world = new World(handleEncounter)
  logs = new LogList(0, 0)
  addToMain(logs)
  // setting position here so the bounding client rect exists
  logs.setPosition(16384, 16384)

  requestAnimationFrame(next)
}

go()
