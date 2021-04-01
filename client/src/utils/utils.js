/**
 * Este arquivo possuem funções 
 * que são constantemente repetidas no decorrer
 * da aplicação.
 **/

import {GET_GAME,
    GET_USER,
    GET_COLECTION,
    CURRENT_USER,
    GET_GAMES,
    MY_NOTIFIES,
    ALL_REQUESTS,
    CONTACTS} from '../api/queries'

import {CREATE_NOTIFY} from '../api/mutations'   
import {useQuery,useMutation} from '@apollo/react-hooks'


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

/** Alterações nesta função foram feitas após testes, 
 * já esta funcão passou no teste, porém quebra a aplicação 
 * durante o uso normal, a função usada nos teste estará
 * comentada na versão final!
 * **/

/*
export function FindRequests(_id){
    const {data} = useQuery(ALL_REQUESTS)
    var response = ''
    if(data){
        const coll = FindCollection(_id)
                Object.values(coll).map(res =>
                    res.map(game => {
                    response =  data.allRequests.filter(item => game.id === item.required || item.selected )
        
                }) ) 
        return  response
    }

    return null

}
*/

export function FindRequests(_id){
    const {data} = useQuery(ALL_REQUESTS)
    var response = ''
        const coll = FindCollection(_id)
                Object.values(coll).map(res =>
                    res.map(game => {
                    response =  data.allRequests.filter(item => game.id === item.required || item.selected )
        
                }) ) 
        return  response

}


export function FindContact(_id){
    const {data,loading,error} = useQuery(CONTACTS,{variables: {_id} })
    return {data,loading,error}
}

export function NotifyUserRequest({receiver,content}){
    const _id = FindCurrent().id
    const [createNotify] = useMutation(CREATE_NOTIFY)
    createNotify({
        variables: {_id,receiver,content,accepted:false}
    })

    console.log("chegou aqui")
}



/*

return coll.forEach((game) => {
    return data.allRequests.filter(item => game.id === (item.required || item.selected) )
   });


*/

/**return Request.find({required:game.id}) */