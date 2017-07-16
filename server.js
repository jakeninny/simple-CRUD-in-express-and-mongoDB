const express = require('express');
const app = express();

console.log(app);

app.listen(3000, function(){
  console.log('listening on 3000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})
