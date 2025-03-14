// from: https://github.com/bryc/code/blob/master/jshash/PRNGs.md

const xmur3 = (str:string):(() => number) => {
  for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = h << 13 | h >>> 19
  }

  return () => {
    h = Math.imul(h ^ h >>> 16, 2246822507)
    h = Math.imul(h ^ h >>> 13, 3266489909)
    return (h ^= h >>> 16) >>> 0;
  }
}

const sfc32 = (a:number, b:number, c:number, d:number):(() => number) => {
  return () => {
    a |= 0; b |= 0; c |= 0; d |= 0; 
    var t = (a + b | 0) + d | 0;
    d = d + 1 | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = c << 21 | c >>> 11;
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  }
}

export class Random {
  rand:() => number

  constructor (seed:string) {
    const seeder = xmur3(seed)
    this.rand = sfc32(seeder(), seeder(), seeder(), seeder())
  }

  get = ():number => this.rand()
}
