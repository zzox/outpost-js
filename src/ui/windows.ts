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
