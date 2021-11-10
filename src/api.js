import axios from "axios"

export const CURRENTUSER = async () =>{

    return await axios.post(process.env.REACT_APP_API_URL,{
        query:`query {
            me{
                id
                roles
                active
                firstName
                lastName
                email
                location
                createdAt
                picture
                gamecollection{
                    id
                    title
                    gender
                    platform
                    status
                    value
                    description
                    createdAt
                    cover

                }
                contacts{
                    id
                    active
                    firstName
                    lastName
                    email
                    location
                    picture
                }

            }
        }`,
        
        headers: {
            "Content-Type": 'application/json'
        } 
    })
    .then(res => res.data.data.me)
    .catch(err => err)
    
}

export const ADDGAME = async (id,title,price,videogame,description,
    gender,status,cover) =>{

        return await axios.post(process.env.REACT_APP_API_URL,{
            query:`mutation{
                createGame(owner:"${id}",title:"${title}",value:"${price}",
                platform:"${videogame}",description:"${description}",
                gender:"${gender}",status:"${status}",cover:"${cover}"){
                    id
                    title
                    status
                }
            }`,
            headers: {
              "Content-Type": 'application/json'
            } 
        })
        
    }

export const SIGNUP = async (firstName,lastName,email,
    password,picture,local) =>{
    return axios.post(process.env.REACT_APP_API_URL,{
        query:`mutation{
            signup(firstName:"${firstName}",lastName:"${lastName}",
            email:"${email}",password:"${password}",
            picture:"${picture}",location:"${local}"){
               
                    firstName
                    email
                
            }
        }`
    }).then(res => res.data.data)
    .catch(err => err)
}

export const DELETEUSER = async (_id)=>{
    return await axios.post(process.env.REACT_APP_API_URL,{
        query:`mutation {
            deleteUser(_id:"${_id}"){
                user{
                id
                roles
                active
                firstName
                lastName
                email
                location
                createdAt
                picture
            }
            }
        }`,
        
        headers: {
            "Content-Type": 'application/json'
        } 

    }).then(res => res).catch(err => err)
}

export const GETUSERS = async () =>{
    return await axios.post(process.env.REACT_APP_API_URL,{
        query:`query {
            users{
                id
                roles
                active
                firstName
                lastName
                email
                location
                createdAt
                picture
                gamecollection{
                    id
                    title
                    gender
                    platform
                    status
                    value
                    description
                    createdAt
                    cover

                }
                contacts{
                    id
                    active
                    firstName
                    lastName
                    email
                    location
                    picture
                }

            }
        }`,
        
        headers: {
            "Content-Type": 'application/json'
        } 

    }).then(res => res).catch(err => err)
}

export const GETUSERBYID = async (_id) =>{

    const result = await axios.post(process.env.REACT_APP_API_URL,{
        query:`query {
            user(_id:"${_id}"){
                id
                active
                firstName
                lastName
                email
                location
                createdAt
                picture
                gamecollection{
                    id
                    title
                    gender
                    platform
                    status
                    value
                    description
                    createdAt
                    cover

                }
                contacts{
                    id
                    active
                    firstName
                    lastName
                    email
                    location
                    picture
                }

            }
        }`,
        
        headers: {
            "Content-Type": 'application/json'
        } 
    })
    .then(res => res)
    .catch(err => err)

    return result.data.data.user
}

export const CHANGEACCOUNTSTATUS = async (user,status)=>{
    if(user !== undefined){
        console.log(status)
        const result = await axios.post(process.env.REACT_APP_API_URL,{
            query:`mutation {
                changeAccountStatus(_id:"${user.id}",acount:${status}){
                    list{
                        id
                        firstName
                    }
                }
            }`,
            
            headers: {
                "Content-Type": 'application/json'
            } 
        })
        .then(res => res)
        .catch(err => err)
    
        return result

    }
}

export const UPDATEUSER = async (user,nameToSave,lastNameToSave,
    emailToSave,passwordToSave,localToSave,pictureToSave) =>{

        if(user!==undefined){
            const response = await axios.post(process.env.REACT_APP_API_URL,{
                query:`mutation {
                    updateUser(_id:"${user.id}",firstName:"${nameToSave}",
                    lastName:"${lastNameToSave}",email:"${emailToSave}",
                    password:${passwordToSave},location:"${localToSave}",
                    picture:${pictureToSave}){
                            id
                            firstName
                    }
                }`,
                
                headers: {
                    "Content-Type": 'application/json'
                } 
            }).then(res => res).catch(err => err)

            return response
        }

}

