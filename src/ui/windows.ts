import { TOPBAR_HEIGHT } from '../data/globals'
import { clamp } from '../util/util'
import { $make, hideWindow, makePreText } from './ui'

export class MovableWindow {
  element:HTMLDivElement
  content:HTMLDivElement

  dragX:number = 0
  dragY:number = 0

  constructor (x:number, y:number, titleText:string, hasXOut:boolean, id:string) {
    this.element = $make('div') as HTMLDivElement
    this.element.id = id
    const top = $make('div')
    this.content = $make('div') as HTMLDivElement

    this.element.className = 'box'
    top.className = 'box-title'
    this.content.className = 'box-content'

    this.element.appendChild(top)
    this.element.appendChild(this.content)

    // left element used to balance out the right
    top.appendChild(makePreText(' '))

    top.appendChild(makePreText(titleText))
    top.onmousedown = this.mouseDown

    if (hasXOut) {
      const xOut = $make('button')
      xOut.innerHTML = '<pre>X</pre>'
      top.appendChild(xOut)
      // xOut.onmousedown = (ev) => ev.stopPropagation()
      xOut.onclick = this.close.bind(this)
    } else {
      top.appendChild(makePreText(' '))
    }

    this.setPosition(x, y)
  }

  mouseDown = (ev:MouseEvent) => {
    this.dragX = ev.clientX - this.element.offsetLeft
    this.dragY = ev.clientY - this.element.offsetTop
    document.onmousemove = this.mouseMove
    document.onmouseup = this.mouseUp
  }

  mouseMove = (ev:MouseEvent) => {
    this.setPosition(ev.clientX - this.dragX, ev.clientY - this.dragY)
  }

  mouseUp = () => {
    document.onmousemove = null
    document.onmouseup = null
  }

  setPosition = (x:number, y:number) => {
    // TODO: disallow above topbar, set topbar element as global
    const xx = clamp(x, 0, window.innerWidth - this.element.getBoundingClientRect().width)
    const yy = clamp(y, TOPBAR_HEIGHT, window.innerHeight - this.element.getBoundingClientRect().height)

    this.element.style.left = `${xx}px`
    this.element.style.top = `${yy}px`
  }

  alignToCenter = () => {
    this.setPosition(
      (window.innerWidth - this.element.getBoundingClientRect().width) / 2,
      (window.innerHeight - this.element.getBoundingClientRect().height) / 2
    )
  }

  close () {
    // this.element.remove()
    hideWindow(this)
  }
}

export class Alert extends MovableWindow {
  dialog:HTMLPreElement
  buttonRow:HTMLDivElement

  constructor () {
    super(0, 0, 'Alert', false, 'alert')

    this.dialog = $make('pre') as HTMLPreElement
    this.dialog.className = 'alert-text'

    this.buttonRow = $make('div') as HTMLDivElement
    this.buttonRow.className = 'button-row'

    this.content.appendChild(this.dialog)
    this.content.appendChild(this.buttonRow)
  }

  activate (textString:string, options:{ text: string, cb: () => void }[] ) {
    this.dialog.innerText = textString

    Array.from(this.buttonRow.children).forEach(el => el.remove())

    options.forEach(({ text, cb }) => {
      const button = $make('button')
      const pre = makePreText(text)

      button.appendChild(pre)

      button.onclick = () => {
        this.close()
        cb()
      }

      this.buttonRow.appendChild(button)
    })
  }
}

export class LogList extends MovableWindow {
  static logs: string[]

  preEl: HTMLPreElement

  constructor (x:number, y:number) {
    super(x, y, 'Logs', true, 'logs')

    this.preEl = makePreText((new Array(20)).map(_ => '\n').join(''))
    this.content.appendChild(this.preEl)
    // this.content.classList.add('min-box')

    LogList.logs = (new Array(100)).map(_ => '')
  }

  render = () => {
    this.preEl.innerText = LogList.logs.join('\n')
  }

  addLog = (log:string) => {
    LogList.logs.pop()
    LogList.logs.unshift(log)
  }
}
