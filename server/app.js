const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

let fs = require('fs');

function getData() {
    let fileName = 'data.json';
    let data = JSON.parse(fs.readFileSync(fileName).toString());
    return data
}

function getPostsCount() {
  let fileName = 'data.json';
  let data = JSON.parse(fs.readFileSync(fileName).toString());
  return data.posts.length
}

app.get('https://orijournal.herokuapp.com/getData', (req, res) => {
    res.send(getData())
  })

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.get('/community', async (req, res) => res.sendFile(path.join(__dirname, '../client/community.html')))

app.get('/about', async (req, res) => res.sendFile(path.join(__dirname, '/about.html')))

app.post('https://orijournal.herokuapp.com/community', async (req, res) => {
    data = req.body
    let fileName = 'data.json';
    let file = JSON.parse(fs.readFileSync(fileName).toString());
    data.id = file.posts.length+1
    file.posts.push(data)
    fs.writeFileSync(fileName, JSON.stringify(file));
    res.send(data)
})

app.get('/style.css', async (req, res) => res.sendFile(path.join(__dirname, '/style.css')))

app.get('/about.css', async (req, res) => res.sendFile(path.join(__dirname, '/about.css')))

app.get('/community.css', async (req, res) => res.sendFile(path.join(__dirname, '/community.css')))

app.get('/community.js', async (req, res) => res.sendFile(path.join(__dirname, '/community.js')))

app.get('/favicon', async (req, res) => res.sendFile(path.join(__dirname, '/chat-quote.svg')))

app.post('https://orijournal.herokuapp.com/community/comment', async (req, res) => {
  data = req.body
  let fileName = 'data.json';
  let file = JSON.parse(fs.readFileSync(fileName).toString());
  let index = file.posts.findIndex(obj => obj.id == data.post)
  file.posts[index].comments.push(data)
  fs.writeFileSync(fileName, JSON.stringify(file));
  res.send(data)
})

app.put('https://orijournal.herokuapp.com/community/react', async (req, res) => {
  let log
  let data = req.body
  let fileName = 'data.json';
  let file = JSON.parse(fs.readFileSync(fileName).toString());
  let index = file.posts.findIndex(obj => obj.id == data.id)
  if(data.type){ 
    file.posts[index].reactions[data.emoji] ++; 
    log = `${data.emoji} added to post`
  } else{
    file.posts[index].reactions[data.emoji] --; 
    log = `${data.emoji} removed from post`
  }
  fs.writeFileSync(fileName, JSON.stringify(file));
  res.send(log)
})


app.listen(port, () => console.log(`Now running on http://localhost:${port}`))

module.exports = { app, getData, getPostsCount }
