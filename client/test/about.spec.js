const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './about.html'), 'utf8');

describe('about.html', () =>{
    beforeEach(()=>{
        document.documentElement.innerHTML = html.toString()
    })
    test('it has descriptive paragraphs', () =>{
        let paragraph = document.querySelector('p')
        expect(paragraph).toBeDefined()
    })
    test('it has a pingu gif', () =>{
        let img = document.querySelector('img')
        expect(img).toBeDefined()
    })
    test('it has a title', () =>{
        let title = document.querySelector('h1')
        expect(title.textContent).toBe("about us.")
    })
    test('it has a main', () =>{
        let main = document.querySelector('main')
        expect(main).toBeDefined()
    })
    test('it has a div wrapping everything', () =>{
        let wholeDiv = document.querySelector('.cover-container')
        expect(wholeDiv).toBeDefined()
    })
    test('it has smaller div\'s', () =>{
        let div = document.querySelector('#testimony')
        expect(div).toBeDefined()
    })
})
