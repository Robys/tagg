require('dotenv').config()
const path = require('path')
/* Apollo Server */
const {ApolloServer} = require('apollo-server-express')
const mongoose = require('mongoose') 
const {GETBYFACEBOOK,GETUSERBYID,ADDUSER,GETUSERBYEMAIL,USER} = require('./server/Models/User')
const DateFormat = require('./server/config/DateFormat')

/* Passport */
const passport = require('passport') 
const {GraphQLLocalStrategy,buildContext} = require('graphql-passport')
const FacebookStrategy = require('passport-facebook')

/* Express & Session */
const express = require('express'); const app = express()
const session = require('express-session')
const uuid = require('uuid').v4 

const resolvers = require('./server/config/resolvers')
const typeDefs = require('./server/config/typeDefs');

mongoose.connect(process.env.MONGO_DB_URL,{useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false,useCreateIndex:true })


app.use(session({
    secret: process.env.SESSION_SECRET,
    genid: (req) => uuid(),
    resave:false,
    saveUninitialized:false
}))

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser(async (id,done)=>{
   const matchingUser = GETUSERBYID(id)
    done(null,matchingUser)
})

passport.use(
    new GraphQLLocalStrategy(async (email, password, done) => {
      const matchingUser = await GETUSERBYEMAIL(email)
      const error = matchingUser ? null : new Error("usuário não encontrado");
      await done(error, matchingUser);
    })
  );

const faceBookOptions = {
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'email', 'name','picture.type(large)','location'],
}
const facebookCallBack = async  (accessToken,refreshToken,profile,done)=>{
    const matchingUser = await GETBYFACEBOOK(profile.id)
    if(matchingUser){
        done(null,matchingUser)
        return
    }
    else{
    const today = DateFormat()
    const newuser = {
        id:uuid(),
        roles:'USER',
        facebookId:profile.id,
        firstName:profile.name.givenName,
        lastName: profile.name.familyName,
        location: profile._json.location.name,
        email: profile.emails && profile.emails[0] && profile.emails[0].value,
        picture:profile.photos ? profile.photos[0].value : '/img/faces/unknown-user-pic.jpg',
        createdAt:today
        
    }
    ADDUSER(newuser)
    done(null,newuser)
}

}

passport.use(new FacebookStrategy(faceBookOptions,facebookCallBack))

app.use(passport.initialize())
app.use(passport.session())


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => buildContext({ req, res, USER }),
    introspection:true,
    playground:true,
})

app.get('/auth/facebook',passport.authenticate('facebook',{ scope: ['email', 'public_profile','user_location'] }))
app.get('/auth/facebook/callback',passport.authenticate('facebook',{
    successRedirect: process.env.SUCCESS_URL,
    failureRedirect: process.env.FRONT_END_URL
}))

server.applyMiddleware({app,cors: true})

app.use(express.static(path.join(__dirname, './build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'))
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`🚀 Server ready`)
  })