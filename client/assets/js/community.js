const body = document.querySelector('body');
const postButton = document.querySelector('#post-button')
const form = document.getElementById("post-form")

postButton.addEventListener('click', showForm)

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

function showForm (e) {
    e.preventDefault();
    document.querySelector('#write-post').style.display = "block"
}

function hideForm (e) {
    
}



display()
