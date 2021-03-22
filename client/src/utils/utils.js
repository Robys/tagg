import {GET_GAME,
    GET_USER,
    GET_COLECTION,
    CURRENT_USER,
    GET_GAMES,
    MY_NOTIFIES,
    ALL_REQUESTS,
    CHAT} from '../api/queries'
import {useQuery} from '@apollo/react-hooks'


export const publishers = [
    {name:"Other"},
    {name:"2k games"},
    {name:"Activision Blizzard"},
    {name:"Bandai Namco"},
    {name:"Bethesda"},
    {name:"Capcom"},
    {name:"CD Projekt"},
    {name:"Electronic Arts"},
    {name:"Epic Games"},
    {name:"FromSoftware"},
    {name:"Microsoft"},
    {name:"Nintendo"},
    {name:"Rockstar Games"},
    {name:"SNK Corporation"},
    {name:"Sony"},
    {name:"Square Enix"},
    {name:"Ubisoft"},
    {name:"Valve"}, 
]

export function FindGame (_id){
    const {data,loading,error} = useQuery(GET_GAME,{variables: {_id} })
    if(error) return error
    if(loading) return loading
    if(data) return data.game
}

export function FindUser (_id){
    const {data,loading,error} = useQuery(GET_USER,{variables: {_id} })
    if(error) return error
    if(loading) return loading
    if(data) return data.user
}


export function FindCollection (_id){
    const {data,loading,error} = useQuery(GET_COLECTION, { variables:{ _id} })

    if(error) return error
    if(loading) return loading

    const array = Object.values(data)

    return array
}

export function FindCurrent (){
    const {data,loading,error} = useQuery(CURRENT_USER)

    if(error) return error
    if(loading) return loading

    return data.me
    
}

export function FindGames() {
    const {data,loading,error} = useQuery(GET_GAMES)
    if(error) return error
    if(loading) return loading
    return Object.values(data)  
}

export function FindNotifies(){
    const current = FindCurrent()
    const {data,loading,error} = useQuery(MY_NOTIFIES,{variables:{_id:current.id}})
    return {data,loading,error} 
    
}

export function FindRequests(_id){
    const {data} = useQuery(ALL_REQUESTS)
    var response = ''
    const coll = FindCollection(_id)
    Object.values(coll).map(res => res.map(game => {
        response =  data.allRequests.filter(item => game.id === item.required || item.selected )

    } ) )

    return  response
    
    
}

export function FindChat(_id){
    const {data,loading,error} = useQuery(CHAT,{variables: {_id} })
    return {data,loading,error}
}



/*

return coll.forEach((game) => {
    return data.allRequests.filter(item => game.id === (item.required || item.selected) )
   });


*/

/**return Request.find({required:game.id}) */