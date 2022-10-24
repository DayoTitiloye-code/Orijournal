const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
app.use(cors());

let fs = require('fs');


function getData() {
    let fileName = 'data.json';
    let data = JSON.parse(fs.readFileSync(fileName).toString());
    console.log(data)
    return data
}

app.get('/', (req, res) => {
    res.send(getData())
  })

app.listen(port, () => console.log(`Now running on http://localhost:${port}`))
