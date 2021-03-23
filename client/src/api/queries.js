import {gql} from '@apollo/client'

export const CURRENT_USER = gql` query CurrrentUser{
    me{
        id
        roles
        firstName
        lastName
        email
        picture
        location
        createdAt
    }

}`

export const GET_USER = gql` query GetUser($_id:ID){
    user(_id:$_id){
        id
        roles
        firstName
        lastName
        email
        picture
        location
        createdAt
    }

}`

export const MY_NOTIFIES = gql`query Notifies($_id:ID){
    notifies(_id:$_id){
        id
        from
        receiver
        content
        accepted
    }
}` 

export const GET_USERS = gql ` query GetUsers {
    users{
        id
        roles
        firstName
        lastName
        email
        location
        createdAt
    }
        
}`

export const GET_GAMES = gql` query GetGames{
    games{
        id
        title
        owner
        location
        status
        value
        publisher
        platform
        description
        cover{
            filename
            path
        }

        
    }
}`

export const GET_GAME = gql` query GetGame($_id:ID){
    game(_id:$_id){
        id
        title
        owner
        location
        status
        value
        publisher
        platform
        description
        cover{
            filename
            path
        }

        
    }
    
}`

export const GET_COLECTION = gql` query GetColection($_id:ID){
    colection(_id:$_id){
        id
        title
        owner
        location
        status
        value
        publisher
        platform
        description
        cover{
            filename
            path
        }

        
    }
}`


export const ALL_REQUESTS = gql `query AllRequests{
    allRequests{

         id
        madeBy
        selected
        required
        createdAt
        accepted
    }
    
}`
export const REQUESTS = gql `query Requests{
    requests{
         id
        madeBy
        selected
        required
        createdAt
        accepted
    }
    
}`

export const CHAT = gql` query Chats($_id:ID){
   chats(_id:$_id){
    id
    receiver
    from
   }
}` 

export const MESSAGES = gql` query Messages($_id:ID){
    messages(_id:$_id){
        id
        from
        receiver
        content
    }
}`

export const GET_METRICS = gql` query Metrics($keyword:String){
    metrics(keyword:$keyword){
        createdAt
        users
        games
        platform
        location
        value
        title
        requests
    }
}`
