import { LogsWindow } from './ui/logs-window'
import { $id, addToMain, hideWindow, removeFromMain, setMoneyUi, showWindow } from './ui/ui'
import { World } from './world/world'
import { encounterLog, encounterOption, encounterSubtext, encounterText, getTimeText } from './util/text-display'
import { EncounterData, EncounterResData, EncounterResType, EncounterType } from './data/encounter-data'
import { GameState } from './world/game-state'
import { ItemType } from './data/items'
import { clamp, randomInt } from './util/util'
import { FinanceWindow } from './ui/finance-window'
import { TOPBAR_HEIGHT } from './data/globals'
import { WaresMenu } from './ui/wares-window'
import { logger, LogLevel, setLogLevel } from './util/logger'
import { AsciiRenderer, BgRender } from './ui/ascii'
import { fileInCode, fileInColors } from './data/editor-data'
import { symbols } from './editor/symbols'
import { Alert } from './ui/alert-window'
import { OrdersMenu } from './ui/orders-window'
import { MovableWindow } from './ui/windows'
import { Actor } from './world/actor'
import { ActorWindow } from './ui/actor-window'

let world:World
let state:GameState
let encounterActive:boolean = false
let worldAscii:AsciiRenderer
let logsWindow:LogsWindow
let alert:Alert
let waresMenu:WaresMenu
let ordersMenu:OrdersMenu
let financeWindow:FinanceWindow

let windows:MovableWindow[] = []

let fastForward = false

let time = 0

const handleEncounter = (data:EncounterData) => {
  alert.activate(
    encounterText(data),
    [
      { text: encounterOption(data, 0), cb: (addition:boolean) => {
        encounterActive = false
        world.doEncounter(true, addition)
      }, },
      { text: encounterOption(data, 1), cb: () => {
        encounterActive = false
        world.doEncounter(false, false)
      } },
    ],
    data.type === EncounterType.Distribute ? { text: encounterSubtext(data) } : undefined
  )
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
    if (data.recurring) {
      const actor = world.actors[data.encounter.actor.id]
      ordersMenu.addOrder(
        actor.id,
        actor.genData?.item as ItemType,
        actor.genData?.amount as number,
        actor.genData?.price as number
      )
      state.orders.set(data.encounter.actor.id, true)
    }
  }

  financeWindow.updateFromState(state.history)
  logsWindow.addLog(encounterLog(data))
  logsWindow.render()
}

const onSetPrice = (type:ItemType, price?:number) => {
  state.prices.set(type, price ?? 0)
  logger.log('prices set', state.prices)
}

const onRemoveOrder = (id:number) => {
  state.orders.delete(id)
}

const onToggleOrder = (id:number, on:boolean) => {
  if (on) {
    state.orders.set(id, true)
  } else {
    state.orders.set(id, false)
  }
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
    let updates = 1
    if (fastForward) updates += 7
    for (let i = 0; i < updates; i++) {
      update()
    }
    draw()

    // for the overflow
    // TODO: calculate correctly
    time = now + clamp(100 - (now - time), -100, 0)
  }

  requestAnimationFrame(next)
}

const handleGrabWindow = () => {}

// WARN: this relies on their being only one actor with each name
const handleOpenActorWindow = (actor:Actor) => {
  if (!document.querySelector(`div#${actor.name!.toLowerCase()}`)) {
    const aw = new ActorWindow(0, 0, actor, () => {
      handleCloseActorWindow(actor)
    })
    addToMain(aw)
    windows.push(aw)
  }
}

const handleCloseActorWindow = (actor:Actor) => {
  // remove from windows array
  // remove from dom
  const w = document.querySelector(`div#${actor.name!.toLowerCase()}`)
  w?.remove()
  windows = windows.filter((win) => win.element !== w)
}

const createMainListeners = () => {
  window.onresize = () => {
    windows.forEach((w) => {
      w.resetPosition()
    })
  }
  $id('wares-button').onclick = () => showWindow(waresMenu)
  $id('orders-button').onclick = () => showWindow(ordersMenu)
  $id('money-button').onclick = () => showWindow(financeWindow)
  $id('logs-button').onclick = () => showWindow(logsWindow)
  $id('you-button').onclick = () => {
    handleOpenActorWindow(world.you)
  }
}

const go = () => {
  console.log(symbols)
  state = new GameState()
  world = new World(state, handleEncounter, handleEncounterRes)

  logsWindow = new LogsWindow(0, 0)
  waresMenu = new WaresMenu(0, 200, onSetPrice)
  ordersMenu = new OrdersMenu(400, 200, onRemoveOrder, onToggleOrder)
  financeWindow = new FinanceWindow(0, TOPBAR_HEIGHT)
  alert = new Alert()

  // worldAscii = new AsciiRenderer($id('bg') as HTMLPreElement, 30, 60, fileInCode, fileInColors)
  worldAscii = new BgRender($id('bg') as HTMLPreElement, 30, 60, fileInCode, fileInColors, world.tiles)

  addToMain(logsWindow)
  addToMain(waresMenu)
  addToMain(ordersMenu)
  addToMain(financeWindow)
  addToMain(alert)

  hideWindow(ordersMenu)
  hideWindow(financeWindow)
  hideWindow(alert)

  windows.push(logsWindow)
  windows.push(waresMenu)
  windows.push(ordersMenu)
  windows.push(financeWindow)
  windows.push(alert)

  for (let items of state.wares.entries()) {
    waresMenu.addItem(items[0], items[1], state.prices.get(items[0]) as number)
  }
  setMoneyUi(state.money)

  // setting position here so the bounding client rect exists once added
  logsWindow.setPosition(16384, 16384)
  financeWindow.setPosition(16384, 36)

  createMainListeners()
  document.onkeydown = (event:KeyboardEvent) => {
    if (event.key === 'f') {
      fastForward = true
    }
  }
  document.onkeyup = (event:KeyboardEvent) => {
    if (event.key === 'f') {
      fastForward = false
    }
  }

  requestAnimationFrame(next)

  setLogLevel(LogLevel.Log)
  console.log('hi world')
}

go()
