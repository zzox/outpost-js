import { getName } from '../data/actor-data'
import { ItemType } from '../data/items'
import { $make, makeButton, makePreText } from './ui'
import { MovableWindow } from './windows'

const padAmount = (amount:number) => `x${amount} `.padStart(7, ' ')
const padPrice = (price:number) => `$${price} `.padEnd(7, ' ')

type OrderCallback = (id:number) => void
type ToggleOrderCallback = (id:number, on:boolean) => void

export class OrdersMenu extends MovableWindow {
  onRemoveOrder:OrderCallback
  onToggleOrder:ToggleOrderCallback

  constructor (x:number, y:number, onRemoveOrder:OrderCallback, onToggleOrder:ToggleOrderCallback) {
    super(x, y, 'Orders', true, 'orders')

    this.onRemoveOrder = onRemoveOrder
    this.onToggleOrder = onToggleOrder
  }

  addOrder = (actorId:number, item:ItemType, amount:number, price:number) => {
    // const index = this.priceLines.length
    const fullEl = $make('div')
    const checkbox = $make('input') as HTMLInputElement
    const itemNameEl = makePreText(item.padEnd(20, ' '))
    const nameEl = makePreText(getName(actorId)?.padEnd(12, ' ') as string)
    const amountEl = makePreText(padAmount(amount))
    const priceEl = makePreText(padPrice(price))
    const div1 = makePreText('| from: ')
    const div2 = makePreText('|')
    const div3 = makePreText('| ')
    const removeButton = makeButton('remove')

    checkbox.type = 'checkbox'
    checkbox.checked = true

    fullEl.className = 'items-row'
    removeButton.className = 'set-button'

    fullEl.appendChild(checkbox)
    fullEl.appendChild(itemNameEl)
    fullEl.appendChild(div1)
    fullEl.appendChild(nameEl)
    fullEl.appendChild(div2)
    fullEl.appendChild(amountEl)
    fullEl.appendChild(div3)
    fullEl.appendChild(priceEl)
    fullEl.appendChild(removeButton)

    removeButton.onclick = () => {
      this.onRemoveOrder(actorId)
      fullEl.remove()
    }

    checkbox.onclick = (event:MouseEvent) => {
      this.onToggleOrder(actorId, (event.target as HTMLInputElement).checked)
    }

    this.content.appendChild(fullEl)
  }
}
