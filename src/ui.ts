// // @ts-ignore
const $q = (query:string): HTMLElement => document.querySelector(query)

// // @ts-ignore
const $id = (id:string): HTMLElement => document.getElementById(id)

// // @ts-ignore
const $make = (type:string): HTMLElement => document.createElement(type)

type GridItem = {
  r:string
}

type Grid = GridItem[][]

const boxSize = 24

export const go = () => {
  const world:Grid = []

  for (let y = 0; y < boxSize; y++) {
    world[y] = []
    for (let x = 0; x < boxSize; x++) {
      world[y][x] = { r: Math.random() < 0.2 ? '\u2588' : '\u2591' }
      // world[y][x] = { r: Math.random() < 0.2 ? '\u2588' : '\u2593' }
    }
  }

  // $id('main').innerText = world.map(row => row.map(item => item.r).join('') + '\n').join('')

  const box = new MoveBox(40, 40)

  $q('main').appendChild(box.element)
  box.content.innerText = world.map(row => row.map(item => item.r).join('') + '\n').join('')
}

class MoveBox {

  element:HTMLDivElement

  content:HTMLDivElement

  dragging:boolean = false

  dragX:number = 0
  dragY:number = 0

  constructor (x:number, y:number) {
    this.element = $make('div') as HTMLDivElement
    const top = $make('div')
    const bottom = $make('div')
    const title = $make('pre')
    this.content = $make('pre') as HTMLDivElement

    this.element.className = 'box'
    title.innerText = 'This is the title!'
    top.className = 'box-title'
    bottom.className = 'box-content'

    this.element.appendChild(top)
    this.element.appendChild(bottom)
    top.appendChild(title)
    bottom.appendChild(this.content)

    top.onmousedown = this.mouseDown

    this.setPosition(x, y)
  }

  mouseDown = (ev:MouseEvent) => {
    this.dragging = true
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
    this.dragging = false

    document.onmousemove = null
    document.onmouseup = null
  }

  setPosition = (x:number, y:number) => {
    this.element.style.top = `${y}px`
    this.element.style.left = `${x}px`
  }
}
