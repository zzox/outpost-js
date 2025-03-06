import { ItemType } from '../data/items'
import { $make, makeButton, makeNumInput, makePreText } from './ui'
import { MovableWindow } from './windows'

export class WaresMenu extends MovableWindow {
  priceLines:Map<ItemType, HTMLSpanElement> = new Map

  onSetPrice:(t:ItemType, price?:number) => void

  constructor (x:number, y:number, onSetPrice:(t:ItemType, price?:number) => void) {
    super(x, y, 'Wares', true, 'wares')

    this.onSetPrice = onSetPrice
  }

  addItem = (item:ItemType, amount:number, price:number) => {
    const fullEl = $make('div')
    const nameEl = makePreText(item.padEnd(20, ' '))
    const amountEl = $make('pre')
    const div1 = makePreText('|')
    const div2 = makePreText('| $')
    const numInput = makeNumInput()
    const setButton = makeButton('set')

    fullEl.className = 'wares-row'
    numInput.value = price.toString()
    amountEl.id = 'amount'
    setButton.className = 'set-button'

    // setAmount
    // PERF:
    amountEl.innerText = `x${amount} `.padStart(7, ' ')

    fullEl.appendChild(nameEl)
    fullEl.appendChild(div1)
    fullEl.appendChild(amountEl)
    fullEl.appendChild(div2)
    fullEl.appendChild(numInput)
    fullEl.appendChild(setButton)

    if (price) {
      setButton.classList.add('display-none')
    } else {
      numInput.classList.add('display-none')
    }

    numInput.onblur = () => {
      const num = parseInt(numInput.value)
      if (isNaN(num) || num === 0) {
        numInput.value = '0'
        this.onSetPrice(item)

        numInput.classList.add('display-none')
        setButton.classList.remove('display-none')
        setButton.focus()
      } else {
        this.onSetPrice(item, num)
      }
    }

    setButton.onclick = () => {
      setButton.classList.add('display-none')
      numInput.classList.remove('display-none')
      numInput.focus()
      numInput.value = '1'
    }

    if (this.priceLines.size) {
      this.content.appendChild($make('hr'))
    }

    this.priceLines.set(item, fullEl)
    numInput.tabIndex = this.priceLines.size
    setButton.tabIndex = this.priceLines.size
    this.content.appendChild(fullEl)
  }

  updateItem = (item:ItemType, amount:number) => {
    (this.priceLines.get(item)?.querySelector('#amount') as HTMLPreElement).innerText = `x${amount} `.padStart(7, ' ')
  }
}
