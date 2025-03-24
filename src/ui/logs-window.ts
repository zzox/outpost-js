import { makePreText } from './ui'
import { MovableWindow } from './windows'

export class LogsWindow extends MovableWindow {
  static logs: string[]

  preEl: HTMLPreElement

  constructor (x:number, y:number) {
    super(x, y, 'Logs', true, 'logs')

    this.preEl = makePreText((new Array(100)).map(_ => '\n').join(''))
    this.content.appendChild(this.preEl)
    // this.content.classList.add('min-box')

    LogsWindow.logs = (new Array(100)).map(_ => '')
  }

  render = () => {
    this.preEl.innerText = LogsWindow.logs.join('\n')
  }

  addLog = (log:string) => {
    LogsWindow.logs.pop()
    LogsWindow.logs.unshift(log)
  }
}
