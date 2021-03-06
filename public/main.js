
var update = document.querySelector('#update');
var del = document.querySelector('#delete');

update.addEventListener('click', function (e) {
  //send PUT request
  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Darth Vader',
      'quote': 'I find your lack of faith disturbing.'
    })
  }).then( res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })
});


del.addEventListener('click', function (e) {
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Darth Vader',
      'name': ''
    })
  })
  .then( res => {
    if (res.ok) return res.json()
  })
  .then( data => {
    console.log(data);
    window.location.reload(true);
  })
});
