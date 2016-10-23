const utils = require('./utils')
const calculations = require('./calculations');

exports.updateFile = () => {
  let E = $.map($('td', '.table-div'), (x) => $(x).hasClass('keyed') ? 1 : -1)
  let P = $('button.selected-digit').text()
  if(P == null || P == undefined || P == ''){
    alert('Jaka to cyfra?')
  } else {
    utils.appendToJSON(E, P)
  }
}

global.currentlyLoadedExample = null

exports.nextExample = () => {
  let examples = utils.getJSONWithExamples()
  let examplesLength = examples[0].length
  if (global.currentlyLoadedExample === null ||
      global.currentlyLoadedExample == examplesLength - 1 ||
      global.currentlyLoadedExample < 0) {
    global.currentlyLoadedExample = 0
  } else {
    global.currentlyLoadedExample += 1
  }
  let currentExample = examples[0][global.currentlyLoadedExample]['E']
  let correctExampleId = null
  for(let indx of Array(10).keys()){
    if(examples[indx][global.currentlyLoadedExample]['T'] == true){
      correctExampleId = indx
      break
    }
  }
  $('td').removeClass('keyed').addClass('normal-td')
  $('button','.digit-buttons').removeClass('selected-digit')
  $('td').each(function(indx){
      if(currentExample[indx] == 1){
        $(this).addClass('keyed')
      }
  })
  $(`.digit-${correctExampleId}`).addClass('selected-digit')
}

exports.deleteExample = () => {
  let examples = utils.getJSONWithExamples()
  for(let indx of Array(10).keys()){
    examples[indx].splice(global.currentlyLoadedExample, 1)
  }
  global.currentlyLoadedExample -= 1
  fs.writeFileSync('examples.json', JSON.stringify(examples))
  exports.nextExample()
}
exports.getNumber = () => {
  let tmp = $.map($('td', '.table-div'), (x) => $(x).hasClass('keyed') ? 1 : -1)
  let E = [1, ...tmp]
  for(let indx of Array(10).keys()){
    let wages = global.superWages[indx]
    let threshold = wages[0] * -1
    if (calculations.activatingFunction(E, wages, threshold) == 1){
      console.log(indx)
    }
  }
}


//Nauka
exports.learn = () => {
  let thresholds = Array(10).fill(1).map((x) => calculations.getThreshold())
  let wages = calculations.createWages(thresholds)
  let pocketWages = [...wages]
  let longestLifes = Array(10).fill(0)
  global.superWages = []
  for(let indx of Array(10).keys()){
    global.superWages.push(singlePerceptronLearn(indx, wages, thresholds, longestLifes, pocketWages))
  }
  alert('Nauczyłem się :3')
}

let singlePerceptronLearn = (perceptronIndx, wages, thresholds, longestLifes, pocketWages ) => {
  let examples = utils.getJSONWithExamples()[perceptronIndx] //tablica z wszystkimi przykladami danego perceptronu
  let currentWages = wages[perceptronIndx]
  let currentThreshold = thresholds[perceptronIndx]
  let longestLife = longestLifes[perceptronIndx]
  let currentPocketWages = pocketWages[perceptronIndx]
  let currentLifeLength = 0
  for(let draw of Array(1000)){
    let currentExample = examples[Math.floor(Math.random() * examples.length)]
    let E = [1, ...currentExample['E']] // x0 == 1
    let T = currentExample['T'] == true ? 1 : -1
    let err = calculations.anyErrors(E, currentWages, currentThreshold, T)
    if (err){
      currentLifeLength = 0
      currentWages = calculations.fixWages(E, currentWages, err)
      currentThreshold = calculations.fixThreshold(currentThreshold, err)
    } else {
      currentLifeLength += 1
      if (currentLifeLength > longestLife){
        longestLife = currentLifeLength
        currentPocketWages = currentWages
      }
    }
  }
  return currentPocketWages

}
