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
