import { $make, hideWindow, makePreText } from './ui'
import { MovableWindow } from './windows'

export class Alert extends MovableWindow {
  dialog:HTMLPreElement
  subtextRow:HTMLDivElement
  buttonRow:HTMLDivElement

  constructor () {
    super(0, 0, 'Alert', false, 'alert')

    this.dialog = $make('pre') as HTMLPreElement
    this.dialog.className = 'alert-text'

    this.buttonRow = $make('div') as HTMLDivElement
    this.buttonRow.className = 'button-row'

    this.subtextRow = $make('div') as HTMLDivElement
    this.subtextRow.className = 'subtext-row'
    const checkbox = $make('input') as HTMLInputElement
    const preText = makePreText('')
    checkbox.type = 'checkbox'
    preText.className = 'subtext'
    this.subtextRow.appendChild(checkbox)
    this.subtextRow.appendChild(preText)
    // this.checkbox.className = 'button-row'

    this.content.appendChild(this.dialog)
    this.content.appendChild(this.subtextRow)
    this.content.appendChild(this.buttonRow)
  }

  activate (
    textString:string,
    options:{ text: string, cb: (additions:boolean) => void }[],
    checkbox?: { text: string /*, cb: (checked:boolean) => void */ }
  ) {
    this.dialog.innerText = textString

    ;(this.subtextRow.firstChild as HTMLInputElement).checked = false
    if (checkbox) {
      ;(this.subtextRow.lastChild as HTMLPreElement).textContent = checkbox.text
      this.subtextRow.classList.remove('display-none')
    } else {
      this.subtextRow.classList.add('display-none')
    }

    Array.from(this.buttonRow.children).forEach(el => el.remove())

    options.forEach(({ text, cb }) => {
      const button = $make('button')
      const pre = makePreText(text)

      button.appendChild(pre)

      button.onclick = () => {
        this.close()
        cb((this.subtextRow.firstChild as HTMLInputElement).checked)
      }

      this.buttonRow.appendChild(button)
    })
  }
}