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

const boxSize = 16

export const go = () => {
  const world:Grid = []

  for (let y = 0; y < boxSize; y++) {
    world[y] = []
    for (let x = 0; x < boxSize; x++) {
      world[y][x] = { r: Math.random() < 0.2 ? '0' : 'P' }
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

  constructor (x:number, y:number) {
    this.element = this.makeElement()
    this.element.style.top = `${y}px`
    this.element.style.left = `${x}px`
  }

  makeElement ():HTMLDivElement {
    const el = $make('div')
    const top = $make('div')
    const bottom = $make('div')
    const title = $make('pre')
    this.content = $make('pre') as HTMLDivElement

    title.innerText = 'This is the title!'

    el.className = 'box'
    top.className = 'box-title'
    bottom.className = 'box-content'

    el.appendChild(top)
    el.appendChild(bottom)
    top.appendChild(title)
    bottom.appendChild(this.content)

    return el as HTMLDivElement
  }
}
