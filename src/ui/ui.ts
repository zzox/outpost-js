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

export const removeFromMain = (win:MovableWindow) => {
  $q('main').removeChild(win.element)
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
