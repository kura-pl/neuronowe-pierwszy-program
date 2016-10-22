utils = require('./utils')

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
  if (global.currentlyLoadedExample === null || global.currentlyLoadedExample == examplesLength - 1 || global.currentlyLoadedExample < 0) {
    global.currentlyLoadedExample = 0
  } else {
    global.currentlyLoadedExample += 1
  }
  let currentExaple = examples[0][global.currentlyLoadedExample]['E']
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
      if(currentExaple[indx] == 1){
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

exports.learn = () => {
  let wages = Array(10).fill(1).map( (x) => utils.getRandomWages(36))
  let pocketWages = [...wages]
  let threshold = parseFloat(((Math.random() / 2).toFixed(2)))
  let longesLives = Array(10).fill(0)
}
