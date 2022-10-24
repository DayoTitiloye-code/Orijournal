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
        // console.log(data)
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
    fetch('http://localhost:3000/')
    .then(resp => resp.json())
    .then(data => {
        for(let i = 0; i < data.posts.length; i++){
            let p = document.createElement('p')
            p.textContent = data.posts[i].text
            body.append(p)
        }
        
    })
}

function sendData(e) {
    e.preventDefault()
    console.log("Pressed") 
    fetch("http://localhost:3000/community", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({text: "I finally did it", likes: 5}),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
 
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(json => console.log(json));
}

function showForm (e) {
    e.preventDefault();
    document.querySelector('#write-post').style.display = "block"
}

function hideForm (e) {
    e.preventDefault();
    document.querySelector('#write-post').style.display = "none"

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const jFormData = new FormData(e.target);

    const dataObject = Object.fromEntries(jFormData.entries());

    const outputData = document.querySelector(".output-pre");
    outputData.innerText = JSON.stringify(dataObject, null, 2); 
})
    