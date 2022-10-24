const body = document.querySelector('body');
const postButton = document.querySelector('#post-button');
const form = document.getElementById("post-form");

postButton.addEventListener('click', showForm);

const exitButton = document.querySelector('#exit-button')
const sendButton = document.querySelector('#send-button')
const testButton = document.querySelector('#test-send')
postButton.addEventListener('click', showForm)
exitButton.addEventListener('click', hideForm)
testButton.addEventListener('click', sendData)

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
    const url = "http://localhost:3000/results"
    const options = {
    method: 'POST',
    body: JSON.stringify({text: "Awesome Blog Post", likes: 5})
    }
    fetch(url, options)
    .then(console.log("Posted post"))
    .catch(err => console.warn('Opa, something went wrong!', err))  
}

function showForm (e) {
    e.preventDefault();
    document.querySelector('#write-post').style.display = "block"
}

function hideForm (e) {
    
}



display()

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const jFormData = new FormData(e.target);

    const dataObject = Object.fromEntries(jFormData.entries());

    const outputData = document.querySelector(".output-pre");
    outputData.innerText = JSON.stringify(dataObject, null, 2); 
})
    

e.preventDefault();
    document.querySelector('#write-post').style.display = "none"


display()
