import { LogList } from "./ui/renderable"
import { addToMain } from "./ui/ui"

console.log('hi world')

let logs: LogList

const next = () => {
  // if (--frames == 0) {
  //   render()
  // }

  if (Math.random() < 0.01) {
    logs.addLog(`here is a random log: ${Math.random()}`)
    logs.render()
  }

  requestAnimationFrame(next)
}

const go = () => {
  logs = new LogList(100, 100)
  addToMain(logs)
  requestAnimationFrame(next)
}

go()
