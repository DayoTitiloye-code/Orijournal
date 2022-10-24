let apiKey = `NLls5Old8idRIHlgjN8gBEsyCHM6MlSH`
let search = document.querySelector('#search')
let form = document.querySelector('#form')

form.addEventListener('submit', (e) =>{
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
            // const url = obj.images.original.url
            // const alternative = obj.title
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
            
            // resultsHtml += `<img src='${url}' height='100px' width='100px' alt='${alternative}'></img>`
            
            // resultsHtml.addEventListener('click', (e)=>{
                
            //     results.append(resultsHtml)
            // })
        })

        // results.innerHTML = resultsHtml
        
        search.value = ''
    })
}
