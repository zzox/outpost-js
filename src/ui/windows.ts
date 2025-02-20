import { clamp } from '../util/util'
import type { Inventory } from '../world/game-state'
import { $make } from './ui'

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
    const title = $make('pre')

    this.element.className = 'box'
    top.className = 'box-title'
    this.content.className = 'box-content'
    title.innerText = titleText

    this.element.appendChild(top)
    this.element.appendChild(this.content)

    // left element used to balance out the right
    const left = $make('pre')
    left.innerText = ' '
    top.appendChild(left)

    top.appendChild(title)
    top.onmousedown = this.mouseDown

    if (hasXOut) {
      const xOut = $make('button')
      xOut.innerHTML = '<pre>X</pre>'
      top.appendChild(xOut)
      xOut.onmousedown = (ev) => ev.stopPropagation()
      xOut.onclick = this.close.bind(this)
    } else {
      const right = $make('pre')
      right.innerText = ' '
      top.appendChild(right)
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
    // TODO: clamp on screen
    this.setPosition(ev.clientX - this.dragX, ev.clientY - this.dragY)
  }

  mouseUp = () => {
    document.onmousemove = null
    document.onmouseup = null
  }

  setPosition = (x:number, y:number) => {
    // TODO: disallow above topbar, set topbar element as global
    const xx = clamp(x, 0, window.innerWidth - this.element.getBoundingClientRect().width)
    const yy = clamp(y, 0, window.innerHeight - this.element.getBoundingClientRect().height)

    this.element.style.left = `${xx}px`
    this.element.style.top = `${yy}px`
  }

  close () {
    this.element.remove()
  }
}

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
    text.className = 'alert-text'

    const buttonRow = $make('div')
    buttonRow.className = 'button-row'

    options.forEach(({ text, cb }) => {
      const button = $make('button')
      const pre = $make('pre')
      pre.innerText = text

      button.appendChild(pre)

      button.onclick = () => {
        this.close()
        cb()
      }

      buttonRow.appendChild(button)
    });

    this.content.appendChild(text)
    this.content.appendChild(buttonRow)
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
