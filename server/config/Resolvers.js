const {ADDUSER,
    CREATEMENAGER,
    GETUSERBYID,
    GETUSERS,
    ACTIVEUSERS,
    ACCOUNTSCREATED,
    USERSLOCATION,
    GETUSERBYEMAIL,
    DELETEUSER,
    USER} 
    = require('../Models/User')

const {GETGAME,
    GAMESPERPLATFORM,
    GAMESPERVALUE,
    GETGAMES,
    GAME} = require('../Models/Game')
const {GETSUGGESTIONS,
    CREATESUGGESTION,
    DELETESUGGESTION} = require('../Models/Suggestion')
const {NOTIFICATION} = require('../Models/Notification')
const {MESSAGE} = require('../Models/Message')
const {REQUEST,REQUESTNUMBER} = require('../Models/Request')
const {REPORT} = require('../Models/Report')
const DateFormat = require('./DateFormat')
const {AuthenticationError} = require('apollo-server-express')
const bcrypt = require('bcrypt')

const today = DateFormat()
//const stringSimilarity = require("string-similarity");

const resolvers = {
    Game:{
        owner: ({owner}) => GETUSERBYID(owner)

    },

    Notification:{
        sender: ({sender}) => GETUSERBYID(sender),
        receiver: ({receiver}) => GETUSERBYID(receiver)

    },

    User:{
        gamecollection: async ({gamecollection}) =>{
            //console.log(gamecollection)
            return await GAME.find({_id:gamecollection})
        },
        contacts: async ({contacts}) =>{
            return await USER.find({_id:contacts})
           
        }
    },

    Message:{
        sender: ({sender}) => GETUSERBYID(sender),
        receiver: ({receiver}) => GETUSERBYID(receiver)
    },

    Request:{
        envolved: ({envolved}) => {
            //console.log(envolved)
            return USER.find({_id:envolved})
        },
        selected: ({selected}) => {return GETGAME(selected)},
        requested: ({requested}) => {return GETGAME(requested)},
    },

    Report:{
        sender:({sender})=>{
            return GETUSERBYID(sender)
        }

    },

    Query:{
        me: (parent,args,context) => {return context.getUser()},
        user:(parent,{_id},context) => {return GETUSERBYID(_id)},
        users: () =>  { return  GETUSERS() },
        games: () =>{ return GETGAMES() },
        game:(parent,{_id},context)=>{return GETGAME(_id)},

        gameSearch:(parent,{input},context)=>{
            if(input.title ==="null" && input.gender ==="null" && input.platform ==="null"){
                return GETGAMES()
            }
           return GAME.find({$or: [
                {title:input.title},{gender:input.gender}
                ,{platform:input.platform}
            ]})

        },
        suggestions: () => {return GETSUGGESTIONS()},
        notifications: (parent,{_id},context) => {
            return NOTIFICATION.find({$or: [{sender:_id},{receiver:_id}]})
        },

        chat: async (parent,{sender,receiver},context) =>{
            return await MESSAGE.find({$or: [  
                {$and : [{sender:sender},{receiver:receiver}] },
                {$and : [{sender:receiver},{receiver:sender}] },
             ]
        })
    },
    
    requests: async (parent,{_id},context) =>{
        return await REQUEST.find({envolved:_id})
    },
    allRequests: async (parent,args,context) =>{
        return await REQUEST.find()
    },

    metrics: async (parent,{keyword},context) =>{
        let count = '';
        if(keyword === 'activeUsers'){
            count = await ACTIVEUSERS();
        }
        if(keyword === 'location'){
            count = await USERSLOCATION();
        }
        if(keyword === 'accountsCreated'){
            count = await ACCOUNTSCREATED();
        }
        if(keyword === 'platform'){
            count = await GAMESPERPLATFORM();
        }
        if(keyword === 'value'){
            count = await GAMESPERVALUE();
        }
        if(keyword === 'requests'){
            count = await REQUESTNUMBER();
        }

        return count
        
    },

    reports: async (parent,args,context)=>{
        return await REPORT.find();
    }
},

    Mutation:{
        /* Criação de conta */
        signup: async (parent, {firstName,lastName,email,picture,location,password}, context) =>{
           const user = await GETUSERBYEMAIL(email);
            if(user){throw new Error('email já está sendo utilizado')}

          if(password.lenght <= 5){
              throw new Error('a senha deve conter mais de 6 digitos')
          }

          const hash = await bcrypt.hash(password,10)

            const newuser = {
                roles: 'USER',
                firstName,
                lastName,
                email,
                location,
                picture:picture,
                password:hash,
                createdAt:today
            }

            ADDUSER(newuser)
            //await context.login({newuser})

            return newuser
        },
        /* LOGIN E LOGOUT PARA TODOS OS USUÁRIOS */
        logout: (parent, args, context) => context.logout(),
        login: async (parent, {email,password}, context) =>{
            if(!email || !password){
                throw new AuthenticationError("email ou senha não preenchidos")
            }

            const {user} = await context.authenticate('graphql-local',{email,password})
            await context.login(user)
            const match = await bcrypt.compare(password,user.password)
            if(!match){
                throw new AuthenticationError("email ou senha incorreto")
            }
            
            else{
                return {user}
            }
        },

        updateUser: async (parent, {_id,firstName,lastName,email,password,picture,location}, context) =>{
            const user = await GETUSERBYID(_id)
            if(!user || user.active === false){
                throw new AuthenticationError("usuário inativo ou não encontrado")
            }

            if(firstName !== undefined){
                user.firstName = firstName
            }

            if(lastName !== undefined){
                user.lastName = lastName
            }
            if(email !== undefined){
                user.email = email
            }
            if(password !== undefined){
                user.password = await bcrypt.hash(password,10)
            }
            if(picture !== undefined){
                user.picture = picture

            }
            if(location !== undefined){
                user.location = location
            }

            user.save()

            return user
        },
        /* Deletar conta - SOMENTE PARA GERENTE E USUÁRIO */
        deleteUser: async (parent, {_id}, context)=>{
                return await DELETEUSER(_id) 
            },
        
        changeAccountStatus: async (parent, {_id,active}, context)=>{
            const user = await USER.findByIdAndUpdate({_id:_id},{active:active})
            return user
        },

        /* Promover Usuário ou Diminuir seu status - SOMENTE GERENTE */
        promoteUser: async (parent,{_id,roles}, context) => {
            const currentUser = await context.getUser()
                if(currentUser.roles !== 'MANAGER' ){
                        throw new Error ('você precisa do nível de gerente')
                }
                const user = await USER.findByIdAndUpdate({_id:_id},{roles:roles})
                return user
         },

        /* Criar Gerente - NÂO ACESSÍVEL AO CLIENTE */
        createMenager: (parent,{_id}, context) =>{
            const user = CREATEMENAGER(_id)
           
            return {user}
        },

        /* Adiciona o jogo ao sistema */
        createGame: async (parent,{title,owner,gender,value,platform,status,description,cover},context)=>{
            const user = await GETUSERBYID(owner)
            if(!user || user.active === false){
                throw new AuthenticationError("usuário inativo ou não encontrado")
            }

            try{
                const game = new GAME ({title:title,
                    owner:owner,
                    gender:gender,
                    value:value,
                    platform:platform,
                    status:status,
                    description:description,
                    cover:cover,
                    createdAt:today})
                await game.save()
                await USER.updateOne({_id:owner}, {$push: {"gamecollection":game}})
            
                return game 
                
            } catch(err){
                 throw new Error(err)
            }
            
            
        },
        /* Remove o jogo do sistema */
        deleteGame: async (parent,{_id},context)=>{
            const game = await GETGAME(_id)
            await USER.updateOne({_id:game.owner},{$pull: {"gamecollection":game._id} })
            return await GAME.findByIdAndDelete(_id)
        },
        /* Edita informações do jogo já adicionado */
        updateGame: async (parent,{_id,title,gender,value,platform,status,description,cover},context) =>{
            const game = await GETGAME(_id)
            if(!game){
                throw new AuthenticationError("jogo não encontrado!")
            }
            try{
                if(title!==undefined){
                    game.title = title;
                }
                if(gender!==undefined){
                    game.gender = gender;
                }
                if(value!==undefined){
                    game.value = value;
                }
                if(platform!==undefined){
                    game.platform = platform;
                }
                if(status!==undefined){
                    game.status = status;
                }
                if(description!==undefined){
                    game.description = description;
                }
                if(cover!==undefined){
                    game.cover = cover;
                }

                await game.save()
                return game

            }
            catch(err){
                throw new Error(err)
            }
        },
        /* adiciona sugestão de titulo para jogos vindos do usuários */
        createSuggestion: (parent,{title},context) =>{
            return CREATESUGGESTION(title)
        },
        /* remove sugestão de titulo para jogos vindos do usuários */
        removeSuggestion: (parent,{title},context)=>{
            return DELETESUGGESTION(title)
        },
        
        /* adiciona outro usuário aos contatos */
        addToContactList: async (parent,{_id,userToAdd},context) =>{
            const current = await GETUSERBYID(_id)
            if(!current || current.active===false){
                throw new AuthenticationError("usuário inativo ou não encontrado")
            }

            try{
                const matchingUser = current.contacts.find(user =>{
                    return user._id === userToAdd
                })
    
                if(matchingUser){
                    throw new Error('Você já possui este usuário em seus contatos')
                }
                 await USER.updateOne({_id:_id},{$push: {"contacts":userToAdd}})
                 await USER.updateOne({_id:userToAdd}, {$push: {"contacts":_id}})

                 await NOTIFICATION.create({
                    sender:_id,
                    receiver:userToAdd,
                    content:'você possui um novo contato!',
                    createdAt:today,
                    readed:false

                })

                return current

            }
            catch(err){
                throw new Error(err)
            }
        },
        /* remove contato entre usuários */
        removeToContactList: async (parent,{_id,userToRemove},context) =>{
                await USER.updateOne({_id:_id},{ 
                $pull:{"contacts":userToRemove}
                })
                 await USER.updateOne({_id:userToRemove},{ 
                $pull:{"contacts":_id}
                })

                return GETUSERBYID(userToRemove)
        },

        createNotification : async (parent,args,context) =>{
            
            const notify = await NOTIFICATION.create({
                sender:args.sender,
                receiver:args.receiver,
                content:args.content,
                createdAt:today,
                readed:false
            })

            return notify
        },

        removeNotification: async (parent,{_id},context) =>{
            return await NOTIFICATION.findByIdAndDelete(_id)
        },
        updateNotification: async (parent,{_id},context) =>{
            return await NOTIFICATION.updateOne({_id:_id},{readed:true})
        },

        sendMessage: async (parent,{sender,receiver,content},context)=>{
            const user = GETUSERBYID(receiver)

            if(!user || user.active===false){
                throw new AuthenticationError("usuário inativo ou não encontrado")
            }

                const message = new MESSAGE({
                    sender:sender,
                    receiver:receiver,
                    content:content,
                    readed:false,
                    createdAt:today
    
                })
                await message.save()
                return message
        },

        createRequest: async (parent,{selected,requested},context) =>{
            const myGame = await GETGAME(selected)
            const otherGame = await GETGAME(requested)

            if(otherGame.owner.active === false){
                throw new AuthenticationError("usuário inativo ou não encontrado")
            }
            
            const newRequest = new REQUEST({
                status:'pendente',
                createdAt:today,
                selected:selected,
                requested:requested,
            })
            await newRequest.save()
            await REQUEST.updateOne({_id: newRequest.id}, 
                {$push: {"envolved":myGame.owner}})
            await REQUEST.updateOne({_id: newRequest.id}, 
                {$push: {"envolved":otherGame.owner}})

             await NOTIFICATION.create({
                    sender:myGame.owner,
                    receiver:otherGame.owner,
                    content:"você possui um novo pedido de troca! verifique em suas trocas",
                    createdAt:today,
                    readed:false
                })

            return await newRequest
            
        },
        deleteRequest: async (parent,{_id},context)=>{
            return await REQUEST.findByIdAndDelete(_id)
        },
        updateRequest: async (parent,{_id,status},context)=>{
            const request = await REQUEST.findById(_id)
            const selected = await GETGAME(request.selected)
            const requested = await GETGAME(request.requested)

            if(selected!==undefined || requested!==undefined){

                await NOTIFICATION.create({
                   sender: selected.owner,
                   receiver:requested.owner,
                   content:"uma de suas trocas foi atualizada, veja mais em suas trocas",
                   createdAt:today,
                   readed:false
               })
            }

               return await REQUEST.updateOne({_id:_id},{status:status})
               
        },

        sendReport: async (parent,{sender,content},context) =>{
            const user = await GETUSERBYID(sender)
            if(!user || user.active === false){
                throw new AuthenticationError("usuário inativo ou não encontrado")
            }

            const report = new  REPORT({
                content:content,
                sender:user,
                done:false,
                createdAt:today
            })
            await report.save()
            return report 
        },

        updateReport: async (parent,{report},context)=>{
            const notify = await NOTIFICATION.updateOne({_id:report},{done:true})
            return notify
        },

        deleteReport:async (parent,{_id},context)=>{
            return await REPORT.findByIdAndDelete(_id)
        }
        

    }

}

module.exports = resolvers