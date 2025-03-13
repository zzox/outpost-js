import { ItemType } from '../data/items'
import { $make, makeButton, makeNumInput, makePreText } from './ui'
import { MovableWindow } from './windows'

const padAmount = (amount:number) => `x${amount} `.padStart(7, ' ')

export class WaresMenu extends MovableWindow {
  priceLines:{ item: ItemType, el: HTMLSpanElement }[] = []

  onSetPrice:(t:ItemType, price?:number) => void

  constructor (x:number, y:number, onSetPrice:(t:ItemType, price?:number) => void) {
    super(x, y, 'Wares', true, 'wares')

    this.onSetPrice = onSetPrice
  }

  addItem = (item:ItemType, amount:number, price:number) => {
    const index = this.priceLines.length
    const fullEl = $make('div')
    const nameEl = makePreText(item.padEnd(20, ' '))
    const amountEl = makePreText(padAmount(amount))
    const div1 = makePreText('|')
    const div2 = makePreText('| $')
    const numInput = makeNumInput()
    const setButton = makeButton('set')

    fullEl.className = 'items-row'
    numInput.value = price.toString()
    amountEl.className = 'amount'
    setButton.className = 'set-button'

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

    const onEnterPrice = () => {
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

    numInput.onblur = onEnterPrice
    numInput.onkeydown = (event:KeyboardEvent) => {
      if (event.key === 'Enter') {
        console.log('focusing')
        const el = this.priceLines[(index + 1) % this.priceLines.length]?.el
        if (!el.querySelector('.num-input')?.classList.contains('display-none')) {
          (el.querySelector('.num-input') as HTMLInputElement)?.focus()
        } else {
          el.querySelector('button')?.focus()
          // folliwng event is needed to prevent the enter key from selecting
          // the next "set" button
          event.preventDefault()
        }
      }
    }

    setButton.onclick = () => {
      setButton.classList.add('display-none')
      numInput.classList.remove('display-none')
      numInput.focus()
      numInput.value = '1'
    }

    if (index) {
      this.content.appendChild($make('hr'))
    }

    this.priceLines.push({ item, el: fullEl })
    numInput.tabIndex = index + 1
    setButton.tabIndex = index + 1
    this.content.appendChild(fullEl)
  }

  updateItem = (item:ItemType, amount:number) => {
    (this.priceLines.find((line) => line.item === item)?.el.querySelector('.amount') as HTMLPreElement).textContent = padAmount(amount)
  }
}
