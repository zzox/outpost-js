import type { Inventory } from '../state/GameState'
import { $make, MoveBox } from './ui'

export class WaresMenu {
  render = (wares:Inventory, prices:Inventory) => {
    // go through list, rows of prees
  }
}

export class LogList extends MoveBox {
  logs: string[]

  preEl: HTMLPreElement

  constructor (x:number, y:number) {
    super(x, y, 'Logs', 'logs')

    this.preEl = $make('pre') as HTMLPreElement
    this.preEl.innerText = (new Array(20)).map(_ => '\n').join('')
    this.content.appendChild(this.preEl)
    // this.content.classList.add('min-box')

    this.logs = (new Array(100)).map(_ => '')
  }

  render = () => {
    this.preEl.innerText = this.logs.join('\n')
  }

  addLog = (log:string) => {
    this.logs.pop()
    this.logs.unshift(log)
  }
}

