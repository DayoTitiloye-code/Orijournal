
const fs = require('fs');
const path = require('path');
const request = require("supertest")
global.fetch = require('jest-fetch-mock');
let { app, getData, saveData, addComment, reaction } = require('./app')

describe('API server', () => {
    let api
    let testCat = {
        "name": "Bob",
        "age": 6
    }

    beforeAll(() => {
        // start the server and store it in the api variable
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    })

    afterAll(done => { // `done` always gets passed in but if we want to use it, we must name it!
        // close the server, then run done
        console.log('Gracefully stopping test server')
        api.close(done) // `done` will be invoked when the `api.close` function is complete
    })

    
    describe('getData', () => {
        test('it exists', () => {
            expect(getData).toBeDefined()
        })

        test('it responds to get /getData with status 200', done => {
            request(api)
            .get('/getData')
            .expect(200, done)
        })

        test('it provides data in a JSON format', done => {
            request(api) 
            .get('/getData')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done)
        })

    })

    describe('index page', () => {
        test('it responds to get / with status 200', done => {
            request(api)
            .get('/')
            .expect(200, done)
        })
    })

    describe('community page', () => {
        test('it responds to get /community with status 200', done => {
            request(api)
            .get('/community')
            .expect(200, done)
        })
    })

    describe('about page', () => {
        test('it responds to get /about with status 200', done => {
            request(api)
            .get('/about')
            .expect(200, done)
        })
    })

    describe('add reaction', () => {
        test('it exists', () => {
            expect(reaction).toBeDefined()
        })

        const testReaction = {
            id: 1,
            emoji: 'laugh',
            type: true
        }
        
        test('correct reaction given', () => {
            expect(reaction(testReaction)).toEqual('laugh added to post')
        })
    })

    describe('add comments', () => {
        test('it exists', () => {
            expect(addComment).toBeDefined()
        })
    })

    describe('create post', () => {
        const testPost = {
            id: 0,
            title: "Test",
            text: "Test Text", 
            comments: [],
            reactions: {
                laugh: 0,
                shock: 0,
                angry: 0
            },
            gif: "",
            dateTime: ""
        }

        test('it exists', () => {
            expect(saveData).toBeDefined()
        })
        // test('it adds a post with status 201', done => {
        //     request(api)
        //     .post('/community')
        //     .send(testPost)
        //     .set('Content-Type', 'application/json; charset=utf-8')
        //     .expect(201, done)
        // })

        
        // test('it adds a post with status 201', async done => {
        //     try {
        //         await request(api).post('/community').send(testPost)
        //         expect(201, done);
        //         done()
        //     } catch (err) {
        //         console.log(`Error ${err}`)
        //         done()
        //     }
        // })
        
    })

    // describe('emoji reactions', () => {
    //     const testReact = {
    //         id: 1,
    //         emoji: 'laugh',
    //         type: true
    //     }
    //     test('it adds a reaction with status 201', done => {
    //         request(api)
    //         .put('/community/react')
    //         .send(testReact)
    //         .set('Content-Type', 'application/json; charset=utf-8')
    //         .expect(200, done)
    //     })
    // })
})
