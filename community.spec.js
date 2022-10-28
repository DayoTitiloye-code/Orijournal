/** @jest-environment jsdom */
const fs = require('fs');
const { type } = require('os');
const path = require('path');
const html = fs.readFileSync(path.resolve("./community.html"), 'utf8');
describe('community.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })
    describe('head', () => {
        test('it has a title', () => {
            const head = document.querySelector('title')
            expect(head).toBeTruthy();
            expect(head.textContent).toContain('Community Page');
        }); 
    })

    describe('body', () => {
        test('it has a class of home', () => {
            const body = document.querySelector('body')
            expect(body).toBeTruthy();
            expect(body.className).toEqual('home')
        })
    })

    describe('header', () => {
        test('it has a class of masthead', () => {
            const header = document.querySelector('header')
            expect(header).toBeTruthy();
            expect(header.className).toContain('masthead')
        })
    })

    describe('nav home', () => {
        test('it has a value of home', () => {
            const navHome = document.querySelector('.inner nav :nth-of-type(1)')
            expect(navHome).toBeTruthy();
            expect(navHome.textContent).toContain('home');
        })
    })

    describe('nav community', () => {
        test('it has a value of community', () => {
            const navComm = document.querySelector('.inner nav :nth-of-type(2)')
            expect(navComm).toBeTruthy();
            expect(navComm.textContent).toContain('community')
        })
    })

    describe('nav about', () => {
        test('it has a value of about', () => {
            const navAb = document.querySelector('.inner nav :nth-of-type(3)')
            expect(navAb).toBeTruthy();
            expect(navAb.textContent).toContain('about')
        })
    })

    describe('main class of inner', () => {
        test('main has a class of inner', () => {
            const main = document.querySelector('main')
            expect(main).toBeTruthy();
            expect(main.className).toContain('inner')
        })
    })
    
})