
const fs = require('fs');
const path = require('path');
const request = require("supertest")
global.fetch = require('jest-fetch-mock');
let { app, getData, getPostsCount } = require('./app')

describe('API server', () => {
    let api

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
        // test('it exists', () => {
        //     expect(reaction).toBeDefined()
        // })

        const testAddReaction = {
            id: 1,
            emoji: 'laugh',
            type: true
        }
        const testRemoveReaction = {
            id: 1,
            emoji: 'laugh',
            type: false
        }

        test('reaction', done => {
            request(api)
            .put('/community/react')
            .send(testAddReaction)
            .set('Content-Type', 'application/json; charset=utf-8')
            .expect(200, 'laugh added to post', done);

        })
           
        // test('correct reaction given', () => {
        //     expect(reaction(testAddReaction)).toEqual('laugh added to post')
        // })

        // test('correct reaction given', () => {
        //     expect(reaction(testRemoveReaction)).toEqual('laugh removed from post')
        // })

    })

    describe('add comments', () => {

        test('add comment', (done) => {
            const comment = JSON.stringify(
            {
                post: 1,
                text: "Test text", 
                dateTime: ""
            })
            request(api)
            .post('/community/comment')
            .send(comment)
            .set('Content-Type', 'application/json; charset=utf-8')
            .expect(200, {
                post: 1,
                text: "Test text", 
                dateTime: ""
              }, done);
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

        test('it creates a post', done => {
            request(api)
            .post('/community')
            .send(JSON.stringify(testPost))
            .set('Content-Type', 'application/json; charset=utf-8')
            .expect(200, {
                id: getPostsCount()+1,
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
            }, done);
        })
        
    })

})
