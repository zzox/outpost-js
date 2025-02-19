import { LogList } from './ui/renderable'
import { addToMain, makeWorldAscii } from './ui/ui'

console.log('hi world')

let logs: LogList

let time = 0

const next = (now:number) => {
  if (now - time > 100) {
    // doUpdate();

    // for the overflow
    // TODO: calculate
    time = now + (now - time) - 100
  }

  if (Math.random() < 0.01) {
    logs.addLog(`here is a random log: ${Math.random()}`)
    logs.render()
  }

  requestAnimationFrame(next)
}

const go = () => {
  makeWorldAscii()
  logs = new LogList(100, 100)
  addToMain(logs)
  requestAnimationFrame(next)
}

go()
