import { collisions, playerPos, spawnPositions } from '../data/editor-data'
import { vec2, Vec2 } from '../data/globals'
import { logger } from '../util/logger'
import { Diagonal, pathfind } from '../util/pathfinding'
import { getRandom } from '../util/util'
import { Actor } from './actor'
import { Grid, makeGrid, makeIntGrid } from './grid'

enum GridActorState {
  Coming = 'Coming',
  Going = 'Going'
}

export type GridActor = {
  path:Vec2[]
  time:number
  x:number
  y:number
  state:GridActorState
  actor:Actor
}

export class WorldTiles {
  private grid:Grid
  actors:GridActor[] = []

  // exits:Array<IntVec2> = [new IntVec2(59, 27), new IntVec2(0, 16), new IntVec2(34, 0)]
  // playerPos:IntVec2 = new IntVec2(30, 22)

  encounterActor?:GridActor

  onEncounter:(actor:Actor) => void

  constructor (width:number, height:number, onEncounter:(actor:Actor) => void) {
    this.grid = makeGrid(width, height)
    this.onEncounter = onEncounter
  }

  update () {
    this.actors.forEach((a) => {
      a.time--
      if (a.time == 0) {
        this.moveActor(a)
      }
    })
  }

  addActor (actor:Actor, player:boolean) {
    const items = spawnPositions.filter(pos => this.grid[pos.y][pos.x] === null)
    if (items.length == 0) throw 'No valid exit'

    const startPos = getRandom(items)

    const path = pathfind(
      makeIntGrid(this.grid, collisions),
      startPos,
      playerPos,
      Diagonal,
      true
    )
    if (path == null) throw 'No Path on generate'
    // place actor at x and y on the grid
    // pathfind to the best position
    const gridActor = {
      x: startPos.x,
      y: startPos.y,
      actor: actor,
      time: 7,
      state: GridActorState.Coming,
      path: path
    }

    this.grid[startPos.y][startPos.x] = gridActor
    this.actors.push(gridActor)
  }

  actorDone () {
    const path = pathfind(
      makeIntGrid(this.grid, collisions),
      vec2(this.encounterActor!.x, this.encounterActor!.y),
      getRandom(spawnPositions),
      Diagonal,
      true
    )
    if (path == null) throw 'No Path on leave'

    this.encounterActor!.path = path
    this.encounterActor!.state = GridActorState.Going
    this.encounterActor!.time = 1
  }

  moveActor (actor:GridActor) {
    if (!actor.path[0]) {
      if (actor.state == GridActorState.Coming) {
        this.encounterActor = actor
        this.onEncounter(actor.actor)
      } else {
        this.removeActor(actor)
      }
      return
    }

    // NOTE: consider shorten the below code by moving the actors by
    // checking all other actor's positions
    const item = actor.path[0]
    if (this.grid[item.y][item.x] == null) {
      // if actor distance is diagonal, time is 7
      actor.time = Math.abs(actor.x - item.x) > 0 && Math.abs(actor.y - item.y) > 0 ? 7 : 5
      this.grid[actor.y][actor.x] = null
      this.grid[item.y][item.x] = actor
      actor.x = item.x
      actor.y = item.y
      actor.path.shift()
    } else {
      logger.debug('something in the way', actor.actor.name)
      actor.time = 60
    }
  }

  removeActor (actor:GridActor) {
    this.grid[actor.y][actor.x] = null
    this.actors = this.actors.filter(a => actor !== a)
    // this.onActorRemoved(actor)
  }
}
