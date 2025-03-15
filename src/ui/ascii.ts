import { symbols } from '../editor/symbols'
import { logger } from '../util/logger'
import { randomInt } from '../util/util'
import { copyGrid, IntGrid, makeEmptyGrid } from '../world/grid'
import { WorldTiles } from '../world/world-tiles'
import { cssColors } from './colors'
import { $id, $make, $q } from './ui'

export class AsciiRenderer {
  parentEl:HTMLPreElement

  width:number
  height:number

  symbols:IntGrid
  colors:IntGrid

  private prevSymbols:IntGrid
  private prevColors:IntGrid

  constructor (parent:HTMLPreElement, height:number, width:number, symbols:IntGrid, colors:IntGrid) {
    if (!parent) {
      throw 'No parent element for ascii renderer'
    }

    if (height !== symbols.length || width !== symbols[0].length) {
      logger.error(height, symbols.length, width, symbols[0].length)
      throw 'Wrong size width or height'
    }

    this.parentEl = parent

    this.width = width
    this.height = height
    this.symbols = copyGrid(symbols)
    this.colors = copyGrid(colors)
    this.prevSymbols = makeEmptyGrid(height, width)
    this.prevColors = makeEmptyGrid(height, width)

    this.make()
    // this.render()
  }

  make () {
    for (let y = 0; y < this.height; y++) {
      const nl = $make('div')
      nl.style.display = 'flex'
      for (let x = 0; x < this.width; x++) {
        const div = $make('div')
        // div.className = cssColors[this.colors[y][x]]
        div.textContent = ' '
        nl.appendChild(div)
      }
      this.parentEl.appendChild(nl)
    }
  }

  render () {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.symbols[y][x] !== this.prevSymbols[y][x]) {
          this.parentEl.children.item(y)!.children.item(x)!.textContent = symbols[this.symbols[y][x]]
        }

        if (this.colors[y][x] !== this.prevColors[y][x]) {
          this.parentEl.children.item(y)!.children.item(x)!.className = cssColors[this.colors[y][x]]
        }
      }
    }

    this.prevColors = copyGrid(this.colors)
    this.prevSymbols = copyGrid(this.symbols)
  }

  setItem (grid, x, y, symbol, color) {}
}

export class BgRender extends AsciiRenderer {
  bgSymbols:IntGrid
  bgColors:IntGrid

  worldTiles:WorldTiles

  constructor (parent:HTMLPreElement, height:number, width:number, symbols:IntGrid, colors:IntGrid) {
    super(parent, height, width, symbols, colors)

    this.bgSymbols = copyGrid(symbols)
    this.bgColors = copyGrid(colors)
  }

  render() {
    const newSymbols = copyGrid(this.symbols)
    const newColors = copyGrid(this.colors)

    this.symbols = newSymbols
    this.colors = newColors

    super.render()
  }
}

export const makeWorldAscii = () => {
  const renderItem = (r:string) => {
    if (r == '\u25AA') {
      return '<span class="brown">\u25AA</span>'
    }

    return r
  }

  // try 1
  // appending all that text is slow
  // $id('bg').textContent = ''

  // for (let y = 0; y < fileInCode.length; y++) {
  //   // TODO: close span on last color?
  //   for (let x = 0; x < fileInCode[0].length; x++) {
  //     const span = $make('span')
  //     span.className = cssColors[fileInColors[y][x]]
  //     span.textContent = symbols[fileInCode[y][x]]
  //     // html += `<span class='${cssColors[fileInColors[y][x]]}'>${fileInCode[y][x] === 0 ? ' ' : symbols[fileInCode[y][x]]}</span>`
  //     $id('bg').appendChild(span)
  //   }
  //   const nl = $make('span')
  //   nl.textContent = '\n'
  //   $id('bg').appendChild(nl)
  // }

  // try 2
  // not terrible, querySelectorAll can be slow, layout takes a while
  // if ($id('bg').childElementCount > 0) {
  //   const items = Array.from(document.querySelectorAll('#bg > span'))
  //   ;(items[randomInt(items.length)] as HTMLDivElement).textContent = '!'
  // } else {
  //   $id('bg').textContent = ''

  //   for (let y = 0; y < fileInCode.length; y++) {
  //     // TODO: close span on last color?
  //     for (let x = 0; x < fileInCode[0].length; x++) {
  //       const span = $make('span')
  //       span.className = cssColors[fileInColors[y][x]]
  //       span.textContent = symbols[fileInCode[y][x]]
  //       // html += `<span class='${cssColors[fileInColors[y][x]]}'>${fileInCode[y][x] === 0 ? ' ' : symbols[fileInCode[y][x]]}</span>`
  //       $id('bg').appendChild(span)
  //     }
  //     const nl = $make('span')
  //     nl.textContent = '\n'
  //     $id('bg').appendChild(nl)
  //   }
  // }

  // try 3
  // still not as fast as id like, paint takes longer than layout
  // if ($id('bg').childElementCount == 0) {
  //   // Array.from($id('bg').children).map(child => child.remove())

  //   for (let y = 0; y < fileInCode.length; y++) {
  //     // TODO: close span on last color?
  //     const nl = $make('div')
  //     nl.style.display = 'flex'
  //     for (let x = 0; x < fileInCode[0].length; x++) {
  //       const div = $make('div')
  //       div.className = cssColors[fileInColors[y][x]] + ' woo'
  //       div.innerText = symbols[fileInCode[y][x]]
  //       // html += `<div class='${cssColors[fileInColors[y][x]]}'>${fileInCode[y][x] === 0 ? ' ' : symbols[fileInCode[y][x]]}</div>`
  //       nl.appendChild(div)
  //     }
  //     $id('bg').appendChild(nl)
  //   }
  // } else {
  //   const items = Array.from(document.querySelectorAll('.woo'))
  //   const int = randomInt(items.length) - 1
  //   ;(items[int] as HTMLDivElement).innerText = '!'
  // }
}