export const ADDTOCONTACTSLIST = async (currentUser,userToAdd) =>{

    const result = await axios.post(process.env.REACT_APP_API_URL,{
        query:`mutation {
            addToContactList(_id:"${currentUser}",userToAdd:"${userToAdd}"){
                    id
                    firstName
            }
        }`,
        
        headers: {
            "Content-Type": 'application/json'
        } 
    })
    .then(res => res)
    .catch(err => err)

    return result.data
}

export const CONTACTS = async (_id) =>{

    const result = await axios.post(process.env.REACT_APP_API_URL,{
        query:`query {
            contacts(_id:"${_id}"){
                list{
                    id
                    firstName
                }
            }
        }`,
        
        headers: {
            "Content-Type": 'application/json'
        } 
    })
    .then(res => res)
    .catch(err => err)

    return result.data.data
}

export const REMOVETOCONTACTLIST = async (currentUser,userToRemove) =>{
    //console.log(currentUser,userToRemove)

    return await axios.post(process.env.REACT_APP_API_URL,{
        query:`mutation {
            removeToContactList(_id:"${currentUser}",userToRemove:"${userToRemove}"){
                    id
                    firstName
            }
        }`,
        
        headers: {
            "Content-Type": 'application/json'
        } 
    })
    .then(res => res.data)
    .catch(err => err)
    
}

export const GETGAMES = async () =>{
    const response = await axios.post(process.env.REACT_APP_API_URL,{
        query:`query{
            games{
                id
                title
                gender
                platform
                status
                value
                description
                createdAt
                cover
            }
        }`,        
        headers: {
            "Content-Type": 'application/json'
        } 


    })

    return response.data.data.games
}
export const GETGAME = async (_id) =>{
    const response = await axios.post(process.env.REACT_APP_API_URL,{
        query:`query{
            game(_id:"${_id}"){
                id
                title
                gender
                platform
                status
                value
                description
                createdAt
                cover
                owner{
                    id
                    firstName
                    lastName
                    email
                    picture
                }

            }
        }`,        
        headers: {
            "Content-Type": 'application/json'
        } 


    })

    return response.data.data.game
}

export const DELETEGAME = async (_id) =>{

    if(_id!==undefined){
        const response = await axios.post(process.env.REACT_APP_API_URL,{
            query:`mutation{
                deleteGame(_id:"${_id}"){
                    id
                    title
                }
            }`,
            headers: {
                "Content-Type": 'application/json'
            } 
        })

        return response
    }

}
export const UPDATEGAME = async ({game,upTitle,upGender,upValue,upVideogame,
    upStatus,upCover,upDescription}) =>{

    if(game.id!==undefined){
        
        const response = await axios.post(process.env.REACT_APP_API_URL,{
            query:`mutation{
                updateGame(_id:"${game.id}",
                title:"${upTitle}",
                gender:"${upGender}",
                value:"${upValue}",
                platform:"${upVideogame}",
                status:"${upStatus}",
                description:"${upDescription}",
                cover:"${upCover}"){
                    id
                    title
                    gender
                    value
                    cover
                    description
                }
            }`,
            headers: {
                "Content-Type": 'application/json'
            } 
        }).then(res => res)
        .catch(err => err)

        return response
    }

}

export const GETSUGGESTIONS = async () =>{

    const response = await axios.post(process.env.REACT_APP_API_URL,{
        query:`query{
            suggestions{
                title
            }
        }`,
        headers: {
         "Content-Type": 'application/json'
     }
    }).then(res => res)
    .catch(err => err)
    return response.data.data.suggestions
}

export const CREATESUGGESTION = async (title) =>{

    const response = await axios.post(process.env.REACT_APP_API_URL,{
        query:`mutation{
            createSuggestion(title:"${title}"){
                title
            }
        }`,
        headers: {
         "Content-Type": 'application/json'
     }
    }).then(res => res)
    .catch(err => err)

    return response.data.data.suggestion
}


