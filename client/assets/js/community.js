const body = document.querySelector('body');
const postButton = document.querySelector('#post-button');
const form = document.getElementById("post-form");

postButton.addEventListener('click', showForm);

const exitButton = document.querySelector('#exit-button')
const sendButton = document.querySelector('#send-button')
const testButton = document.querySelector('#test-send')
const gifButton = document.querySelector('#btn-gif')
let apiKey = `NLls5Old8idRIHlgjN8gBEsyCHM6MlSH`
let search = document.querySelector('#search')
postButton.addEventListener('click', showForm)
exitButton.addEventListener('click', hideForm)
testButton.addEventListener('click', sendData)
gifButton.addEventListener('click', (e) =>{
    e.preventDefault()
    getGif()
})

function getGif(){

    fetch(`https://api.giphy.com/v1/gifs/search?q=${search.value}&api_key=${apiKey}&rating=pg&limit=10`)
    .then((response) => response.json())
    .then((data) => {
        let results = document.querySelector('#results')
        let result = document.querySelector('#result')
        
        data.data.forEach((obj) =>{
            console.log(obj.images.downsized.url)
            let a = document.createElement('a')
            let img = document.createElement('img')
            img.style.width = '70px'
            img.style.height = '70px'
            let body = document.querySelector('body')
            img.src = obj.images.original.url
            img.alt =  obj.title

            a.setAttribute('href', obj.images.downsized.url)
            a.append(img)
            results.append(a)
            a.addEventListener('click', (e) =>{
                e.preventDefault()
                result.append(a)
                results.style.visibility = 'hidden'
            })

        })
        
        search.value = ''
    })
}

function display() {
    fetch('http://localhost:3000/getData')
    .then(resp => resp.json())
    .then(data => {
        for(let i = 0; i < data.posts.length; i++){
            let div = document.createElement('div')
            let title = document.createElement('h3')
            title.textContent = data.posts[i].title
            let p = document.createElement('p')
            p.textContent = data.posts[i].text
            let gif = document.createElement('img')
            gif.src = data.posts[i].gif
            let button = document.createElement('button')
            button.textContent = "Show Comments"
            div.append(title)
            div.append(p)
            div.append(gif)
            div.append(button)
            body.append(div)
        }
    })
}

function sendData(e) {
    e.preventDefault()
    console.log("Pressed") 
    fetch("http://localhost:3000/community", {
        method: "POST",
        body: JSON.stringify(
            {
                title: "Title",
                text: "I finally did it", 
                comments: [],
                reactions: {
                    laugh: 0,
                    sad: 0,
                    angry: 0
                },
                gif: "https://example.com",
                dateTime: "Feb 29"
            }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => console.log(json));
    }

function showForm (e) {
    e.preventDefault();
    document.querySelector('#write-post').style.display = "block";
}

function hideForm (e) {
    e.preventDefault();
    document.querySelector('#write-post').style.display = "none"
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const outputTitle = document.querySelector("#titleinput");
    // console.log(outputTitle.value);

    const outputPost = document.querySelector("#inputPost");


    
})
    
