var {gql} = require('apollo-server-express')

const typeDefs = gql`

    enum Role{
    ADMIN #administrador
    USER #usuário comum
    MANAGER #gerente
    }

    type User{
    id:ID!
    roles: Role
    active:Boolean
    firstName:String!
    lastName:String!
    email:String!
    password:String!
    picture:String!
    location: String
    createdAt:String
    gamecollection:[Game]
    contacts:[User]
    }

    type Game{
    id:ID!
    owner:User
    title:String
    gender:String
    platform:String
    value:String
    description:String
    status:String
    cover:String
    createdAt:String
    }

    type Request{
        id:ID!
        status:String,
        createdAt:String
        envolved:[User]
        selected:Game
        requested:Game
    }

    type Suggestion{
        id:ID
        title:String
    }

    type Notification{
        id:ID!
        readed:Boolean
        content:String
        sender:User
        receiver:User
        createdAt:String
    }

    type Message{
        id:ID!
        readed:Boolean
        content:String
        sender:User
        receiver:User
        createdAt:String
    }

    type AuthPayload{
    #retorno de autenticação, porém possui n funções
    user:User
    }

    input GameSearchInput{
        title:String
        gender:String
        platform:String
    }

    type Metrics{
    # montante de informações 
    users:String
    activeUsers:String
    createdAt:String
    games:String
    platform:String
    location:String
    value:String
    title:String
    requests:String
    }

    type Report{
        id:ID!
        sender:User
        content:String
        done:Boolean
        createdAt:String
    }

    
    type Query{
    # retorna o usuário que está logado
    me: User
    # retorna um usuário
    user(_id:ID!):User
    # retorna uma lista de usuários
    users: [User!]!
    # retorna uma lista de jogos
    games: [Game!]!
    # retorna um jogo usando o id como argumento
    game(_id:ID):Game
    #retorna resultados de busca por games usando uma palavra chave
    gameSearch(input:GameSearchInput):[Game]
    # retorna sugestões de titulos para adição dos jogos
    suggestions:[Suggestion!]!
    # retorna notificações 
    notifications(_id:ID):[Notification!]!
    #retorna um array com toda a conversa entre dois usuários
    chat(sender:ID!,receiver:ID!):[Message]
    #retorna as requisições de troca de um usuário
    requests(_id:ID!):[Request]
    #retorna todas as requisições
    allRequests:[Request]
    # retorna valores a serem inseridos nos gráficos de métricas 
    metrics(keyword:String):[Metrics]
    # retorna reports feitos pelos usuários aos adm's ou gerentes
    reports:[Report]

    }
    
    type Mutation{

    logout: Boolean
    login(email:String!,password:String!): AuthPayload
    #criação de usuário
    signup(firstName:String!,lastName:String!,email:String!,
    location:String,picture:String,password:String!,roles:Role):User
    #atualizar usuário
    updateUser(_id:ID,firstName:String,lastName:String,
    email:String,password:String ,location: String,picture:String):AuthPayload
    #promover usuário
    promoteUser(_id:ID!,roles:Role):User
    #promove ao nível de gerencia
    createMenager(_id:ID):AuthPayload
    #excluí usuário
    deleteUser(_id:ID!):AuthPayload

    #desativa/reativa a conta do usuário
    changeAccountStatus(_id:ID!,active:Boolean):User

    #adição do jogo 
    createGame(owner:String!,title:String,platform:String,value:String,
    description:String,gender:String,cover:String,status:String): Game
    #edição do jogo 
    updateGame(_id:ID!,title:String,platform:String,value:String,
    description:String,gender:String,cover:String,status:String): Game
    #remoção do jogo
    deleteGame(_id:ID):Game

    #adiciona sugestão de titulo para jogos vindos do usuários
    createSuggestion(title:String):Suggestion
    removeSuggestion(title:String):Suggestion

    #adiciona outro usuário a lista de contatos
    addToContactList(_id:ID!, userToAdd:ID!) : User
    #remove usuário da lista de contatos
    removeToContactList(_id:ID!, userToRemove:ID!) : User

    #envia uma notificação para um outro usuário
    createNotification(sender:ID!, receiver:ID!,content:String) : Notification
    #remove notificações
    removeNotification(_id:ID!) : Notification
    #atualiza o status de lido da notificação
    updateNotification(_id:ID!) : Notification
    
    #envia mensagem de um usuário para outro
    sendMessage(sender:ID!,receiver:ID!,content:String) : Message

    #cria uma requisição de troca de games
    createRequest(selected:ID!,requested:ID!):Request
    #atualiza status da troca
    updateRequest(_id:ID!,status:String):Request
    #remove uma troca
    deleteRequest(_id:ID!):Request

    #envia o report aos responsáveis pelo app
    sendReport(sender:ID!,content:String):Report
    #remove report da base de dados
    deleteReport(_id:ID!):Report
    #atualiza e envia a resposta do report
    updateReport(report:ID!):Report

    }
`

module.exports = typeDefs