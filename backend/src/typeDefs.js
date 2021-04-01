const {gql} = require('apollo-server-express')
const typeDefs = gql`

enum Role{
    ADMIN #administrador
    USER #usuário comum
    MENAGER #gerente
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
    #pedidos de troca
    id:ID!
    madeBy: String # quem fez o pedido
    selected:String # o id do jogo selecionado
    required: String # o id do jogo requisitado
    accepted: Boolean  # se foi aceita ou não
    createdAt: String  # data de criação
}

type Notify{
    #notificações são bem semelhantes as mensagens
    #porém são em sua maioria enviadas pelo sistema
    id:ID! 
    madeBy: String
    from:String
    receiver: String
    content: String
    accepted:Boolean
    published: String # data de criação/pulicação
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
    #arquivo que pode ser enviado, fotos no caso
    filename: String!
    path: String!
}

type AuthPayload{
    #retorno de autenticação, porém possui n funções
    user:User
}

type Contact{
    #contato entre um usuário e outro, ou um chat
    id:ID!
    from: String
    receiver: String
}

type Message{
    # mensagens são enviadas entre as pessoas do contato/chat
    # não podendo ser vistas por mais ninguém 
    id:ID!
    chatId:String
    from:String
    receiver:String
    content:String
    createdAt:String
}

type Metrics{
    # montante de informações 
    users:String
    createdAt:String
    games:String
    platform:String
    location:String
    value:String
    title:String
    requests:String
}

type Query{
    me:User #retorna o usuário q está logado
    users:[User] #retorna todos os usuários
    user(_id:ID):User #retorna um usuário específico
    colection(_id:ID):[Game] # retorna todos os jogos rel a um usuário
    games:[Game] # retorna todos os jogos
    game(_id:ID):Game # retorna um jogo específico
    notifies(_id:ID):[Notify] # notificações de um usuário
    allRequests:[Request] # todos os pedidos
    contacts(_id:ID): [Contact] # contatos relacionados ao usuário
    messages (_id:ID): [Message] # mensagens a partir do id do contato/chat
    metrics(keyword:String):[Metrics] #metricas
}

type Mutation{
    logout: Boolean
    login(email:String!,password:String!): AuthPayload
    #criação de usuário
    signup(firstName:String!,lastName:String!,email:String!,location: String,picture:Upload,password:String!,roles:Role):AuthPayload
    #atualizar usuário
    updateUser(_id:ID,firstName:String,lastName:String,email:String,password:String ,location: String,picture:Upload):AuthPayload
    #promover usuário
    promoteUser(_id:ID!,roles:String):AuthPayload
    #promove ao nível de gerencia
    createMenager(_id:ID):AuthPayload
    #excluí usuário
    deleteUser(_id:ID!):AuthPayload
    
    addGame(owner:String,title:String!,publisher:String,platform:String,status:String,location:String,value:String,description:String,cover:Upload):Game!
    updateGame(_id:ID,title:String,platform:String,status:String,location:String,value:String,description:String,cover:Upload):Game
    deleteGame(_id:ID!):Game

    createNotify (_id:ID,receiver:String,content:String,accepted:Boolean): Notify
    deleteNotify (_id:ID): Notify
    updateNotify (_id:ID):Notify

    createRequest (_id:ID,selected:String,required:String) : Request
    deleteRequest (_id:ID) : Request
    updateRequest (_id:ID,from:String,receiver:String,accepted:Boolean) : Request

    createContact (from:String, receiver:String) : Contact
    deleteContact (_id:ID):Contact

    createMessage (chatId:ID!,from:String,receiver:String,content:String): Message
    deleteMessage (_id:ID!): Message

    #um usuário pode notificar o ADM ou genrente sobre algo
    appReport (from:String,content:String):Notify
    #from = quem envia, content = reclamação em si 

}
`

module.exports = typeDefs
