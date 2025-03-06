import { fileInCode, fileInColors } from '../data/editor-data'
import { symbols } from '../editor/symbols'
import { randomInt } from '../util/util'
import { cssColors } from './colors'
import { MovableWindow } from './windows'

// @ts-ignore
export const $q = (query:string):HTMLElement => document.querySelector(query)
// @ts-ignore
export const $id = (id:string):HTMLElement => document.getElementById(id)
export const $make = (type:string):HTMLElement => document.createElement(type)

export const makePreText = (text:string):HTMLPreElement => {
  const input = $make('pre') as HTMLPreElement
  input.innerText = text
  return input
}

export const makeNumInput = ():HTMLInputElement => {
  const input = $make('input') as HTMLInputElement
  input.type = 'number'
  input.value = '1'
  input.min = '1'
  input.max = '65536'
  input.step = '1'
  input.className = 'num-input'
  return input
}

export const makeButton = (text:string):HTMLButtonElement => {
  const button = $make('button')
  button.innerHTML = `<pre>${text}</pre>`
  return button as HTMLButtonElement
}

export const addToMain = (win:MovableWindow) => {
  $q('main').appendChild(win.element)
}

export const hideWindow = (win:MovableWindow) => {
  win.element.classList.add('display-none')
}

export const showWindow = (win:MovableWindow) => {
  win.element.classList.remove('display-none')
  win.setPosition(win.element.getBoundingClientRect().left, win.element.getBoundingClientRect().top)
}

export const setMoneyUi = (amount:number) => {
  ($id('money-button').querySelector('pre') as HTMLPreElement).innerText = `$${amount}`
}

type GridItem = {
  r:string
}

type Grid = GridItem[][]

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
  if ($id('bg').childElementCount == 0) {
    // Array.from($id('bg').children).map(child => child.remove())

    for (let y = 0; y < fileInCode.length; y++) {
      // TODO: close span on last color?
      const nl = $make('div')
      nl.style.display = 'flex'
      for (let x = 0; x < fileInCode[0].length; x++) {
        const div = $make('div')
        div.className = cssColors[fileInColors[y][x]] + ' woo'
        div.innerText = symbols[fileInCode[y][x]]
        // html += `<div class='${cssColors[fileInColors[y][x]]}'>${fileInCode[y][x] === 0 ? ' ' : symbols[fileInCode[y][x]]}</div>`
        nl.appendChild(div)
      }
      $id('bg').appendChild(nl)
    }
  } else {
    const items = Array.from(document.querySelectorAll('.woo'))
    const int = randomInt(items.length) - 1
    ;(items[int] as HTMLDivElement).innerText = '!'
  }
}
