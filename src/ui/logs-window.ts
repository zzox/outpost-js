import { EncounterLog } from '../util/text-display'
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
    this.preEl.innerHTML = LogsWindow.logs.join('\n')
  }

  addLog = (log:EncounterLog) => {
    LogsWindow.logs.pop()
    LogsWindow.logs.unshift(`<span class="indent ${log.color}">* ${log.text}</span>`)
  }
}
