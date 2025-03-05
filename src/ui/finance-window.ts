import { ItemType } from "../data/items"
import { $make, makePreText } from "./ui"
import { MovableWindow } from "./windows"
import { History } from '../world/game-state'
import { totalInventory } from "../util/util"

export class FinanceWindow extends MovableWindow {
  itemsSoldEl:HTMLPreElement
  itemsBoughtEl:HTMLPreElement
  revenueEl:HTMLPreElement
  expensesEl:HTMLPreElement

  constructor (x:number, y:number) {
    super(x, y, 'Finance', true, 'finance')

    this.itemsSoldEl = makePreText('0')
    this.itemsBoughtEl = makePreText('0')
    this.revenueEl = makePreText('$0')
    this.expensesEl = makePreText('$0')

    this.content.appendChild(makeFinanceRow(makePreText('Items Sold'), this.itemsSoldEl))
    this.content.appendChild(makeFinanceRow(makePreText('Items Bought'), this.itemsBoughtEl))
    this.content.appendChild(makeFinanceRow(makePreText('Revenue'), this.revenueEl))
    this.content.appendChild(makeFinanceRow(makePreText('Expenses'), this.expensesEl))
  }

  updateFromState = (history:History) => {
    this.itemsSoldEl.textContent = totalInventory(history.itemsSold).toString()
    this.itemsBoughtEl.textContent = totalInventory(history.itemsBought).toString()
    this.revenueEl.textContent = `$${history.revenue}`
    this.expensesEl.textContent = `$${history.expenses}`
  }
}

const makeFinanceRow = (left:HTMLPreElement, right:HTMLPreElement):HTMLDivElement => {
  const row = $make('div') as HTMLDivElement
  row.className = 'finance-row'
  row.appendChild(left)
  row.appendChild(right)
  return row
}
