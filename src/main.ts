import { Alert, LogList } from './ui/renderable'
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
  logs = new LogList(0, 0)
  addToMain(logs)
  // setting position here so the bounding client rect exists
  logs.setPosition(16384, 16384)

  const alert = new Alert(40, 40, 'What are you going to do about this?', [{ text: 'Confirm', cb: () => console.log('yeaeaa') }, { text: 'Deny', cb: () => console.log('no')}]);
  addToMain(alert)

  requestAnimationFrame(next)
}

go()
