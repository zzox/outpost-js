// fake
type GridActor = number

// type Grid = <(null | GridActor)>[][]
export type IntGrid = number[][]

/**
 * Methods for making and handling grids.
 */
// const makeGrid = (width:number, height:number):Grid => {
//   const grid = []
//   for (let y = 0; y < height; y++) {
//     const row = []
//     for (let x = 0; x < width; x++) {
//         row.push(null)
//     }
//     grid.push(row)
//   }
//   return grid
// }

// const makeIntGrid = (grid:Grid, collisions:number[][]):IntGrid => {
//   const newGrid = []
//   for (let y = 0; y < grid.length; y++) {
//     const newRow = []
//     for (let x = 0; x < grid[y].length; x++) {
//       newRow.push(grid[y][x] == null && collisions[y][x] == 0 ? 1 : 0)
//     }
//     newGrid.push(newRow)
//   }
//   return newGrid
// }

export const makeEmptyGrid = (height:number, width:number):IntGrid => {
  const newGrid = []
  for (let y = 0; y < width; y++) {
    const newRow = []
    for (let x = 0; x < height; x++) {
      newRow.push(0)
    }
    newGrid.push(newRow)
  }
  return newGrid
}

export const copyGrid = (grid:IntGrid):IntGrid => {
  const newGrid = []
  for (let y = 0; y < grid.length; y++) {
    const newRow = []
    for (let x = 0; x < grid[0].length; x++) {
      newRow.push(grid[y][x])
    }
    newGrid.push(newRow)
  }
  return newGrid
}
