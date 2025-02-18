// // @ts-ignore
const $q = (query:string): HTMLElement => document.querySelector(query)

// // @ts-ignore
const $id = (id:string): HTMLElement => document.getElementById(id)

const $make = (type:string): HTMLElement => document.createElement(type)

const clamp = (value:number, min:number, max:number):number => Math.max(Math.min(value, max), min)

type GridItem = {
  r:string
}

type Grid = GridItem[][]

const boxSize = 40

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

  dragX:number = 0
  dragY:number = 0

  constructor (x:number, y:number) {
    this.element = $make('div') as HTMLDivElement
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
    title.innerText = 'This is the title!'
    xOut.innerText = 'X'

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
    const xx = clamp(x, 0, window.innerWidth - this.element.getBoundingClientRect().width)
    const yy = clamp(y, 0, window.innerHeight - this.element.getBoundingClientRect().height)

    this.element.style.left = `${xx}px`
    this.element.style.top = `${yy}px`
  }

  close = () => {
    this.element.remove()
  }
}
