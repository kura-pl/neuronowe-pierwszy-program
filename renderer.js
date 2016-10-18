// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// funkcja generujaca przyciski
var createButtons = () => {
  $('.table-div').append('<table />')
  for (tr_ind of Array(10).keys()){
    _tr = $('<tr/>').appendTo('table')
    for (td_ind of Array(10).keys()) {
      _tr.append(`<td id="tr-${tr_ind}-td-${td_ind}" class="my-td"> </td>`)
    }
  }
}


$(() => {
  // $('button').on('click', (e) => {
  //   alert('wobwob')
  // })
  var pressed = false
  createButtons()
  $('body').on('mousedown', (e) => {
    pressed = true
  })
  $('body').on('mouseup', (e) => {
    pressed = false
  })
  $('td').on('click', (e) => {
    let clickedTd = $(e.target)
    if(clickedTd.hasClass('my-td'))
      clickedTd.removeClass('my-td').addClass('keyed')
    else {
      clickedTd.removeClass('keyed').addClass('my-td')
    }
  })
  $('td').on('mouseenter', (e) => {
    let clickedTd = $(e.target)
    if(pressed){
      if(clickedTd.hasClass('my-td'))
        clickedTd.removeClass('my-td').addClass('keyed')
      else {
        clickedTd.removeClass('keyed').addClass('my-td')
      }
    }
  })
})
