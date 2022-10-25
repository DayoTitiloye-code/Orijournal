const body = document.querySelector('body');
const postButton = document.querySelector('#post-button');
const form = document.getElementById("post-form");
const cover = document.querySelector('main.inner')
postButton.addEventListener('click', showForm);

const exitButton = document.querySelector('#exit-button')
const sendButton = document.querySelector('#send-button')
const gifButton = document.querySelector('#btn-gif')
let apiKey = `NLls5Old8idRIHlgjN8gBEsyCHM6MlSH`
let search = document.querySelector('#search')
postButton.addEventListener('click', showForm)
exitButton.addEventListener('click', hideForm)
let gifChange = document.querySelector('#btn-remove')
gifChange.style.display = 'none'
gifButton.style.height ='25px'
gifButton.style.width ='100px'

gifButton.addEventListener('click', (e) =>{
    e.preventDefault()
    gifChange.style.display ='block'
    getGif()
})
form.addEventListener('submit', sendPost)

function getGif(){

    fetch(`https://api.giphy.com/v1/gifs/search?q=${search.value}&api_key=${apiKey}&rating=pg&limit=10`)
    .then((response) => response.json())
    .then((data) => {
        // console.log(data)
        let results = document.querySelector('#results')
        let result = document.querySelector('#result')
        
        data.data.forEach((obj) =>{
            console.log(obj.images.downsized.url)
            // let a = document.createElement('a')
            let img = document.createElement('img')
            img.style.width = '70px'
            img.style.height = '70px'
            let body = document.querySelector('body')
            img.src = obj.images.original.url
            img.alt =  obj.title

            // a.setAttribute('href', obj.images.downsized.url)
            // a.append(img)
            // results.append(a)
            results.append(img)
            function addGif(e){
                result.style.display ='block'
                console.log('heelo')
                e.preventDefault()
                let newImg = img
                result.append(newImg)
                results.style.display = 'none'
            }
            
            
            img.addEventListener('click', addGif)

            let remove = document.querySelector('#btn-remove')

            remove.addEventListener('click', (e) =>{
                if(result.contains(img)){
                    // 
                    result.style.display = 'none'
                    result.removeChild(img)
                    results.style.display = 'block'
                    results.append(img)
                }  
               
            })
            
        })
        
        search.value = ''
    })
}

