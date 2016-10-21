utils = require('./utils')

exports.updateFile = () => {
  let E = $.map($('td', '.table-div'), (x) => $(x).hasClass('keyed') ? 1 : -1)
  let P = $('button.selected-digit').text()
  utils.appendToJSON(E, P)
}

exports.learn = () => {
  let wages = Array(10).fill(1).map( (x) => utils.getRandomWages(36))
  let pocketWages = [...wages]
  let threshold = parseFloat(((Math.random() / 2).toFixed(2)))
  let longesLives = Array(10).fill(0)
}
