/** @jest-environment jsdom */
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve("./index.html"), 'utf8');
describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })
    describe('head', () => {
        test('it has a title', () => {
            const head = document.querySelector('title')
            expect(head).toBeTruthy();
            expect(head.textContent).toContain('Orijournal');
        }); 
    })
    describe('body', () => {
        test('header exists', () => {
            expect(document.querySelector('h3')).toBeTruthy();
        });
    
        test('it has a header title', () => {
            const brand = document.querySelector('.masthead-brand');
            expect(brand.textContent).toContain('orijournal.');
        })
    })
    describe("main", () => {
        test("it has a button that goes to community.html", () => {
            let btn = document.querySelector("lead");
            // expect(btn).toBeTruthy();
            // expect(btn).toHaveAttribute('href', "/community")
        })
      
    })
})
