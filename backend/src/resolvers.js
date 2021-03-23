const UploadFile = require('./config/cloudinary')
const DateFormat = require('./config/DateFormat')
const {getGames,deleteGame,addGame, games} = require('./models/Game')
const {findById,getUsers,addUser,deleteUser,users} = require('./models/User')
const Notify = require('./models/Notify')
const Request = require('./models/Request')
const Chat = require('./models/Chat')
const Message = require('./models/Message')

const bcrypt = require('bcrypt')

const {PubSub,AuthenticationError} = require('apollo-server-express')
const { create } = require('./models/Notify')
const pubSub = new PubSub();

const NOTIFY_ADDED = 'NOTIFY_ADDED';
const NEW_GAME_ADDED = 'NEW_GAME_ADDED';

const resolvers = {
    Subscription: {
        notifyAdded:{
          /*Notifica em tempo real */
          subscribe: () => pubSub.asyncIterator(NOTIFY_ADDED),
          
        },
        newGameAdded:{
            /* preenche em tempo real o feed dos games */
            subscribe: () => pubSub.asyncIterator(NEW_GAME_ADDED),
            
          },

      },

    Query:{
        /* retorna o usuário q está logado */
        me: (parent, args, context) => {return context.getUser()},
        /* retorna lista de todos usuários */
        users: (parent, args, context) => getUsers(),
        /* retorna um uníco usuário */
        user: (parent, {_id}, context) => {
           const user = users.findById(_id)
           return user
        },
        /* retorna todos os jogos */
        games: async () =>{
            return await getGames()
        },
        /* retorna um unico jogo */
        game: (parent, {_id}, context) =>{
            return games.findById(_id)

        },
        /* retorna jogos relacionados á um usuário (dono/owner) */
        colection: (parent, {_id}, context) => {
            return games.find({owner:_id})
        },
        /* retorna notificações/recados recebidos pelo usuário */
        notifies: async (parent, {_id}, context) =>{
            return await Notify.find({receiver:_id})
        },
        /* todas as requisições */
        allRequests: async (parent,args, context) =>{
            return await Request.find()
            
        },
        /* todas as salas de chat */
        chats: (parent,{_id},context) => {
            return Chat.find({$or:[{from: _id},{receiver:_id}]}, function(err, chat) 
            {
               if (err)
               {
                   return err
               }
               
               return chat
           
            });
            
        },
        /* todas as mensagens em determinado chat */
        messages: (parent,{_id},context) =>{
            return Message.find({chatId: _id}, function(err, message) 
            {
               if (err)
               {
                   return err
               }
               
               return message
           
            });
        },
        /* coleta de dados que será exibida nos gráficos */
        metrics: async (parent,{keyword},context)=>{
            let count = ''
            
            if(keyword==='users'){
              count = await  users.aggregate([
                      {
                          $project:
                          {
                              date: "$createdAt",
                          }
                      },
                      {
                          $group: {
                              _id: { createdAt: "$date"},
                              users: { $sum: 1 }
                          }
                      },
                  
                      {
                          $addFields: {
                              createdAt: "$_id.createdAt"
                          }
                      },
                      {
                          $project: {
                              _id: false
                          }
                      }
                  ]);
            }

            if(keyword==='platform'){
                count = await  games.aggregate([
                    {
                        $project:
                        {
                            platform: "$platform",
                        }
                    },
                    {
                        $group: {
                            _id: { platform: "$platform"},
                            games: { $sum: 1 }
                        }
                    },
                
                    {
                        $addFields: {
                            platform: "$_id.platform"
                        }
                    },
                    {
                        $project: {
                            _id: false
                        }
                    }
                ]);
            }

            if(keyword === 'location'){
                count = await users.aggregate([
                    {
                        $project:
                        {
                            location: "$location",
                        }
                    },
                    {
                        $group: {
                            _id: { location: "$location"},
                            users: { $sum: 1 }
                        }
                    },
                
                    {
                        $addFields: {
                            location: "$_id.location"
                        }
                    },
                    {
                        $project: {
                            _id: false
                        }
                    }
                ]);

            }
            if(keyword === 'values'){
                count = await games.aggregate([
                    {
                        $project:
                        {
                            value: "$value",
                            title: "$title"
                        }
                    },
                    { $unwind: '$value' },
                    {
                        $group: {
                            _id: { value: "$value", title:"$title"},
                           
                        }
                    },
                
                    {
                        $addFields: {
                            value: "$_id.value",
                            title: "$_id.title"
                        }
                    },
                    {
                        $project: {
                            _id: false
                        }
                    }
                ]);
               
            }
            if(keyword === 'requests'){
                count = await Request.aggregate([
                    {
                        $project:
                        {
                            date: "$createdAt",
                        }
                    },
                    {
                        $group: {
                            _id: { createdAt: "$date"},
                            requests: { $sum: 1 }
                        }
                    },
                
                    {
                        $addFields: {
                            createdAt: "$_id.createdAt"
                        }
                    },
                    {
                        $project: {
                            _id: false
                        }
                    }
                ])
            }
            return count
         }
    },
 


    Mutation:{
        /* Criação de conta */
        signup: async (parent, {firstName,lastName,email,picture,location,password}, context) =>{
          //  const users = context.User.getUsers();
         //   const user = users.find(user => user.email === email)
          //  if(user){throw new Error('email already used')}

          if(password.lenght <= 5){
              throw new Error('a senha deve conter mais de 6 digitos')
          }


          const hash = await bcrypt.hash(password,10)
          var path = ''
          if(picture){
              const upfile = await UploadFile(picture)
              const newfile = {filename:null, path: upfile.secure_url}
              path = newfile.path
          }
          else{
              path = ""
          }

          const today = DateFormat()

            const newuser = {
                roles: 'USER',
                firstName,
                lastName,
                email,
                location,
                picture:path,
                password:hash,
                createdAt:today
            }

            addUser(newuser)
            await context.login(newuser)

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
        /* Promover Usuário ou Diminuir seu status - SOMENTE GERENTE */
        promoteUser: async (parent,{_id,roles}, context) => {
            const currentUser = await context.getUser()
            if(currentUser.roles !== 'MENAGER' ){
                throw new Error ('você precisa do nível de gerente')
            }
            const user = users.findByIdAndUpdate(_id, {roles: roles})
           
            return {user}
        },
        /* Criar Gerente - NÂO ACESSÍVEL AO CLIENTE */
        createMenager: (parent,{_id}, context) =>{
            const user = users.findByIdAndUpdate(_id, {roles: 'MENAGER'})
           
            return {user}
        },
        /* Atualização de dados - Para usários e gerente */
        updateUser: async (parent, {_id,firstName,lastName,email,password,picture,location}, context) =>{
            const user = await users.findById(_id)
            if(!user){
                throw new AuthenticationError("usuário não encontrado")
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
                const upfile = await UploadFile(picture)
                const newfile = {filename:null, path: upfile.secure_url}
                user.picture = newfile.path

            }
            if(location !== undefined){
                user.location = location
            }

            user.save()

            return user
        },
        /* Deletar conta - SOMENTE PARA GERENTE E USUÁRIO */
        deleteUser: (parent, {_id}, context)=>{
            const currentUser = context.getUser()
            if(currentUser === null || currentUser.roles !== 'MENAGER' || currentUser.roles !== 'USER' ){
                throw new Error ('você precisa do nível de gerente')
            }
            else{
                return deleteUser(_id)

            }
        },
        /* CRIAR e DELETAR NOTIFICAÇÔES/RECADOS */
        createNotify: async (parent, {_id,receiver,content,accepted}, context)=>{
            const from = _id
            const published = DateFormat()
            const notify = await Notify.create({from,receiver,content,published,accepted})
            pubSub.publish(NOTIFY_ADDED, { notifyAdded: notify  });
            return notify

        },
        deleteNotify: async (parent, {_id}, context) =>{
            return Notify.findByIdAndDelete(_id)

        },
        /* ADICIONA, ATUALIZA E DELETA JOGOS  */
        addGame: async (parent, {owner,title,publisher,platform,status,value,description,cover}, context)=>{
            const current = await findById(owner)

            if(!current){
                throw new Error("algo aconteceu...")
            }
            const today = DateFormat()
            const upfile = await UploadFile(cover)
            const newfile = {filename:title, path: upfile.secure_url}
            const newGame = await addGame({
                owner:current._id,
                title:title,
                publisher:publisher,
                platform:platform,
                status:status,
                value:value,
                description:description,
                location:current.location, 
                cover:newfile,
                createdAt:today
            });
            newGame.save()
            pubSub.publish(NEW_GAME_ADDED, { newGameAdded: newGame  });
            return newGame
            
        },

        deleteGame : async (parent, {_id}, context) => {
            return await deleteGame(_id);
        },

        updateGame: async (parent, {_id,title,publisher,platform,status,value,description,cover}, context)=>{
            const game = await games.findById(_id)
            if(!game){
                throw new Error ("jogo não encontrado")
            }
            if(title!==undefined){
                game.title = title;
                
            }
            if(publisher!==undefined){
                game.publisher = publisher
            }
            if(platform!==undefined){
                game.platform = platform
            }
            if(status!==undefined){
                game.status = status
            }
            if(value!==undefined){
                game.status = status
            }
            if(description!==undefined){
                game.description = description
            }
            if(cover!==undefined){
                const upfile = await UploadFile(cover)
                const newfile = {filename:title, path: upfile.secure_url}
                game.cover = newfile
            }

            game.save()
            return game
        },

        /* CRIA, ATUALIZA E EXCLUI PEDIDO/REQUISIÇÂO DE TROCA */
        createRequest: async (parent, {_id,selected,required},context) =>{
            const madeBy = _id

            const gameRequested = games.findById(required)
            const receiver = gameRequested.owner
            
            const content = `Você tem um novo pedido de troca para ${gameRequested.title} !` 
            const published = DateFormat()

            const newReq = await Request.create({madeBy,selected,required,createdAt:published,accepted:false})
            const notify = await Notify.create({from:_id,receiver,content,published,accepted:false})
            pubSub.publish(NOTIFY_ADDED, { notifyAdded: notify  });
            
            return await newReq
        },

        deleteRequest: async (parent, {_id}, context) => {
            return await Request.findByIdAndDelete(_id);
    },

        updateRequest : async (parent, {_id,receiver,from,accepted}, context) => {
        const request = await Request.findById(_id)
        if(!request){
            throw new Error("pedido não encontrado")
        }
        request.accepted = accepted;
        request.save()
        const required = games.findById(request.required)
        const selected = games.findById(request.selected)
        const published = DateFormat()
        const content = `Existe uma atualização sobre a troca entre ${required.title} e ${selected.title}`

        const notify = await Notify.create({from,receiver,content,published,accepted})
        pubSub.publish(NOTIFY_ADDED, { notifyAdded: notify  });
        },
    /* CRIA E EXCLUI A SALA DE CHAT COM OUTRO USUÀRIO */
        createChat : async (parent, {from,receiver}, context) =>{
            const chat = Chat.create({
                from,
                receiver
            })

            return await chat

        },
        deleteChat: async (parent, {_id}, context) =>{
            return await Chat.findByIdAndRemove(_id)
        },
        /* CRIA E ENVIA MENSAGEM A OUTRO USUÁRIO - NECESSARIO QUE EXISTA UM CHAT  */
        createMessage: async (parent, {chatId,from,receiver,content}, context) =>{
            const conversation = await Chat.findById(chatId)

            if(!conversation)
            {
                throw new Error("conversa não encontrada")
            }
            const createdAt = DateFormat()
            const message = Message.create({
                from,
                receiver,
                chatId:conversation.id,
                content,
                createdAt

            })

            return await message

        },
        /* EXCLUI A MENSAGEM ENVIADA */
        deleteMessage: async (parent,{_id},content) =>{
            return await Message.findOneAndDelete(_id)
        },

}

}

module.exports = resolvers