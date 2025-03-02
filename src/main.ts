import { Alert, LogList, WaresMenu } from './ui/windows'
import { $id, addToMain, hideWindow, makeWorldAscii, setMoney, showWindow } from './ui/ui'
import { World } from './world/world'
import { encounterLog, encounterOption, encounterText, getTimeText } from './util/text-display'
import { EncounterData, EncounterResData, EncounterResType } from './data/encounter-data'
import { GameState } from './world/game-state'
import { getNumFromInventory, ItemType } from './data/items'
import { clamp } from './util/util'

let world:World
let state:GameState
let encounterActive:boolean = false

let logs:LogList
let alert:Alert
let waresMenu:WaresMenu

let time = 0

const handleEncounter = (data:EncounterData) => {
  alert.activate(encounterText(data), [
    { text: encounterOption(data, 0), cb: () => {
      encounterActive = false
      world.doEncounter(true)
    } },
    { text: encounterOption(data, 1), cb: () => {
      encounterActive = false
      world.doEncounter(false)
    } },
  ])
  showWindow(alert)
  alert.alignToCenter()
  encounterActive = true
}

const handleEncounterRes = (data:EncounterResData) => {
  // TODO: move into world.ts?
  if (data.type === EncounterResType.Sold) {
    state.money += data.encounter.price
    const invItem = getNumFromInventory(state.wares, data.encounter.item)
    state.wares.set(data.encounter.item, invItem - data.encounter.amount)

    // keep here if move
    waresMenu.updateItem(data.encounter.item, state.wares.get(data.encounter.item) as number)
    setMoney(state.money)
  } else if (data.type === EncounterResType.Bought) {
    state.money -= data.encounter.price
    const invItem = getNumFromInventory(state.wares, data.encounter.item)
    state.wares.set(data.encounter.item, invItem + data.encounter.amount)

    // keep here if move
    waresMenu.updateItem(data.encounter.item, state.wares.get(data.encounter.item) as number)
    setMoney(state.money)
  }

  logs.addLog(encounterLog(data))
  logs.render()
}

const onSetPrice = (type:ItemType, price?:number) => {
  state.prices.set(type, price ?? 0)
}

const update = () => {
  if (!encounterActive) {
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
    time = now + clamp(100 - (now - time), -100, 0)
  }

  $id('time-of-day').innerHTML = getTimeText(world.time)
  $id('day-num').innerHTML = `Day ${world.day + 1}`

  requestAnimationFrame(next)
}

const createMainListeners = () => {}

const go = () => {
  state = new GameState()
  world = new World(state, handleEncounter, handleEncounterRes)

  logs = new LogList(0, 0)
  waresMenu = new WaresMenu(0, 200, onSetPrice)
  alert = new Alert()

  makeWorldAscii()

  addToMain(logs)
  addToMain(waresMenu)
  addToMain(alert)

  // hideWindow(waresMenu)
  hideWindow(alert)

  for (let items of state.wares.entries()) {
    waresMenu.addItem(items[0], items[1], state.prices.get(items[0]) as number)
  }
  setMoney(state.money)

  // setting position here so the bounding client rect exists once added
  logs.setPosition(16384, 16384)

  requestAnimationFrame(next)

  console.log('hi world')
}

go()
