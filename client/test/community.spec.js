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
        const testPost = JSON.stringify(
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
            })

        test('it exists', () => {
            expect(sendPost).toBeDefined()
        })

        test('it creates a POST request using fetch', () => {
            sendPost()
            expect(fetch).toHaveBeenCalled()
        })


    })
})