export const GETNOTIFICATIONS = async (_id) =>{

    const response = await axios.post(process.env.REACT_APP_API_URL,{
        query:`query{
            notifications(_id:"${_id}"){
                id
                content
                createdAt
                readed
                sender{
                    id
                    firstName
                    lastName
                    picture
                }
            }
        }`,
        headers: {
            "Content-Type": 'application/json'
        }

    }).then(res => res)
    .catch(err => err)
    return response.data.data
}

export const CREATENOTIFICATION = async (currentUser,owner,notificationContent)=>{
    const sender = currentUser.id
    const receiver = owner.id
    const content = notificationContent
    
    const response = await axios.post(process.env.REACT_APP_API_URL,{
        query:`mutation{
            createNotification(sender:"${sender}",receiver:"${receiver}",content:"${content}"){
                id
                content
            }
        }`,
        headers: {
            "Content-Type": 'application/json'
        }
    }).then(res => res)
    .catch(err => err)
    
    console.log(response)
    return response

}
export const UPDATENOTIFICATION = async (_id)=>{
    if(_id!==null){

        const response = await axios.post(process.env.REACT_APP_API_URL,{
            query:`mutation{
                updateNotification(_id:"${_id}"){
                    id
                    content
                }
            }`,
            headers: {
             "Content-Type": 'application/json'
         }
        }).then(res => res)
        .catch(err => err)
    
        return response
    }

}

export const REMOVENOTIFICATION = async (notification) =>{
    
    if(notification!==null){
        const response = await axios.post(process.env.REACT_APP_API_URL,{
            query:`mutation{
                removeNotification(_id:"${notification.id}"){
                    id
                    content
                }
            }`,
            headers: {
             "Content-Type": 'application/json'
         }
        }).then(res => res)
        .catch(err => err)
    
        return response
    }

    
}


export const SENDMESSAGE = async (sender,receiver,content) =>{
    const response = await axios.post(process.env.REACT_APP_API_URL,{
        query:`mutation{
            sendMessage(sender:"${sender.id}",receiver:"${receiver.id}",content:"${content}"){
                id
                sender{
                    firstName
                    lastName
                }
                receiver{
                    firstName
                    lastName
                }
                content
                readed
                createdAt
            }
        }`,
        headers: {
            "Content-Type": 'application/json'
        }

    }).then(res => res)
    .catch(err => err)

    return response
}

export const CHAT = async (sender,receiver) =>{

    if(sender !== undefined && receiver !== undefined ){
        
            const response = await axios.post(process.env.REACT_APP_API_URL,{
                query:`query{
                    chat(sender:"${sender.id}",receiver:"${receiver.id}"){
                        id
                        sender{
                            picture
                            firstName
                            lastName
                        }
                        receiver{
                            picture
                            firstName
                            lastName
                        }
                        content
                        readed
                        createdAt
                    }
                }`,
                headers: {
                    "Content-Type": 'application/json'
                }
        
            }).then(res => res)
            .catch(err => err)
        
            return response.data.data.chat
    }
    else return null
}

export const CREATEREQUEST = async (selected,requested) =>{
    if(selected !== null && requested !== null ){
        
        const response = await axios.post(process.env.REACT_APP_API_URL,{
            query:`mutation{
                createRequest(selected:"${selected.id}",requested:"${requested.id}"){
                    id
                    createdAt
                    requested{
                    title
                    platform
                    owner{
                        id
                        firstName
                        lastName
                        picture
                    }
                    }
                    selected{
                    title
                    platform
                    owner{
                        id
                        firstName
                        lastName
                        picture
                    }
                    }
                }
            }`,
            headers: {
                "Content-Type": 'application/json'
            }
    
        }).then(res => res)
        .catch(err => err)
    
        return response
}
else return null
}

export const REQUEST = async () =>{
    const currentUser = await CURRENTUSER()
    if(currentUser !== null ){
        
        const response = await axios.post(process.env.REACT_APP_API_URL,{
            query:`query{
                requests(_id:"${currentUser.id}"){
                    id
                    createdAt
                    status
                    requested{
                        id
                    cover
                    title
                    cover
                    platform
                    value
                    owner{
                        id
                        firstName
                        lastName
                        picture
                    }
                    }
                    selected{
                        id
                        value
                    title
                    cover
                    platform
                    owner{
                        id
                        firstName
                        lastName
                        picture
                    }
                    }
                }
            }`,
            headers: {
                "Content-Type": 'application/json'
            }
    
        }).then(res => res)
        .catch(err => err)
    
        return response.data.data
}
else return null
}

