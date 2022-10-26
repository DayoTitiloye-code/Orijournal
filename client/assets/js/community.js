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
            div.className = 'post-block'
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
            laughCount.textContent =  data.posts[i].reactions.laugh
            let shockEmoji = document.createElement('a')
            let shockCount = document.createElement('p')
            shockEmoji.innerHTML = '&#128558;'
            shockCount.textContent = data.posts[i].reactions.shock
            let angryEmoji = document.createElement('a')
            let angryCount = document.createElement('p') 
            angryEmoji.innerHTML = '&#128544;'   
            angryCount.textContent = data.posts[i].reactions.angry
            // function createButton (e, emoji, emojiCount, reaction) {
            //     let reset = document.createElement('button')
            //     reset.textContent = 'Change Reaction'
            //     reset.id = reaction
            //     reset.addEventListener('click', e => {
            //         laughEmoji.style.display = "block"
            //         laughCount.style.display = "block"
            //         shockEmoji.style.display = "block"
            //         shockCount.style.display = "block"
            //         angryEmoji.style.display = "block"
            //         angryCount.style.display = "block"
            //         addReaction(e, emoji, reaction, false)
            //         let decrement = parseInt(emojiCount.textContent);
            //         decrement -=1
            //         emojiCount.textContent = decrement 
            //         document.querySelector('#emoji-div button').remove()
            //     })
            //     emojiDiv.append(reset)
                
            // }
            let laughClicked = false
            let shockClicked = false
            let angryClicked = false
            
            laughEmoji.addEventListener('click', e => {
                if (!laughClicked && !shockClicked && !angryClicked){
                    let increment = parseInt(laughCount.textContent);
                    increment +=1
                    laughCount.textContent = increment 
                    console.log("Laugh")
                    addReaction(e, laughEmoji, "laugh", true)
                    laughEmoji.className = "clicked-emoji"
                    laughClicked = true
                }
                else if (laughClicked && !shockClicked && !angryClicked){
                    let decrement = parseInt(laughCount.textContent);
                    decrement -=1
                    laughCount.textContent = decrement
                    console.log("Already Chosen")
                    addReaction(e, laughEmoji, "laugh", false)
                    laughEmoji.classList.remove("clicked-emoji")
                    laughClicked = false
                }
                console.log(`${laughClicked} + ${shockClicked} + ${angryClicked}`)
                // shockEmoji.style.display = "none"
                // shockCount.style.display = "none"
                // angryEmoji.style.display = "none"
                // angryCount.style.display = "none"
                // createButton(e, laughEmoji, laughCount, "laugh")
            })
            shockEmoji.addEventListener('click', e => {
                if (!laughClicked && !shockClicked && !angryClicked){
                    let increment = parseInt(shockCount.textContent);
                    increment +=1
                    shockCount.textContent = increment 
                    console.log("Shock")
                    addReaction(e, laughEmoji, "shock", true)
                    shockEmoji.className = "clicked-emoji"
                    shockClicked = true
                }
                else if (!laughClicked && shockClicked && !angryClicked){
                    let decrement = parseInt(shockCount.textContent);
                    decrement -=1
                    shockCount.textContent = decrement
                    console.log("Already Chosen")
                    addReaction(e, shockEmoji, "shock", false)
                    shockEmoji.className = ""
                    shockClicked = false
                }
                console.log(`${laughClicked} + ${shockClicked} + ${angryClicked}`)
                // laughEmoji.style.display = "none"
                // laughCount.style.display = "none"
                // angryEmoji.style.display = "none"
                // angryCount.style.display = "none"
                // createButton(e, shockEmoji, shockCount, "shock")
            }) 
            angryEmoji.addEventListener('click', e => {
                if (!laughClicked && !shockClicked && !angryClicked){
                    let increment = parseInt(angryCount.textContent);
                    increment +=1
                    angryCount.textContent = increment 
                    console.log("Angry")
                    addReaction(e, angryEmoji, "angry", true)
                    angryEmoji.className = "clicked-emoji"
                    angryClicked = true
                }
                else if (!laughClicked && !shockClicked && angryClicked){
                    let decrement = parseInt(angryCount.textContent);
                    decrement -=1
                    angryCount.textContent = decrement
                    console.log("Already Chosen")
                    addReaction(e, angryEmoji, "laugh", false)
                    angryEmoji.className = ""
                    angryClicked = false
                }
                console.log(`${laughClicked} + ${shockClicked} + ${angryClicked}`)
                // shockEmoji.style.display = "none"
                // shockCount.style.display = "none"
                // laughEmoji.style.display = "none"
                // laughCount.style.display = "none"
                // createButton(e, angryEmoji, angryCount, "angry")
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
                let comment = document.createElement('div')
                let commentText = document.createElement('p')
                let commentTime = document.createElement('p')
                commentText.textContent = data.posts[i].comments[j].text
                commentTime.textContent = data.posts[i].comments[j].dateTime
                comment.append(commentText)
                comment.append(commentTime)
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
    let date = new Date();
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
 
    return `${hour}:${minute} ${day}/${month}/${year}`
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
                dateTime: getNow()
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

function addReaction (e, emoji, reaction, isAdd) { 
    console.log(reaction + " clicked")

    fetch("/community/react", {
        method: "PUT",
        body: JSON.stringify({
            id: emoji.parentNode.parentNode.id,
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

// function removeReaction (e, emoji, reaction) {
//     fetch("/community/changereact", {
//         method: "PUT",
//         body: JSON.stringify({
//             id: emoji.parentNode.parentNode.id,
//             emoji: reaction
//         }),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//     })
//     .then(response => response.json())
//     .then(json => console.log(json))
//     .catch(err => console.warn);
// }

function showForm (e) {
    e.preventDefault();
    document.querySelector('#write-post').style.display = "block";
}

function hideForm (e) {
    e.preventDefault();
    document.querySelector('#write-post').style.display = "none"
}



