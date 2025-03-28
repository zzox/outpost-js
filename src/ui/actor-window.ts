import { makePreText } from './ui'
import { MovableWindow } from './windows'

export class ActorWindow extends MovableWindow {
  constructor (x:number, y:number, name:string) {
    super(x, y, name, true, name.toLowerCase())
  }
}
