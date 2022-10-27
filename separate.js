function getNow () {
    let date = new Date();
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
 
    return `${hour}:${minute} ${day}/${month}/${year}`
}

function sendPost() {

    fetch("/community", {
        method: "POST",
        body: JSON.stringify(
            {
                id: 0,
                title: "",
                text: "", 
                comments: [],
                reactions: {
                    laugh: 0,
                    shock: 0,
                    angry: 0
                },
                gif: "",
                dateTime: ""
            }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.warn);
}

function sendComment (comment) {
    console.log("Pressed")
    fetch("/community/comment", {
        method: "POST",
        body: JSON.stringify(
            {
                post: "",
                text: "", 
                dateTime: ""
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
            id: emoji,
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

module.exports = { getNow, sendComment, sendPost, addReaction }
