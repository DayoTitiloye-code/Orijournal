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
            title.id = "title"
            title.textContent = data.posts[i].title
            let p = document.createElement('p')
            p.textContent = data.posts[i].text
            let gif = document.createElement('img')
            gif.src = data.posts[i].gif
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
            
            laughEmoji.addEventListener('click', async e => {
                console.log("Client laugh emoji")
                if (!laughClicked && !shockClicked && !angryClicked){
                    let increment = parseInt(laughCount.textContent);
                    increment +=1
                    laughCount.textContent = increment 
                    console.log("Laugh")
                    await addReaction(e, laughEmoji, "laugh", true)
                    laughEmoji.className = "clicked-emoji"
                    laughClicked = true
                }
                else if (laughClicked && !shockClicked && !angryClicked){
                    let decrement = parseInt(laughCount.textContent);
                    decrement -=1
                    laughCount.textContent = decrement
                    console.log("Already Chosen")
                    await addReaction(e, laughEmoji, "laugh", false)
                    laughEmoji.classList.remove("clicked-emoji")
                    laughClicked = false
                }
                console.log(`${laughClicked} + ${shockClicked} + ${angryClicked}`)
            })
            shockEmoji.addEventListener('click', async e => {
                console.log("Client shock emoji")
                if (!laughClicked && !shockClicked && !angryClicked){
                    let increment = parseInt(shockCount.textContent);
                    increment +=1
                    shockCount.textContent = increment 
                    console.log("Shock")
                    await addReaction(e, laughEmoji, "shock", true)
                    shockEmoji.className = "clicked-emoji"
                    shockClicked = true
                }
                else if (!laughClicked && shockClicked && !angryClicked){
                    let decrement = parseInt(shockCount.textContent);
                    decrement -=1
                    shockCount.textContent = decrement
                    console.log("Already Chosen")
                    await addReaction(e, shockEmoji, "shock", false)
                    shockEmoji.className = ""
                    shockClicked = false
                }
                else{console.log("Irregular occurence")}
                console.log(`${laughClicked} + ${shockClicked} + ${angryClicked}`)
            }) 
            angryEmoji.addEventListener('click', async e => {
                console.log("Client angry emoji")
                if (!laughClicked && !shockClicked && !angryClicked){
                    let increment = parseInt(angryCount.textContent);
                    increment +=1
                    angryCount.textContent = increment 
                    console.log("Angry")
                    await addReaction(e, angryEmoji, "angry", true)
                    angryEmoji.className = "clicked-emoji"
                    angryClicked = true
                }
                else if (!laughClicked && !shockClicked && angryClicked){
                    let decrement = parseInt(angryCount.textContent);
                    decrement -=1
                    angryCount.textContent = decrement
                    console.log("Already Chosen")
                    await addReaction(e, angryEmoji, "angry", false)
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

            let mostRecent = document.createElement('button');
            mostRecent.id = '#mostrecent';
            mostRecent.textContent = "Sort by Most Recent";

            function showNewest(array) {
                for(let j = 0; j < array.length; j++){
                    let comment = document.createElement('p')
                    console.log(array.text)
                    comment.textContent = array.text
                    divComments.append(comment)
                }}

            
            mostRecent.addEventListener('click', showNewest);
            let newest = false;
            let arr = data.posts[i].comments;
            if(!newest) arr = arr.reverse()
            
            divComments.append(mostRecent)


            let commentNumber = document.createElement('h6');
            commentNumber.id = '#commentnumber'
            commentNumber.textContent = `${data.posts[i].comments.length} comments`

            let postDate = document.createElement('p');
            postDate.id = 'postdate'
            postDate.textContent = `${data.posts[i].dateTime}`


            

            for(let j = 0; j < data.posts[i].comments.length; j++){
                let comment = document.createElement('div')
                let commentText = document.createElement('p')
                let commentTime = document.createElement('p')
                commentText.textContent = data.posts[i].comments[j].text
                commentTime.textContent = data.posts[i].comments[j].dateTime
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

// function sortByDesc (e) {
//     e.preventDefault();
//     fetch("http://localhost:3000/community/comment", {
//         dateTime.map(obj => {
//             return {...obj, date: new Date(obj.date)};
//           })
//     }
// )}

function addReaction (e, emoji, reaction, isAdd) { 
    console.log("Client reacted")

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

// function showForm (e) {
//     e.preventDefault();
//     document.querySelector('#write-post').style.display = "block";
// }

function hideForm (e) {
    e.preventDefault();
    document.querySelector('#write-post').style.display = "none"
}