export const ALLREQUESTS = async () =>{
    return await axios.post(process.env.REACT_APP_API_URL,{
        query:`query{
            allRequests{
                id
                createdAt
                status
                requested{
                    id
                cover
                title
                cover
                platform
                value
                owner{
                    id
                    firstName
                    lastName
                    picture
                }
                }
                selected{
                    id
                    value
                title
                cover
                platform
                owner{
                    id
                    firstName
                    lastName
                    picture
                }
                }
            }
        }`,
        headers: {
            "Content-Type": 'application/json'
        }

    }).then(res => res).catch(err => err)
}

export const UPDATEREQUEST = async (request, status) =>{
    //console.log(request.id)

    if(request !== null || status !== null ){
        
        const response = await axios.post(process.env.REACT_APP_API_URL,{
            query:`mutation{
                updateRequest(_id:"${request.id}", status:"${status}"){
                    id
                    createdAt
                    status
                }
            }`,
            headers: {
                "Content-Type": 'application/json'
            }
    
        }).then(res => res)
        .catch(err => err)
    
        return response
}
else return null
}

export const SEARCHGAME = async (keyword)=>{

    return await axios.post(process.env.REACT_APP_API_URL,{
        query:`query{
            gameSearch(input:{gender:"${keyword}",title:"${keyword}",platform:"${keyword}"}){
                id
                title
                gender
                platform
                status
                value
                description
                createdAt
                cover
                owner{
                    id
                    firstName
                    lastName
                    email
                    picture
                }



              }
              
        }`,
        headers: {
            "Content-Type": 'application/json'
        }
    }).then(res => res.data.data.gameSearch).catch(err => err)
}

export const LOGOUT = async () => {

    const result = await axios.post(process.env.REACT_APP_API_URL,{
        query:` mutation Logout {
            logout
        }`,
        headers: {
            "Content-Type": 'application/json'
        } 
    })
    .then(res => res)
    .catch(err => err)

    return result
}

export const LOGIN = async (email,password)=>{
    return await axios.post(process.env.REACT_APP_API_URL,{
        query:`mutation{
            login(email:"${email}",password:"${password}"){
                user{
                    id
                    firstName
                  }
            }
        }`,
        headers: {
            "Content-Type": 'application/json'
          } 
    }).then(res => res).catch(err => err);
}

export const REPORTS = async () =>{
    return await axios.post(process.env.REACT_APP_API_URL,{
        query:`query{
            reports{
                id
                sender{
                    id
                    firstName
                    lastName
                    picture
                }
                content
                done
                createdAt
            }
        }`,
        headers: {
            "Content-Type": 'application/json'
          } 
        }).then(res => res).catch(err => err)
}

export const SENDREPORT = async ({sender,content}) => {

   // console.log(sender,content)

  if(sender!==null && content!==null){
        return await axios.post(process.env.REACT_APP_API_URL,{
            query:`mutation{
                sendReport(sender:"${sender.id}",content:"${content}"){
                    id
                    content
                    createdAt
                    done
                }
            }`,
        headers: {
            "Content-Type": 'application/json'
          } 
        }).then(res => res).catch(err => err)
    }
   
}

export const UPDATEREPORT = async (report)=>{
    if(report!==null){
        return await axios.post(process.env.REACT_APP_API_URL,{
            query:`mutation{
                updateReport(report:"${report.id}"){
                    id
                    content
                    createdAt
                    done
                }
            }`,
        headers: {
            "Content-Type": 'application/json'
          } 
        }).then(res => res).catch(err => err)
    }
}

export const PROMOTEUSER = async (user,role) =>{
    if(user!==null){
        return await axios.post(process.env.REACT_APP_API_URL,{
            query:`mutation{
                promoteUser(_id:"${user.id}",roles:${role})
            }`,
            headers: {
                "Content-Type": 'application/json'
              } 
            }).then(res => res).catch(err => err)

    }
}

export const METRICS = async (keyword) =>{
    return await axios.post(process.env.REACT_APP_API_URL,{
        query:`query{
            metrics(keyword:"${keyword}"){
                users
                requests
                platform
                games
                value
                title
                activeUsers
                location
                createdAt
            }
        }`,
        headers: {
            "Content-Type": 'application/json'
          } 
        }).then(res => res).catch(err => err)
}