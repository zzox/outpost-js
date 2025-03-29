import { Actor } from '../world/actor'
import { makePreText } from './ui'
import { MovableWindow } from './windows'

export class ActorWindow extends MovableWindow {
  constructor (x:number, y:number, actor:Actor) {
    super(x, y, actor.name!, true, actor.name!.toLowerCase())

    const level = makePreText(`Level ${actor.level}`)
    this.content.appendChild(level)
  }
}
