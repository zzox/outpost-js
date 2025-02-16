type GridItem = {
  r:string
}

type Grid = GridItem[][]

export const go = () => {
  const world:Grid = []

  for (let y = 0; y < 200; y++) {
    world[y] = []
    for (let x = 0; x < 200; x++) {
      world[y][x] = { r: Math.random() < 0.2 ? '0' : 'P' }
    }
  }

  // // @ts-ignore
  const $id = (id:string): HTMLElement => document.getElementById(id)

  $id('main').innerText = world.map(row => row.map(item => item.r).join('') + '\n').join('')
}
