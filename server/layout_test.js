const fs = require('fs');
const path = require('path');
// const { describe } = require('yargs');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    describe('head', () => {
        test('it has a title', () => {
            const head = document.querySelector('head')
            expect(head).toBeTruthy();
            expect(head.textContent).toContain('Orijournal');
        }); 
    })

    describe('body', () => {
        test('header exists', () => {
            expect(document.querySelector('h3')).toBeTruthy();
        });
    
        test('it has a header title', () => {
            let header = document.querySelector('#masthead-brand');
            expect(header.textContent).toContain('orijournal.');
        })
    })
    describe("main", () => {
        test("it has a button that goes to community.html", () => {
            let btn = document.querySelector("p");
            expect(btn).toBeTruthy();
        })

    })
})
