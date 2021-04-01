const app = require('../server')
const supertest = require('supertest')
const {getUsers} = require('../src/models/User')
const {getGames} = require('../src/models/Game')
const Notify = require('../src/models/Notify')
const Request = require('../src/models/Request')

const request = supertest(app)

afterAll(async () => {
    await getUsers()
    await getGames()
    await Notify.find()
    await Request.find()
})

test("fetch users", async (done) =>{
    request.post("/graphql")
    .send({
        query :"{users {id,firstName,lastName,email,picture}}"
    })
    .set("accepted","application/json")
    .expect('Content-Type',/json/)
    .expect(200)
    .end((err,res)=>{
        if(err) return done(err)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toMatchSnapshot()
        done()

    })
})

test("fetch games", async (done) =>{
    request.post("/graphql")
    .send({
        query :"{games {id,title,owner}}"
    })
    .set("accepted","application/json")
    .expect('Content-Type',/json/)
    .expect(200)
    .end((err,res)=>{
        if(err) return done(err)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toMatchSnapshot()
        done()

    })
})

/** Este teste está retornando o objeto **/
test("fetch a game", async (done) =>{
    request.post("/graphql")
    .send({
        query :`{game {id,title,owner}}`
    })
    .send({_id:"605f6d417d1c8c19247d8375"})
    .set("accepted","application/json")
    .expect('Content-Type',/json/)
    .expect(200)
    .end((err,res)=>{
        if(err) return done(err)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toMatchSnapshot()
        done()

    })
})

test("fetch notifies", async (done) =>{
    request.post("/graphql")
    .send({
        query :`{notifies(_id:"605f6cf77d1c8c19247d8374") {id,from,content}}`
    })
    .set("accepted","application/json")
    .expect('Content-Type',/json/)
    .expect(200)
    .end((err,res)=>{
        if(err) return done(err)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toMatchSnapshot()
        done()

    })
})

test("fetch requests", async (done) =>{
    request.post("/graphql")
    .send({
        query :`{allRequests {id,
            required,
            selected,
            madeBy,
            accepted,
            createdAt}}`
    })
    .set("accepted","application/json")
    .expect('Content-Type',/json/)
    .expect(200)
    .end((err,res)=>{
        if(err) return done(err)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toMatchSnapshot()
        done()

    })
})