function display() {
    fetch('/getData')
    .then(resp => resp.json())
    .then(data => {
        for(let i = 0; i < data.posts.length; i++){
            let div = document.createElement('div')
            div.id = data.posts[i].id
            let title = document.createElement('h3')
            title.textContent = data.posts[i].title
            let p = document.createElement('p')
            p.textContent = data.posts[i].text
            let gif = document.createElement('img')
            gif.src = data.posts[i].gif
            let form = document.createElement('form')
            let commentInput = document.createElement('input')
            commentInput.id = "comment"
            let send = document.createElement('input')
            send.type = 'submit'
            send.value = "Send"

            let emojiDiv = document.createElement('div')
            emojiDiv.id = "emoji-div"
            let laughEmoji = document.createElement('a')
            let laughCount = document.createElement('p')
            laughEmoji.innerHTML = '&#129315;'
            laughCount = data.posts[i].reactions.laugh
            let shockEmoji = document.createElement('a')
            let shockCount = document.createElement('p')
            shockEmoji.innerHTML = '&#128558;'
            shockCount = data.posts[i].reactions.shock
            let angryEmoji = document.createElement('a')
            let angryCount = document.createElement('p') 
            angryEmoji.innerHTML = '&#128544;'   
            angryCount = data.posts[i].reactions.angry
            laughEmoji.addEventListener('click', e => {
                addReaction(e, laughEmoji, "laugh")},{once : true})
            shockEmoji.addEventListener('click', e => {addReaction(e, shockEmoji, "shock")},{once : true}) 
            angryEmoji.addEventListener('click', e => {
                addReaction(e, angryEmoji, "angry")},{once : true})  
            emojiDiv.append(laughEmoji)
            emojiDiv.append(laughCount)
            emojiDiv.append(shockEmoji)
            emojiDiv.append(shockCount)
            emojiDiv.append(angryEmoji)
            emojiDiv.append(angryCount)

            let button = document.createElement('button')
            button.textContent = "View Comments"

            let divComments = document.createElement('div')
            divComments.style.border = "thick solid #0000FF"
            divComments.style.display = 'none'
            button.addEventListener('click', toggleComments)
            function toggleComments () {
                if(divComments.style.display === 'none'){
                    divComments.style.display = 'block'
                    button.textContent = "Hide Comments"
                } else{
                    divComments.style.display = 'none'
                    button.textContent = "View Comments"
                }
            }
            // send.addEventListener('click', addComment)
            // function addComment (e){
            //     e.preventDefault()
            //     let postComment = document.createElement('p')
            //     postComment.append(comment.value)
            //     divComments.append(postComment)
            //     comment.value = ''
            // }
            let commentNumber = document.createElement('h6');
            commentNumber.id = '#commentnumber'
            commentNumber.textContent = `${data.posts[i].comments.length} comments`

            let postDate = document.createElement('h5');
            postDate.id = '#postdate'
            postDate.textContent = `${data.posts[i].dateTime}`

            for(let j = 0; j < data.posts[i].comments.length; j++){
                let comment = document.createElement('p')
                console.log(data.posts[i].comments[j].text)
                comment.textContent = data.posts[i].comments[j].text
                divComments.append(comment)
            }

            form.append(commentInput)
            form.append(send)
            form.addEventListener('submit', e =>  sendComment(e, commentInput))
            div.append(title)
            div.append(p)
            div.append(gif)
            div.append(postDate)
            div.append(form)
            div.append(emojiDiv)
            div.append(button)
            div.append(commentNumber)
            div.append(divComments)
            cover.append(div)
        }
    })
    .catch(err => console.warn)
}

function getNow () {
    let now = new Date();
    console.log(now)
    console.log(now.toLocaleString)
    console.log(`${now.getDate()}/${now.getMonth()+1}`)
}

getNow()
display()
 
function sendPost() {
    console.log("Pressed") 
    const outputTitle = document.querySelector("#titleinput");
    const outputPost = document.querySelector("#post");
    const gif = document.querySelector("#result img");

    fetch("/community", {
        method: "POST",
        body: JSON.stringify(
            {
                title: outputTitle.value,
                text: outputPost.value, 
                comments: [],
                reactions: {
                    laugh: 0,
                    shock: 0,
                    angry: 0
                },
                gif: gif ? gif.src : "",
                dateTime: new Date
            }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.warn);

    outputTitle.value = ""
    outputPost.value = ""
    // hideForm(e)
}

function sendComment (e, comment) {
    e.preventDefault()
    console.log("Pressed")
    fetch("/community/comment", {
        method: "POST",
        body: JSON.stringify(
            {
                post: comment.parentNode.parentNode.id,
                text: comment.value, 
                dateTime: new Date()
            }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.warn);
}

// function sortByDesc (e) {
//     e.preventDefault();
//     fetch("http://localhost:3000/community/comment", {
//         dateTime.map(obj => {
//             return {...obj, date: new Date(obj.date)};
//           })
//     }
// )}

function addReaction (e, emoji, reaction) {
    e.preventDefault()    
    console.log(reaction + " clicked")
    fetch("/community/react", {
        method: "PUT",
        body: JSON.stringify({
            id: emoji.parentNode.parentNode.id,
            emoji: reaction
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.warn);
}

function showForm (e) {
    e.preventDefault();
    document.querySelector('#write-post').style.display = "block";
}

function hideForm (e) {
    e.preventDefault();
    document.querySelector('#write-post').style.display = "none"
}



