const ascii:string[] = []
for (let i = 32; i <= 127; i++) {
  // from: https://stackoverflow.com/a/3145054
  ascii.push(String.fromCharCode(i))
}

const extraSymbols = [
  '\u2588', // full block
  '\u2591', // light shade
  '\u2592', // medium shade
  '\u2593', //  shade
]

export const symbols = ascii.concat(extraSymbols)
