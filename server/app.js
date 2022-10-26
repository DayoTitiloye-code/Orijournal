const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');
const port = process.env.PORT || 3000;
const serverless = require('serverless-http')
const router = express.Router()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

let fs = require('fs');

function getData() {
    let fileName = 'data.json';
    let data = JSON.parse(fs.readFileSync(fileName).toString());
    return data
}

function saveData (data) {
  let fileName = 'data.json';
  let m = JSON.parse(fs.readFileSync(fileName).toString());
  data.id = m.posts.length+1
  m.posts.push(data)
  fs.writeFileSync(fileName, JSON.stringify(m));
}

function addComment (data) {
  console.log(data)
  let fileName = 'data.json';
  let m = JSON.parse(fs.readFileSync(fileName).toString());
  let index = m.posts.findIndex(obj => obj.id == data.post)
  m.posts[index].comments.push(data)
  fs.writeFileSync(fileName, JSON.stringify(m));
}

function addReaction (data) {
  console.log(data.emoji)
  let fileName = 'data.json';
  let m = JSON.parse(fs.readFileSync(fileName).toString());
  let index = m.posts.findIndex(obj => obj.id == data.id)
  m.posts[index].reactions[data.emoji] ++
  fs.writeFileSync(fileName, JSON.stringify(m));
}

router.use(express.static(path.join(__dirname, '../client/assets')))

router.get('/getData', (req, res) => {
    res.send(getData())
  })

router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/index.html')))

router.get('/community', async (req, res) => res.sendFile(path.join(__dirname, '../client/community.html')))

router.post('/community', async (req, res) => {
  saveData(req.body)
})

router.post('/community/comment', async (req, res) => {
  addComment(req.body)
})

router.put('/community/react', async (req, res) => {
  addReaction(req.body)
})

app.listen(port, () => console.log(`Now running on http://localhost:${port}`))
module.exports.handler = serverless(app)
