const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json())
app.use(express.urlencoded());

let fs = require('fs');


function getData() {
    let fileName = 'data.json';
    let data = JSON.parse(fs.readFileSync(fileName).toString());
    console.log(data)
    return data
}

function saveData () {
  console.log("Testing")
}

app.use(express.static(path.join(__dirname, '../client/assets')))

app.get('/data', (req, res) => {
    res.send(getData())
  })

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/index.html')))

app.get('/community', async (req, res) => res.sendFile(path.join(__dirname, '../client/community.html')))

app.post('/community', async (req, res) => {
  saveData()
})


app.listen(port, () => console.log(`Now running on http://localhost:${port}`))
