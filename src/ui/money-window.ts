import { ItemType } from "../data/items"
import { GameState } from "../world/game-state"
import { $make, makeNumInput, makePreText } from "./ui"
import { MovableWindow } from "./windows"

export class WaresMenu extends MovableWindow {
  onSetPrice:(t:ItemType, price?:number) => void

  constructor (x:number, y:number, onSetPrice:(t:ItemType, price?:number) => void) {
    super(x, y, 'Wares', true, 'wares')

    this.onSetPrice = onSetPrice
  }

  updateFromState = (history:History) => {

  }
}
