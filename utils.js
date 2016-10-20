fs = require('fs')
let parseToJSON = () => JSON.parse(fs.readFileSync('examples.json', 'utf-8'))

exports.getJSONWithExamples = parseToJSON()

exports.appendToJSON = (example_hash) => {
  currentJSON = parseToJSON()
  currentJSON.push(example_hash)
  console.log(currentJSON)
  fs.writeFileSync('examples.json', JSON.stringify(currentJSON))
}
