
class World {
  time:number = 0
  day:number = 0

  step () {
    this.time++;
    if (this.time == 360) {
      this.time = 0;
      this.day++;
    }

    // if (--spawnTime == 0) {
    //   spawnActor();
    // }

    // tiles.update();
  }
}

export const world:World = new World()
