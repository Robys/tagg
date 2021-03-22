import {compareTwoStrings} from 'string-similarity'

export const filterUser = (data,keyword) =>{
  const user = data.users.filter(user => {
        var byFirst = compareTwoStrings(user.firstName,keyword)
        if(byFirst >= .52){
            return user
        }

        var byLast = compareTwoStrings(user.lastName,keyword)
        if(byLast >= .52){
            return user
        }

        var byEmail = compareTwoStrings(user.email,keyword)
        if(byEmail >= .52){
            return user
        }

        var byRole = compareTwoStrings(user.roles,keyword)
        if(byRole >= .52){
            return user
        }
    else return null
    
})

    return user


}

export const FilterRequests = (data,keyword) =>{
   const response = data.allRequests.filter(item => {
       if(item.id === keyword){
           return item
       }

   })

   return response
}

export const FilterGames = (data,keyword) =>{
    let response = ''
    Object.values(data).map(itens => {
       response = itens.filter(games => {
           const sim = compareTwoStrings(games.title,keyword)
           if(sim > .25){
               return games
           }
       })
    })

    return response
}