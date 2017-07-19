console.log('js working');
var update = document.querySelector('#update');

update.addEventListener('click', function (e) {
  //send PUT request
  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Darth Vader',
      'quote': 'I find your lack of faith disturbing.'
    })
  })
});
