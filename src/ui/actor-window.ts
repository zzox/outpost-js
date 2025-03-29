import { Actor } from '../world/actor'
import { makePreText } from './ui'
import { MovableWindow } from './windows'

export class ActorWindow extends MovableWindow {
  onClose:() => void

  constructor (x:number, y:number, actor:Actor, onClose:() => void) {
    super(x, y, actor.name!, true, actor.name!.toLowerCase())

    console.log(actor)

    const level = makePreText(`Level ${actor.level}`)
    const health = makePreText(`Health    ${actor.skill.health}`)
    const strength = makePreText(`Strength  ${actor.skill.strength}`)
    const defense = makePreText(`Defense   ${actor.skill.defense}`)
    const speed = makePreText(`Speed     ${actor.skill.speed}`)
    const magic = makePreText(`Magic     ${actor.skill.magic}`)

    this.content.appendChild(level)
    this.content.appendChild(health)
    this.content.appendChild(strength)
    this.content.appendChild(defense)
    this.content.appendChild(speed)
    this.content.appendChild(magic)

    this.onClose = onClose
  }

  close () {
    // this.element.remove()
    this.onClose()
  }
}
