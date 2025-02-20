import { fileInCode, fileInColors } from '../data/editor-data'
import { cssColors } from './colors'

// @ts-ignore
export const $q = (query:string): HTMLElement => document.querySelector(query)
// @ts-ignore
export const $id = (id:string): HTMLElement => document.getElementById(id)

export const $make = (type:string): HTMLElement => document.createElement(type)

export const addToMain = (win:MovableWindow) => {
  $q('main').appendChild(win.element)
}

const clamp = (value:number, min:number, max:number):number => Math.max(Math.min(value, max), min)

type GridItem = {
  r:string
}

type Grid = GridItem[][]

const boxSize = 40

const go = () => {
  const world:Grid = []

  for (let y = 0; y < boxSize; y++) {
    world[y] = []
    for (let x = 0; x < boxSize; x++) {
      world[y][x] = { r: Math.random() < 0.2 ? '\u25AA' : '\u2591' }
      // world[y][x] = { r: Math.random() < 0.2 ? '\u2588' : '\u2593' }
    }
  }

  // $id('main').innerText = world.map(row => row.map(item => item.r).join('') + '\n').join('')

  const renderItem = (r:string) => {
    if (r == '\u25AA') {
      return '<span class="brown">\u25AA</span>'
    }

    return r
  }

  // box.content.innerHTML = world.map(row => row.map(item => renderItem(item.r)).join('') + '\n').join('')
}

export const makeWorldAscii = () => {
  const renderItem = (r:string) => {
    if (r == '\u25AA') {
      return '<span class="brown">\u25AA</span>'
    }

    return r
  }

  let html = ''

  for (let y = 0; y < fileInCode.length; y++) {
    // TODO: close span on last color?
    for (let x = 0; x < fileInCode[0].length; x++) {
      html += `<span class='${cssColors[fileInColors[y][x]]}'>${fileInCode[y][x] === 0 ? '&nbsp;' : String.fromCharCode(fileInCode[y][x])}</span>`
    }
    html += '\n'
  }

  $id('main').innerHTML = html;
}

export class MovableWindow {
  element:HTMLDivElement
  content:HTMLDivElement

  dragX:number = 0
  dragY:number = 0

  constructor (x:number, y:number, titleText:string, hasXOut:boolean, id:string) {
    this.element = $make('div') as HTMLDivElement
    this.element.id = id
    const top = $make('div')
    const bottom = $make('div')
    const title = $make('pre')
    this.content = $make('pre') as HTMLDivElement

    this.element.className = 'box'
    top.className = 'box-title'
    bottom.className = 'box-content'
    title.innerText = titleText

    this.element.appendChild(top)
    this.element.appendChild(bottom)

    if (hasXOut) {
      // left element used to balance out the right
      const left = $make('pre')
      left.innerText = ' '
      top.appendChild(left)
    }

    top.appendChild(title)
    bottom.appendChild(this.content)

    top.onmousedown = this.mouseDown

    if (hasXOut) {
      const xOut = $make('button')
      xOut.innerHTML = '<pre>X</pre>'
      top.appendChild(xOut)
      xOut.onmousedown = (ev) => ev.stopPropagation()
      xOut.onclick = this.close
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

  close = () => {
    this.element.remove()
  }
}
