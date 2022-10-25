const fs = require('fs');
const path = require('path');
const { describe } = require('yargs');
const html = fs.readFileSync(path.resolve(__dirname, '../community.html'), 'utf8');

describe('community.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    describe('head', () => {
        test('it has a title', () => {
            const head = document.querySelector('head')
            expect(head).toBeTruthy();
            expect(head.textContent).toContain('Community Page');
        }); 
    })

    })
    describe("body", () => {
        test("'x' button closes form when pressed", () => {
            let btn = document.querySelector("exit-button");
            expect(btn).toBeTruthy();
        })

    })
