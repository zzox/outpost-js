import { $id, $make, $q } from '../ui/ui'
import { symbols } from './symbols'

console.log('we in there')

let color:string = 'BG'
let symbol:string = '@'
let mousedown:boolean = false

document.onmousedown = () => mousedown = true
document.onmouseup = () => mousedown = false

$id('WHITE').onclick = () => { color = 'WHITE' }
$id('WHITESMOKE').onclick = () => { color = 'WHITESMOKE' }
$id('OFFWHITE').onclick = () => { color = 'OFFWHITE' }
$id('GREEN').onclick = () => { color = 'GREEN' }
$id('GREY').onclick = () => { color = 'GREY' }
$id('DARKGREY').onclick = () => { color = 'DARKGREY' }
$id('ORANGE').onclick = () => { color = 'ORANGE' }
$id('PURPLE').onclick = () => { color = 'PURPLE' }
$id('BLUE').onclick = () => { color = 'BLUE' }
$id('EMERALD').onclick = () => { color = 'EMERALD' }
$id('TAN').onclick = () => { color = 'TAN' }
$id('BG').onclick = () => { color = 'BG' }
$id('BROWN').onclick = () => { color = 'BROWN' }
$id('GOLD').onclick = () => { color = 'GOLD' }
$id('DARK_GREEN').onclick = () => { color = 'DARK_GREEN' }

const boxSize = 40

const buttonPress = (x:number, y:number) => () => {
  if (mousedown) {
    const element = Array.from(Array.from(document.querySelectorAll('#right > pre'))[y].children)[x] as HTMLElement
    element.innerText = symbol
    element.className = 'item ' + color
  }
}

const go = () => {
  for (let y = 0; y < boxSize; y++) {
    const pre = $make('pre')
    for (let x = 0; x < boxSize; x++) {
      const span = $make('span')
      span.innerText = ' '
      span.className = 'item'
      span.onmouseover = buttonPress(x, y)
      pre.appendChild(span)
    }
    $id('right').appendChild(pre)
  }

  symbols.forEach(s => {
    const pre = $make('pre')
    pre.onclick = () => {
      Array.from($id('symbol-buttons').children).forEach(item => item.classList.remove('symbol-selected'))
      pre.classList.add('symbol-selected')
      symbol = s
    }
    pre.innerText = s
    pre.className = 'symbol'
    $id('symbol-buttons').appendChild(pre)
  })
  // $id('main').innerText = world.map(row => row.map(item => item.r).join('') + '\n').join('')
  // box.content.innerHTML = world.map(row => row.map(item => renderItem(item.r)).join('') + '\n').join('')
}


go()

