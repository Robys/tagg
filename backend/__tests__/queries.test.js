const app = require('../server')
const supertest = require('supertest')
const {getUsers} = require('../src/models/User')
const {getGames} = require('../src/models/Game')

const request = supertest(app)

afterAll(async () => {
    await getUsers()
    await getGames()

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