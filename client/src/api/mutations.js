import {gql} from '@apollo/client'



export const LOGIN = gql ` mutation Login($email:String!,$password:String!){
    login(email:$email,password:$password){
        user{
            id
            firstName
        }
    }
}`

export const SIGNUP = gql` mutation Signup ($firstName:String!,$lastName:String!,$email:String!,$picture:Upload,$location:String,$password:String!){
    signup(firstName:$firstName,lastName:$lastName,email:$email,picture:$picture,location:$location,password:$password){
        user{
            id
            firstName
        }
    }
} `

export const LOGOUT = gql` mutation Logout {
    logout
}`

export const DELETE_USER = gql` mutation DeleteUser($_id:ID!) {
    deleteUser(_id:$_id){
        user{
            id
            firstName
        }
    }
}`
export const DELETE_GAME = gql` mutation DeleteGame($_id:ID!) {
    deleteGame(_id:$_id){
            id
            title
    }
}`

export const UPDATE_USER = gql` mutation UpdateUser ($_id:ID,$firstName:String,$lastName:String,$email:String,$picture:Upload,$location:String,$password:String){
    updateUser(_id:$_id,firstName:$firstName,lastName:$lastName,email:$email,picture:$picture,location:$location,password:$password){
        user{
            id
            firstName
            lastName
            email
            location
            picture
        }
    }
} `
export const ADD_GAME = gql` mutation AddGame($owner:String,$title:String!,$publisher:String,$platform:String,$status:String,$value:String,$description:String,$cover:Upload){
    addGame(owner:$owner,title:$title,publisher:$publisher,platform:$platform,status:$status,value:$value,description:$description,cover:$cover){
        id
        owner
        title
    }
}`

export const UPDATE_GAME = gql` mutation UpdateGame($_id:ID,$title:String,$publisher:String,$platform:String,$status:String,$value:String,$description:String,$cover:Upload){
    updateGame(_id:$_id,title:$title,publisher:$publisher,platform:$platform,status:$status,value:$value,description:$description,cover:$cover){
        id
        title
    }
}`

export const CREATE_NOTIFY = gql` mutation CreateNotify($_id:ID,$receiver:String,$content:String,$accepted:Boolean){
    createNotify(_id:$_id,receiver:$receiver,content:$content,accepted:$accepted){
        id
        from
        receiver
        content
        accepted
    }
}
`

export const DELETE_NOTIFY = gql` mutation DeleteNotify($_id:ID){
    deleteNotify(_id:$_id){
        id
        receiver
    }
}`
export const UPDATE_NOTIFY = gql` mutation UpdateNotify($_id:ID){
    updateNotify(_id:$_id){
        id
        receiver
    }
}`

export const CREATE_REQUEST = gql` mutation CreateRequest($_id:ID,$selected:String,$required:String){
    createRequest(_id:$_id,selected:$selected,required:$required){
        id
        createdAt
    }
}`
export const UPDATE_REQUEST = gql` mutation UpdateRequest($_id:ID,$accepted:Boolean,$receiver:String,$from:String){
    updateRequest(_id:$_id,accepted:$accepted,receiver:$receiver,from:$from){
        id
        madeBy
        selected
        required
        createdAt
        accepted
    }
}`

export const CREATE_CHAT = gql` mutation CreateChat($from:String,$receiver:String){
    createChat(from:$from, receiver:$receiver){
        id
        from
        receiver
    }
}`

export const CREATE_MESSAGE = gql` mutation CreateMessage($chatId:ID!,$from:String,$receiver:String,$content:String){
    createMessage(chatId:$chatId,from:$from,receiver:$receiver,content:$content){
        id
    }
}`
export const PROMOTE_USER = gql `mutation PromoteUser($_id:ID!,$roles:String){
    promoteUser(_id:$_id,roles:$roles){
        user{
            id
            firstName
        }
    }
}`
