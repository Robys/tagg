require('dotenv').config()
const http = require('http')
const PORT = process.env.PORT
/* Apollo Server */
const {ApolloServer} = require('apollo-server-express')
const mongoose = require('mongoose') 
const {addUser,findById,findByFacebook,users} = require('./src/models/User')
const DataFormat = require('./src/config/DateFormat')

/* Passport */
const passport = require('passport') 
const {GraphQLLocalStrategy,buildContext} = require('graphql-passport')
const FacebookStrategy = require('passport-facebook')

/* Express & Session */
const express = require('express'); const app = express()
const cors = require('cors') 
const session = require('express-session')
const uuid = require('uuid').v4 

/* Body Parser */
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const resolvers = require('./src/resolvers')
const typeDefs = require('./src/typeDefs');
const DateFormat = require('./src/config/DateFormat')

const corsOptions = {
    origin: process.env.FRONT_END_URL,
    credentials:true
}

app.use(cors(corsOptions))
mongoose.connect(process.env.MONGO_DB_URL,{useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: true,useCreateIndex:false })

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
   const matchingUser = users.findById(id)
    done(null,matchingUser)
})

passport.use(
    new GraphQLLocalStrategy(async (email, password, done) => {
      const matchingUser = await users.findOne({email})
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
    const matchingUser = await findByFacebook(profile.id)
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
    addUser(newuser)
    done(null,newuser)
}

}

passport.use(new FacebookStrategy(faceBookOptions,facebookCallBack))

app.use(passport.initialize())
app.use(passport.session())


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => buildContext({ req, res, users })
})

app.get('/auth/facebook',passport.authenticate('facebook',{ scope: ['email', 'public_profile','user_location'] }))
app.get('/auth/facebook/callback',passport.authenticate('facebook',{
    successRedirect: process.env.SUCCESS_URL,
    failureRedirect: process.env.FRONT_END_URL
}))

server.applyMiddleware({app,cors: false})
const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
  })