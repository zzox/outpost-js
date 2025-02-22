export const clamp = (value:number, min:number, max:number):number => Math.max(Math.min(value, max), min)

export const randomInt = (num:number) => {
  return Math.ceil(Math.random() * num)
}
