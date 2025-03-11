import { ItemType } from '../data/items'
import { AsciiRenderer } from './ascii'
import { $make, makeButton, makeNumInput, makePreText } from './ui'
import { MovableWindow } from './windows'

const padAmount = (amount:number) => `x${amount} `.padStart(7, ' ')

export class QuestMenu extends MovableWindow {
  constructor (x:number, y:number) {
    super(x, y, 'Wares', true, 'wares')

    const pre = makePreText('')
    this.content.appendChild(pre)
    const renderer = new AsciiRenderer(pre, 10, 20, [], [])
  }
}
