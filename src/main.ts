import { go } from './ui/ui'

console.log('hi world')

const next = () => {
  if (Math.random() < 0.01) go()
  requestAnimationFrame(next)
}

requestAnimationFrame(next)
