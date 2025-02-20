
class World {
  time:number = 0
  day:number = 0

  step () {
    this.time += 1
  }
}

export const world:World = new World()
