const {gql} = require('apollo-server-express')
const typeDefs = gql`

enum Role{
    ADMIN
    USER
    MENAGER
}

type Subscription{
    notifyAdded:Notify
    newGameAdded:Game
}

type User{
    id:ID!
    roles: Role
    firstName:String!
    lastName:String!
    email:String!
    password:String!
    picture:String!
    location: String
    createdAt:String

}

type Request{
    id:ID!
    madeBy: String
    selected:String
    required: String
    accepted: Boolean
    createdAt: String
}

type Notify{
    id:ID!
    madeBy: String
    from:String
    receiver: String
    content: String
    accepted:Boolean
    published: String
}

type Game{
    id:ID!
    owner: String
    title:String!
    publisher:String
    platform:String
    value:String
    description:String
    location: String
    status:String
    cover:File
    createdAt:String
}

type File{
    filename: String!
    path: String!
}

type AuthPayload{
    user:User
}

type Chat{
    id:ID!
    from: String
    receiver: String
}

type Message{
    id:ID!
    chatId:String
    from:String
    receiver:String
    content:String
    createdAt:String
}

type Metrics{
    users:String
    createdAt:String
    games:String
    platform:String
    location:String
}

type Query{
    me:User
    users:[User]
    user(_id:ID):User
    colection(_id:ID):[Game] 
    games:[Game]
    game(_id:ID):Game
    notifies(_id:ID):[Notify]
    allRequests:[Request]
    chats(_id:ID): [Chat]
    messages (_id:ID): [Message]
    metrics(keyword:String):[Metrics]
}

type Mutation{
    logout: Boolean
    login(email:String!,password:String!): AuthPayload
    signup(firstName:String!,lastName:String!,email:String!,location: String,picture:Upload,password:String!,roles:Role):AuthPayload
    updateUser(_id:ID,firstName:String,lastName:String,email:String,password:String ,location: String,picture:Upload):AuthPayload
    promoteUser(_id:ID!,roles:String):AuthPayload
    createMenager(_id:ID):AuthPayload
    deleteUser(_id:ID!):AuthPayload
    
    addGame(owner:String,title:String!,publisher:String,platform:String,status:String,location:String,value:String,description:String,cover:Upload):Game!
    deleteGame(_id:ID!):Game
    updateGame(_id:ID!,title:String,platform:String,status:String,location:String,value:String,description:String,cover:Upload):Game

    createNotify (_id:ID,receiver:String,content:String,accepted:Boolean): Notify
    deleteNotify (_id:ID): Notify
    updateNotify (_id:ID):Notify

    createRequest (_id:ID,selected:String,required:String) : Request
    deleteRequest (_id:ID) : Request
    updateRequest (_id:ID,from:String,receiver:String,accepted:Boolean) : Request

    createChat (from:String, receiver:String) : Chat
    deleteChat (_id:ID):Chat

    createMessage (chatId:ID!,from:String,receiver:String,content:String): Message
    deleteMessage (_id:ID!): Message

}
`

module.exports = typeDefs
