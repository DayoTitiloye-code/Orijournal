/** @jest-environment jsdom */
const { getNow, sendComment, sendPost, addReaction } = require('./separate');
global.fetch = require('jest-fetch-mock');

describe('community.js functions', () => {

    test('getNow returns date as a string', () => {
        expect(getNow() === getNow.toString())
    })

    describe ('Comments', () => {
        test('it exists', () => {
            expect(sendComment).toBeDefined()
        })

        test('it creates a POST request using fetch', () => {
            sendComment("")
            expect(fetch).toHaveBeenCalled()
        })
    })

    describe ('Reactions', () => {
        const testReact = JSON.stringify({
            id: 1,
            emoji: 'laugh',
            type: true
        })

        test('it exists', () => {
            expect(addReaction).toBeDefined()
        })

        test('it creates a PUT request using fetch', () => {
            addReaction(testReact)
            expect(fetch).toHaveBeenCalled()
        })
    })

    describe('Posts', () => {


        test('it exists', () => {
            expect(sendPost).toBeDefined()
        })

        test('it creates a POST request using fetch', () => {
            sendPost()
            expect(fetch).toHaveBeenCalled()
        })


    })
})
