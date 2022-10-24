const body = document.querySelector('body');

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

display()
