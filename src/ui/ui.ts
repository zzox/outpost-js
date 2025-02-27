import { fileInCode, fileInColors } from '../data/editor-data'
import { cssColors } from './colors'
import { MovableWindow } from './windows'

// @ts-ignore
export const $q = (query:string): HTMLElement => document.querySelector(query)
// @ts-ignore
export const $id = (id:string): HTMLElement => document.getElementById(id)

export const $make = (type:string): HTMLElement => document.createElement(type)

export const addToMain = (win:MovableWindow) => {
  $q('main').appendChild(win.element)
}

export const hideWindow = (win:MovableWindow) => {
  win.element.classList.add('display-none')
}

export const showWindow = (win:MovableWindow) => {
  win.element.classList.remove('display-none')
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

  let html = ''

  for (let y = 0; y < fileInCode.length; y++) {
    // TODO: close span on last color?
    for (let x = 0; x < fileInCode[0].length; x++) {
      html += `<span class='${cssColors[fileInColors[y][x]]}'>${fileInCode[y][x] === 0 ? '&nbsp;' : String.fromCharCode(fileInCode[y][x])}</span>`
    }
    html += '\n'
  }

  $id('main').innerHTML = html
}
