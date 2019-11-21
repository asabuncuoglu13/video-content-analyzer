const express = require('express')
const app = express();
const port = 8000

app.use(express.static('public'));

app.get('/public', (req, res) =>  res.sendFile(__dirname + '/index.html'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))