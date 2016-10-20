utils = require('./utils')

exports.updateFile = () => {
  console.log($.map($('td', '.table-div'), (x) => $(x).hasClass('keyed') ? 1 : 0))
}
