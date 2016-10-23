let sumOfMultiplications = (arr0, arr1) => {  // obliczanie sumy kolejnej wagi * kolejne wejscie
  let summed = 0
  for(let indx of Array(arr0.length).keys()){
    summed += (arr0[indx] * arr1[indx])
  }
  return summed
}

exports.activatingFunction = (inputArr, wages, threshold) => {  //funkcja aktywujaca znakowa
  // console.log(sumOfMultiplications(inputArr, wages) >= threshold ? 1 : -1)
  return (sumOfMultiplications(inputArr, wages) >= threshold ? 1 : -1)
}

exports.anyErrors = (inputArr, wages, threshold, T) => { //Obliczanie ERR
  return T - exports.activatingFunction(inputArr, wages, threshold) // 0 rzutowane jest do false
}

exports.fixWages = (inputArr, wages, err) => {
  let new_wages = []
  for(let indx of wages.keys()){
    new_wages[indx] = wages[indx] + 0.5 * err * inputArr[indx] //0.5 -- stała uczenia
  }
  return new_wages
}

exports.fixThreshold = (threshold, err) => {
  return threshold -= err * 0.5 // 0.5 -- stała uczenia
}

exports.getThreshold = () => {
  let multiplicator = Math.random() >= 0.5 ? 1 : -1
  return parseFloat(((Math.random() / 2).toFixed(2))) * multiplicator
}

let getRandomWages = function(sizeOfArray){
  return Array.from({length: sizeOfArray}, () => {
    let multiplicator = Math.random() >= 0.5 ? 1 : -1
    return parseFloat(Math.random().toFixed(2)) * multiplicator
  })
}

exports.createWages = (thresholds) => {
  let wages = []
  let tmpWages = Array(10).fill(1).map((x) => getRandomWages(42))
  for(let indx of tmpWages.keys()){
    wages.push([-1 * thresholds[indx], ...tmpWages[indx]])
  }
  return wages
}
