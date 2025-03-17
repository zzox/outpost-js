import { Vec2 } from '../data/globals'
import { IntGrid } from '../world/grid'

// NOTE: this is pathfinding specific to `outpost`,
// it has the height and width switched on 2d grids!

// import core.Types;
// import game.data.EditorData;
// import game.world.Grid;

// typedef IntGrid = Array<Array<Int>>;

// from: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
type Heuristic = (p1:Vec2, p2:Vec2) => number

export const Manhattan = (p1:Vec2, p2:Vec2): number => {
  const d1 = Math.abs(p2.x - p1.x)
  const d2 = Math.abs(p2.y - p1.y)
  return d1 + d2
}

export const Diagonal = (p1:Vec2, p2:Vec2): number => {
  const d1 = Math.abs(p2.x - p1.x)
  const d2 = Math.abs(p2.y - p1.y)
  return d1 + d2 + ((Math.sqrt(2) - 2) * Math.min(d1, d2))
}

class PathNode {
  point:Vec2
  tail?:PathNode
  cost:number = 0.0
  h:number = 0.0

  constructor (point:Vec2, tail?:PathNode) {
    this.point = point
    this.tail = tail
  }
}

class Heap {
  nodes:PathNode[] = [];

  addNode (node: PathNode) {
    this.nodes.push(node)
    this.nodes.sort((n1, n2) => Math.round(n1.cost + n1.h) - Math.round(n2.cost + n2.h))
  }

  popNode ():PathNode | undefined {
    return this.nodes.shift()
  }
}

// TODO: better name, isn't exactly a hash set.
class HashSet {
  // combined x,y position -> cost
  items:Map<number, number> = new Map();
  width:number;

  constructor (width: number) {
    this.width = width
  }

  getItem (point:Vec2):number | undefined{
    return this.items.get(Math.round(point.y * this.width + point.x))
  }

  setItem (point:Vec2, cost: number) {
    this.items.set(point.y * this.width + point.x, cost)
  }
}

const checkPointsEqual = (point1:Vec2, point2:Vec2):boolean => {
  return point1.x === point2.x && point1.y === point2.y
}

function createPathFrom (node:PathNode):Vec2[] {
  const items:Vec2[] = []

  while (node.tail != null) {
    items.push(node.point)
    node = node.tail
  }

  items.reverse()

  return items
}

const checkCanMoveTo = (grid:IntGrid, point:Vec2, target:Vec2):boolean => {
    // TODO: store height and width on a grid class
    // WARN:
    const height = grid.length
    const width = grid[0].length

    // if out of bounds or has an actor or obstacle that's not the target, return false
    return !(
        point.x < 0 || point.y < 0 || point.x >= width || point.y >= height ||
        !(grid[point.y][point.x] !== 0 ||
        (point.x === target.x && point.y === target.y))
    );
}

function getNeighbors (grid: IntGrid, point:Vec2, target:Vec2, canGoDiagonal:boolean = false):Vec2[] {
  const neighbors:Vec2[] = [];

  // N, S, E, W
  if (checkCanMoveTo(grid, { x: point.x, y: point.y - 1 }, target)) {
    neighbors.push({ x: point.x, y: point.y - 1 })
  }
  if (checkCanMoveTo(grid, { x: point.x, y: point.y + 1 }, target)) {
    neighbors.push({ x: point.x, y: point.y + 1 })
  }
  if (checkCanMoveTo(grid, { x: point.x + 1, y: point.y }, target)) {
    neighbors.push({ x: point.x + 1, y: point.y })
  }
  if (checkCanMoveTo(grid, { x: point.x - 1, y: point.y }, target)) {
    neighbors.push({ x: point.x - 1, y: point.y })
  }

  // NE, SE, NW, SW
  if (canGoDiagonal) {
    if (checkCanMoveTo(grid, { x: point.x + 1, y: point.y - 1 }, target)) {
      neighbors.push({ x: point.x + 1, y: point.y - 1 })
    }
    if (checkCanMoveTo(grid, { x: point.x + 1, y: point.y + 1 }, target)) {
      neighbors.push({ x: point.x + 1, y: point.y + 1 })
    }
    if (checkCanMoveTo(grid, { x: point.x - 1, y: point.y - 1 }, target)) {
      neighbors.push({ x: point.x - 1, y: point.y - 1 })
    }
    if (checkCanMoveTo(grid, { x: point.x - 1, y: point.y + 1 }, target)) {
      neighbors.push({ x: point.x - 1, y: point.y + 1 })
    }
  }

  return neighbors;
}

function getMovementCost (grid: IntGrid, fromPoint:Vec2, toPoint:Vec2): number {
  // WARN:
  const pointCost = grid[fromPoint.y][fromPoint.x]

  var multi = 1
  if (fromPoint.x - toPoint.x !== 0 && fromPoint.y - toPoint.y !== 0) {
    multi *= Math.sqrt(2)
  }

  return pointCost * multi
}

export function pathfind (
  grid: IntGrid,
  startPoint:Vec2,
  endPoint:Vec2,
  heuristic: Heuristic,
  canGoDiagonal:boolean = false
):Vec2[] | null {
  const startNode = new PathNode(startPoint);

  // WARN:
  const visited = new HashSet(grid[0].length);

  // our heap of possible selections
  const heap = new Heap();
  // push node to a sorted queue of open items
  heap.addNode(startNode);

  let iterations = 0
  while (heap.nodes.length > 0) {
    const currentNode = heap.popNode()

    if (!currentNode) {
      throw 'Undefined node!';
    }

    // check if this start equals the end
    // trace(endPoint.x, endPoint.y, currentNode.point.x, currentNode.point.y);
    if (checkPointsEqual(endPoint, currentNode.point)) {
      return createPathFrom(currentNode);
    }

    const neighbors = getNeighbors(grid, currentNode.point, endPoint, canGoDiagonal);
    neighbors.forEach(neighbor => {
      // find cost for neighbor, include cost to this point
      const newCost = currentNode.cost + getMovementCost(grid, currentNode.point, neighbor);

      // TODO:
      // use heuristic to find estimated cost (alloted + estimate distance)

      // if the visited item exists and has a lower cost, don't do anything with this neighbor
      const visitedItem = visited.getItem(neighbor);
      // console.log(neighbor, currentNode.point)
      if (visitedItem == null || newCost < visitedItem) {
        const newNode = new PathNode(neighbor, currentNode);
        newNode.cost = newCost;
        newNode.h = heuristic(neighbor, endPoint);
        heap.addNode(newNode);
        visited.setItem(neighbor, newCost);
      }
    })

    // safeguarding against infinite loops. may be unnecessary.
    if (++iterations > 100000) {
      break;
    }
  }

  return null;
}

// function multiPathfind (grid:Grid, pos:Vec2, endPoints:Vec2[], direct:boolean):Vec2[] | undefined {
//   var bestPath = null;
//   for (p of endPoints) {
//     const path = pathfind(
//       makeIntGrid(grid, collisions),
//       cloneVec2(pos),
//       cloneVec2(p),
//       Manhattan
//     );

//     if (path !== null && (bestPath === null || path.length < bestPath.length)) {
//       bestPath = path;
//     }
//   }

//   return bestPath;
// }
