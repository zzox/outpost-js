import { $id, $make, $q } from '../ui/ui'
import { symbols } from './symbols'
import { cssColors } from '../ui/colors'

console.log('we in there')

let color:string = 'BG'
let symbol:string = '@'
let mousedown:boolean = false

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

const boxHeight = 30
const boxWidth = 60

const buttonPress = (x:number, y:number) => () => {
  if (mousedown) {
    const element = Array.from(Array.from(document.querySelectorAll('#right > pre'))[y].children)[x] as HTMLElement
    element.innerText = symbol
    element.className = 'item ' + color
  }
}

const save = () => {
  const fileItems = Array.from(document.querySelectorAll('#right > pre')).map(pre =>
    Array.from(pre.children).map(item =>
      symbols.indexOf(item.innerHTML)
    )
  )

  const fileColors = Array.from(document.querySelectorAll('#right > pre')).map(pre =>
    Array.from(pre.children).map(item =>
      cssColors.indexOf(item.className.split(' ')[1]) === -1 ? 0 : cssColors.indexOf(item.className.split(' ')[1])
    )
  )

  console.log(JSON.stringify(fileItems))
  console.log(JSON.stringify(fileColors))
}

const load = (fileItems:number[][], fileColors:number[][]) => {
  Array.from(document.querySelectorAll('#right > pre')).map((pre, y) => {
    (Array.from(pre.children) as HTMLSpanElement[]).map((item, x) => {
      item.innerText = symbols[fileItems[y][x]]
      item.classList.add(cssColors[fileColors[y][x]])
    })
  })
}

const go = () => {
  for (let y = 0; y < boxHeight; y++) {
    const pre = $make('pre')
    for (let x = 0; x < boxWidth; x++) {
      const span = $make('span')
      span.innerText = ' '
      span.className = 'item'
      span.onmousemove = buttonPress(x, y)
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

document.onmousedown = () => mousedown = true
document.onmouseup = () => mousedown = false
document.onkeydown = (event) => {
  if (event.key === 's') {
    save()
  }
}

go()

console.log(symbols)

if (true) {
  load(
    [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,14,14,14,14,14,14,14],[0,0,0,0,16,16,16,0,0,0,0,0,0,0,0,0,0,0,0,0,16,16,16,0,0,0,0,0,0,0,0,0,14,14,14,14,14,0,0,0,0,0,0,0,0,14,14,14,14,94,14,14,14,14,14,14,14,14,14,14],[0,0,0,0,16,92,16,0,0,0,0,0,0,0,0,0,0,0,0,0,16,92,16,0,0,0,0,0,0,0,0,0,14,14,14,14,14,0,0,0,0,0,14,14,14,14,14,14,14,94,14,14,94,14,14,14,14,14,14,14],[0,0,0,0,0,92,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,92,0,0,0,0,0,0,0,0,0,0,14,14,14,14,0,0,0,0,0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14],[0,0,0,0,0,92,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,92,0,0,0,0,0,0,0,0,0,0,14,14,14,14,0,0,0,14,14,14,14,14,14,0,94,14,14,94,14,14,14,14,14,0,94,14,14,14],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,16,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,0,0,0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,94,94,14,14,14],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,92,16,0,0,0,0,0,16,0,0,0,0,0,0,0,0,14,14,14,14,0,0,0,14,14,14,14,14,14,14,94,14,14,14,14,14,14,14,14,14,14,14,94,14],[0,0,0,0,0,0,0,0,0,16,16,16,0,0,0,0,92,0,0,0,0,0,16,92,0,0,0,0,0,0,0,0,14,14,14,0,0,0,0,14,14,14,14,14,14,14,14,14,94,14,94,14,14,14,14,14,14,14,94,14],[0,0,0,0,0,0,0,0,0,16,92,16,0,0,0,0,0,0,0,0,0,0,0,60,0,0,0,0,0,0,0,14,14,14,0,0,0,0,0,0,0,14,14,14,14,14,14,14,14,14,14,14,94,14,94,14,14,14,14,94],[0,0,0,0,0,0,0,0,0,0,92,92,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,0,0,0,0,0,0,0,0,0,14,14,94,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14],[0,0,0,0,0,0,0,0,0,0,15,92,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,0,14,14,14,14,14,14,14,14,14,14,14,14],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,94,14,14,14,14,14,14,14,14,14],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,14,14,14,14,14],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,14,14],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14],[0,14,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,14,14,14,14,14,14,14,14,14,14,14,14,0,0,0,0,0,0,0,14,14,14,14,14,0,0,0,16,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,0,0,0,0,0,0,0,0,14,14,14,14,14,14],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,14,14,14,14,14,14,14,14,14],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,7,7,12,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,9],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,7,7,12,12,0,0,0,0,0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,9,9,9,9],[0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,12,7,7,12,12,0,0,0,0,0,0,0,0,9,9,9,9,10,9,9,9,9,9,9,9,9,9,9],[0,0,0,0,4,12,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,12,4,0,0,0,0,0,0,0,0,0,12,7,7,12,12,0,0,0,0,0,9,9,9,9,9,9,9,10,9,9,10,9,9,9,9,9,9,9],[0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,12,7,7,12,0,0,0,0,0,9,9,9,9,9,9,9,9,9,9,9,10,9,9,9,9,9,9,9],[0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,12,7,7,12,0,0,0,9,9,9,9,9,9,0,10,9,9,10,9,9,9,9,9,0,10,9,9,9],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,7,7,12,0,0,0,9,9,9,9,9,9,9,9,9,9,9,9,10,9,9,10,10,10,9,9,9],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,12,4,0,0,0,0,0,4,0,0,0,0,0,0,0,0,12,7,7,12,0,0,0,9,9,9,9,9,9,10,10,9,9,9,9,9,9,9,9,9,9,9,10,9],[0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,12,0,0,0,0,0,4,12,0,0,0,0,0,0,0,0,7,7,12,0,0,0,0,9,9,9,9,9,9,9,9,9,10,10,10,9,9,9,9,9,9,9,10,9],[0,0,0,0,0,0,0,0,0,4,12,4,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,7,7,7,0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,9,9,9,10,10,10,9,9,9,9,10],[0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,7,7,7,0,0,0,0,0,0,0,0,0,9,9,10,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],[0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,9,9,9,0,9,9,9,9,9,9,10,9,9,9,9,9],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,7,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,9,9,10,9,9,9,9,9,9,9,9,9],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,7,7,7,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,9,9],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,9,9,9,9,9],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,12,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,9],[0,12,12,12,12,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,7,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,7,7,7,7,7,7,7,7,7,12,12,12,0,0,0,0,0,0,0,12,7,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,7,7,7,7,7,7,7,7,7,7,7,7,7,12,7,7,7,7,12,7,7,7,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,12,12,12,12,7,12,12,12,12,12,12,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,12,12,12,12,12,12,12,12,12,12,12,7,7,7,7,7,7,7,7,7,7,7,7,7,12,12,12,12,12,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,12,12,12,12,12,12,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,0,0,0,0,0,0,0,0,12,12,12,12,12,12],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,12,12,12,12,12,12,12,12,12,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,12,12,12,12,12,12,12,12,12,7,7,7,7,7,7,7,7,7,7,7,7,7],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,12,12,12,12,12,12,12,12,12,12,12,12,12],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
  )
}
