const body = document.querySelector('body');
const postButton = document.querySelector('#post-button');
const form = document.getElementById("post-form");
const cover = document.querySelector('main.inner')
// postButton.addEventListener('click', showForm);

const exitButton = document.querySelector('#exit-button')
const sendButton = document.querySelector('#send-button')
const gifButton = document.querySelector('#btn-gif')
let apiKey = `NLls5Old8idRIHlgjN8gBEsyCHM6MlSH`
let search = document.querySelector('#search')

// postButton.addEventListener('click', showForm)
// exitButton.addEventListener('click', hideForm)
let gifChange = document.querySelector('#btn-remove')
gifChange.style.display = 'none'


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
        let results = document.querySelector('#results')
        let result = document.querySelector('#result')
        
        data.data.forEach((obj) =>{
            console.log(obj.images.downsized.url)
            let img = document.createElement('img')
            img.style.width = '70px'
            img.style.height = '70px'
            let body = document.querySelector('body')
            img.src = obj.images.original.url
            img.alt =  obj.title

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
                e.preventDefault()
                console.log("Pressed")
                if(result.contains(img)){
                    result.style.display = 'none'
                    result.removeChild(img)
                    results.style.display = 'flex'
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
        let posts = data.posts.reverse()
        for(let i = 0; i < posts.length; i++){
            let div = document.createElement('div')
            div.id = posts[i].id
            div.className = 'post-block'
            let title = document.createElement('h3')
            title.id = "title"
            title.textContent = posts[i].title
            let p = document.createElement('p')
            p.textContent = posts[i].text
            let gif = document.createElement('img')
            gif.src = posts[i].gif
            let interact1 = document.createElement('div')
            interact1.id = "interact"
            let interact2 = document.createElement('div')
            interact2.id = "interact2"
            let form = document.createElement('form')
            let commentInput = document.createElement('input')
            commentInput.id = "comment"
            commentInput.placeholder = "Add a comment..."
            let send = document.createElement('input')
            send.type = 'submit'
            send.value = "Comment"

            let emojiDiv = document.createElement('div')
            emojiDiv.id = "emoji-div"
            let laughEmoji = document.createElement('a')
            let laughCount = document.createElement('p')
            laughEmoji.innerHTML = '&#129315;'
            laughCount.textContent =  posts[i].reactions.laugh
            let shockEmoji = document.createElement('a')
            let shockCount = document.createElement('p')
            shockEmoji.innerHTML = '&#128558;'
            shockCount.textContent = posts[i].reactions.shock
            let angryEmoji = document.createElement('a')
            let angryCount = document.createElement('p') 
            angryEmoji.innerHTML = '&#128544;'   
            angryCount.textContent = posts[i].reactions.angry

            let laughClicked = false
            let shockClicked = false
            let angryClicked = false
            
            laughEmoji.addEventListener('click', e => {
                console.log("Client laugh emoji")
                if (!laughClicked && !shockClicked && !angryClicked){
                    let increment = parseInt(laughCount.textContent);
                    increment +=1
                    laughCount.textContent = increment 
                    console.log("Laugh")
                    addReaction(laughEmoji, "laugh", true)
                    laughEmoji.className = "clicked-emoji"
                    laughClicked = true
                }
                else if (laughClicked && !shockClicked && !angryClicked){
                    let decrement = parseInt(laughCount.textContent);
                    decrement -=1
                    laughCount.textContent = decrement
                    console.log("Already Chosen")
                    addReaction(laughEmoji, "laugh", false)
                    laughEmoji.classList.remove("clicked-emoji")
                    laughClicked = false
                }
                console.log(`${laughClicked} + ${shockClicked} + ${angryClicked}`)
            })
            shockEmoji.addEventListener('click', e => {
                console.log("Client shock emoji")
                if (!laughClicked && !shockClicked && !angryClicked){
                    let increment = parseInt(shockCount.textContent);
                    increment +=1
                    shockCount.textContent = increment 
                    console.log("Shock")
                    addReaction(shockEmoji, "shock", true)
                    shockEmoji.className = "clicked-emoji"
                    shockClicked = true
                }
                else if (!laughClicked && shockClicked && !angryClicked){
                    let decrement = parseInt(shockCount.textContent);
                    decrement -=1
                    shockCount.textContent = decrement
                    console.log("Already Chosen")
                    addReaction(shockEmoji, "shock", false)
                    shockEmoji.className = ""
                    shockClicked = false
                }
                else{console.log("Irregular occurence")}
                console.log(`${laughClicked} + ${shockClicked} + ${angryClicked}`)
            }) 
            angryEmoji.addEventListener('click', e => {
                console.log("Client angry emoji")
                if (!laughClicked && !shockClicked && !angryClicked){
                    let increment = parseInt(angryCount.textContent);
                    increment +=1
                    angryCount.textContent = increment 
                    console.log("Angry")
                    addReaction(angryEmoji, "angry", true)
                    angryEmoji.className = "clicked-emoji"
                    angryClicked = true
                }
                else if (!laughClicked && !shockClicked && angryClicked){
                    let decrement = parseInt(angryCount.textContent);
                    decrement -=1
                    angryCount.textContent = decrement
                    console.log("Already Chosen")
                    addReaction(angryEmoji, "angry", false)
                    angryEmoji.className = ""
                    angryClicked = false
                }
                else{console.log("Irregular occurence")}
                console.log(`${laughClicked} + ${shockClicked} + ${angryClicked}`)
            })  
            emojiDiv.append(laughEmoji)
            emojiDiv.append(laughCount)
            emojiDiv.append(shockEmoji)
            emojiDiv.append(shockCount)
            emojiDiv.append(angryEmoji)
            emojiDiv.append(angryCount)

            let button = document.createElement('button')
            button.textContent = "View Comments"

            let divComments = document.createElement('div')
            divComments.style.display = 'none'
            button.addEventListener('click', toggleComments)
            function toggleComments () {
                if(divComments.style.display === 'none'){
                    divComments.style.display = 'block'
                    divComments.style.marginTop = '10px'
                    button.textContent = "Hide Comments"
                } else{
                    divComments.style.display = 'none'
                    button.textContent = "View Comments"
                }
            }


            let commentNumber = document.createElement('h6');
            commentNumber.id = '#commentnumber'
            commentNumber.textContent = `${posts[i].comments.length} comments`

            let postDate = document.createElement('p');
            postDate.id = 'postdate'
            postDate.textContent = `${posts[i].dateTime}`


            
            let commentsArray = posts[i].comments.reverse()
            for(let j = 0; j < commentsArray.length; j++){
                let comment = document.createElement('div')
                let commentText = document.createElement('p')
                let commentTime = document.createElement('p')
                commentText.textContent = commentsArray[j].text
                commentTime.textContent = commentsArray[j].dateTime
                comment.append(commentTime)
                comment.append(commentText)
                divComments.append(comment)
            }


            form.append(commentInput)
            form.append(send)
            form.addEventListener('submit', e =>  sendComment(e, commentInput))
            interact1.append(form)
            interact1.append(emojiDiv)
            interact2.append(button)
            interact2.append(commentNumber)
            console.log(interact1)
            div.append(postDate)
            div.append(title)
            div.append(p)
            div.append(gif)
            div.append(interact1)
            div.append(interact2)
            div.append(divComments)
            console.log(div)
            cover.append(div)
        }
    })
    .catch(err => console.warn)
}

function getNow () {
    let date = new Date();
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
 
    return `${hour.toString()}:${minute.toString()} ${day.toString()}/${month.toString()}/${year.toString()}`
}

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
                id: 0,
                title: outputTitle.value,
                text: outputPost.value, 
                comments: [],
                reactions: {
                    laugh: 0,
                    shock: 0,
                    angry: 0
                },
                gif: gif ? gif.src : "",
                dateTime: getNow()
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
}

function sendComment (e, comment) {
    e.preventDefault()
    console.log("Pressed")
    fetch("/community/comment", {
        method: "POST",
        body: JSON.stringify(
            {
                post: comment.parentNode.parentNode.parentNode.id,
                text: comment.value, 
                dateTime: getNow()
            }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.warn);
    comment.textContent = ''
    document.location.reload()
}

function addReaction (emoji, reaction, isAdd) { 
    fetch("/community/react", {
        method: "PUT",
        body: JSON.stringify({
            id: emoji.parentNode.parentNode.parentNode.id,
            emoji: reaction,
            type: isAdd
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.warn);
}

window.onbeforeunload = function(event)
    {
        event.preventDefault()
        alert("Refresh called")
    };

