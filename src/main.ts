import { Alert, LogList } from './ui/windows'
import { $id, addToMain, makeWorldAscii } from './ui/ui'
import { World } from './world/world'
import { encounterLog, encounterText, getTimeText } from './util/text-display'
import { EncounterData, EncounterResData } from './data/encounter-data'
import { GameState } from './world/game-state'

let world: World
let state: GameState

let logs: LogList
let alert: Alert | undefined

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
}

const update = () => {
  // HACK: if alert is visible, dont step the world
  if (alert === undefined) {
    world.step()
  }
}

const draw = () => {
  logs.render()
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

const go = () => {
  makeWorldAscii()
  state = new GameState()
  world = new World(state, handleEncounter, handleEncounterRes)
  logs = new LogList(0, 0)
  addToMain(logs)
  // setting position here so the bounding client rect exists
  logs.setPosition(16384, 16384)

  requestAnimationFrame(next)

  console.log('hi world')
}

go()
