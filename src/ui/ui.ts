// @ts-ignore
export const $q = (query:string): HTMLElement => document.querySelector(query)
// @ts-ignore
export const $id = (id:string): HTMLElement => document.getElementById(id)

export const $make = (type:string): HTMLElement => document.createElement(type)

export const addToMain = (box:MoveBox) => {
  $q('main').appendChild(box.element)
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

export class MoveBox {
  element:HTMLDivElement
  content:HTMLDivElement

  dragX:number = 0
  dragY:number = 0

  constructor (x:number, y:number, titleText:string, id:string) {
    this.element = $make('div') as HTMLDivElement
    this.element.id = id
    const top = $make('div')
    const bottom = $make('div')
    const title = $make('pre')
    const left = $make('pre')
    const xOut = $make('button')
    this.content = $make('pre') as HTMLDivElement

    this.element.className = 'box'
    top.className = 'box-title'
    bottom.className = 'box-content'
    left.innerText = ' '
    title.innerText = titleText
    xOut.innerHTML = '<pre>X</pre>'

    this.element.appendChild(top)
    this.element.appendChild(bottom)
    top.appendChild(left)
    top.appendChild(title)
    top.appendChild(xOut)
    bottom.appendChild(this.content)

    top.onmousedown = this.mouseDown
    xOut.onmousedown = (ev) => ev.stopPropagation()
    xOut.onclick = this.close

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
