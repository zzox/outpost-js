export const TOPBAR_HEIGHT = 48
export const DAY_LENGTH = 360

export type Vec2 = {
  x:number, y:number
}

// y = mx + b, <= limit
export type Scale = {
  m:number
  b:number
  l:number
}

export type HiLow = { hi:number, low:number }

export const scale = (m:number, b:number, l:number):Scale => ({ m, b, l })
