import { TOPBAR_HEIGHT } from '../data/globals'
import { ItemType } from '../data/items'
import { clamp } from '../util/util'
import { $make, hideWindow, makeNumInput, makePreText } from './ui'

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
      const pre = $make('pre')
      pre.innerText = text

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

    this.preEl = $make('pre') as HTMLPreElement
    this.preEl.innerText = (new Array(20)).map(_ => '\n').join('')
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

export class WaresMenu extends MovableWindow {
  priceLines:Map<ItemType, HTMLSpanElement> = new Map

  onSetPrice:(t:ItemType, price?:number) => void

  constructor (x:number, y:number, onSetPrice:(t:ItemType, price?:number) => void) {
    super(x, y, 'Wares', true, 'wares')

    this.onSetPrice = onSetPrice
  }

  addItem = (item:ItemType, amount:number, price:number) => {
    const fullEl = $make('div')
    const nameEl = $make('pre')
    const amountEl = $make('pre')
    const div1 = makePreText('|')
    const div2 = makePreText('| $')
    const numInput = makeNumInput()

    fullEl.className = 'wares-row'
    nameEl.innerText = item.padEnd(20, ' ')
    numInput.value = price.toString()
    amountEl.id = 'amount'

    // setAmount
    // PERF:
    amountEl.innerText = `x${amount} `.padStart(7, ' ')

    fullEl.appendChild(nameEl)
    fullEl.appendChild(div1)
    fullEl.appendChild(amountEl)
    fullEl.appendChild(div2)
    fullEl.appendChild(numInput)

    numInput.onblur = () => {
      const num = parseInt(numInput.value)
      if (isNaN(num)) {
        numInput.value = '0'
      } else {
        this.onSetPrice(item, num)
      }
    }

    if (this.priceLines.size) {
      this.content.appendChild($make('hr'))
    }

    this.priceLines.set(item, fullEl)
    numInput.tabIndex = this.priceLines.size
    this.content.appendChild(fullEl)
  }

  updateItem = (item:ItemType, amount:number) => {
    (this.priceLines.get(item)?.querySelector('#amount') as HTMLPreElement).innerText = `x${amount} `.padStart(7, ' ')
  }
}
