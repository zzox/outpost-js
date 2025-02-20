import type { Inventory } from '../state/GameState'
import { $make, MovableWindow } from './ui'

export class WaresMenu {
  render = (wares:Inventory, prices:Inventory) => {
    // go through list, rows of prees
  }
}

export class Alert extends MovableWindow {
  constructor (x:number, y:number, textString:string, options:{ text: string, cb: () => void }[] ) {
    super(x, y, 'Alert', false, 'Alert')

    this.element.classList.add('top')

    const text = $make('pre')
    text.innerText = textString
    this.content.appendChild(text)

    options.forEach(({ text, cb }) => {
      const button = $make('button')
      const pre = $make('pre')
      pre.innerText = text

      button.appendChild(pre)

      button.onclick = cb
      this.content.appendChild(button)
    });
  }
}

export class LogList extends MovableWindow {
  logs: string[]

  preEl: HTMLPreElement

  constructor (x:number, y:number) {
    super(x, y, 'Logs', true, 'logs')

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
