import { Alert, LogList } from './ui/windows'
import { $id, addToMain, hideWindow, setMoneyUi, showWindow } from './ui/ui'
import { World } from './world/world'
import { encounterLog, encounterOption, encounterText, getTimeText } from './util/text-display'
import { EncounterData, EncounterResData, EncounterResType } from './data/encounter-data'
import { GameState } from './world/game-state'
import { ItemType } from './data/items'
import { clamp, randomInt } from './util/util'
import { FinanceWindow } from './ui/finance-window'
import { TOPBAR_HEIGHT } from './data/globals'
import { WaresMenu } from './ui/wares-window'
import { logger, LogLevel, setLogLevel } from './util/logger'
import { AsciiRenderer } from './ui/ascii'
import { fileInCode, fileInColors } from './data/editor-data'
import { symbols } from './editor/symbols'
import { generateMainActors } from './data/actor-data'

let world:World
let state:GameState
let encounterActive:boolean = false
let worldAscii:AsciiRenderer
let logs:LogList
let alert:Alert
let waresMenu:WaresMenu
let financeWindow:FinanceWindow

// let windows:MovableWindow[] = []

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
    state.sellItem(data.encounter.item,  data.encounter.amount, data.encounter.price)
    waresMenu.updateItem(data.encounter.item, state.wares.get(data.encounter.item) as number)
    setMoneyUi(state.money)
  } else if (data.type === EncounterResType.Bought) {
    state.buyItem(data.encounter.item, data.encounter.amount, data.encounter.price)
    waresMenu.updateItem(data.encounter.item, state.wares.get(data.encounter.item) as number)
    setMoneyUi(state.money)
  }

  financeWindow.updateFromState(state.history)
  logs.addLog(encounterLog(data))
  logs.render()
}

const onSetPrice = (type:ItemType, price?:number) => {
  state.prices.set(type, price ?? 0)
  logger.log('prices set', state.prices)
}

const update = () => {
  if (!encounterActive) {
    world.step()

    if (Math.random() < 0.1) {
      worldAscii.symbols[randomInt(29)][randomInt(59)] = 1
    }
  }
}

const draw = () => {
  // logs.render()
  $id('time-of-day').textContent = getTimeText(world.time)
  $id('day-num').textContent = `Day ${world.day + 1}`
  worldAscii.render()
}

const next = (now:number) => {
  if (now - time > 100) {
    update()
    draw()

    // for the overflow
    // TODO: calculate correctly
    time = now + clamp(100 - (now - time), -100, 0)
  }

  requestAnimationFrame(next)
}

const createMainListeners = () => {
  $id('wares-button').onclick = () => showWindow(waresMenu)
  $id('money-button').onclick = () => showWindow(financeWindow)
}

const handleGrabWindow = () => {}

const go = () => {
  console.log(symbols)
  generateMainActors()
  state = new GameState()
  world = new World(state, handleEncounter, handleEncounterRes)

  logs = new LogList(0, 0)
  financeWindow = new FinanceWindow(0, TOPBAR_HEIGHT)
  waresMenu = new WaresMenu(0, 200, onSetPrice)
  alert = new Alert()

  worldAscii = new AsciiRenderer($id('bg') as HTMLPreElement, 30, 60, fileInCode, fileInColors)

  addToMain(logs)
  addToMain(waresMenu)
  addToMain(financeWindow)
  addToMain(alert)

  hideWindow(financeWindow)
  hideWindow(alert)

  // windows = [
  //   logs,
  //   waresMenu,
  //   financeWindow
  // ]

  for (let items of state.wares.entries()) {
    waresMenu.addItem(items[0], items[1], state.prices.get(items[0]) as number)
  }
  setMoneyUi(state.money)

  // setting position here so the bounding client rect exists once added
  logs.setPosition(16384, 16384)
  financeWindow.setPosition(16384, 36)

  createMainListeners()

  requestAnimationFrame(next)

  setLogLevel(LogLevel.Debug)
  console.log('hi world')
}

go()
