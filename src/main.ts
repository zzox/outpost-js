import { Alert, LogList, WaresMenu } from './ui/windows'
import { $id, addToMain, hideWindow, makeWorldAscii } from './ui/ui'
import { World } from './world/world'
import { encounterLog, encounterText, getTimeText } from './util/text-display'
import { EncounterData, EncounterResData } from './data/encounter-data'
import { GameState } from './world/game-state'
import { ItemType } from './data/items'

let world: World
let state: GameState

let logs: LogList
let alert: Alert | undefined
let waresMenu:WaresMenu

let time = 0

const handleEncounter = (data:EncounterData) => {
  alert = new Alert(0, 0, encounterText(data), [
    { text: 'Sell', cb: () => {
      alert = undefined
      world.doEncounter(true)
    } },
    { text: 'Deny', cb: () => {
      alert = undefined
      world.doEncounter(false)
    } },
  ])
  addToMain(alert)
  alert.alignToCenter()
}

const handleEncounterRes = (data:EncounterResData) => {
  logs.addLog(encounterLog(data))
  logs.render()
}

const onSetPrice = (type:ItemType, price?:number) => {}

const update = () => {
  // HACK: if alert is visible, dont step the world
  if (alert === undefined) {
    world.step()
  }
}

const draw = () => {
  // logs.render()
}

const next = (now:number) => {
  if (now - time > 100) {
    // doUpdate();
    update()
    draw()

    // for the overflow
    // TODO: calculate correctly
    time = now + 100 - (now - time)
  }

  $id('time-of-day').innerHTML = getTimeText(world.time)
  $id('day-num').innerHTML = `Day ${world.day + 1}`

  requestAnimationFrame(next)
}

const createMainListeners = () => {

}

const go = () => {
  state = new GameState()
  world = new World(state, handleEncounter, handleEncounterRes)

  logs = new LogList(0, 0)
  waresMenu = new WaresMenu(0, 200, onSetPrice)

  makeWorldAscii()

  addToMain(logs)
  addToMain(waresMenu)

  hideWindow(waresMenu)

  // setting position here so the bounding client rect exists once added
  logs.setPosition(16384, 16384)

  requestAnimationFrame(next)

  console.log('hi world')
}

go()
