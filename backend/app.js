
//deuxieme  commit backend
import Fastify from 'fastify'

import fastifyPosgres from '@fastify/postgres'

import {Server} from 'socket.io'

const fastify = Fastify({
      logger: true

})


import fastifyPostgres from '@fastify/postgres';

fastify.register(fastifyPostgres, {
  connectionString: 'postgresql://postgres:mQytSFYzZdemCjBBZQOtBPNZyoQBJfLP@metro.proxy.rlwy.net:25357/railway',
  ssl: {
    rejectUnauthorized: false
  },
  max:10000,
});



// Vérifiez la connexion PostgreSQL après le démarrage du serveur
fastify.ready(async (err) => {
  

});




//Function qui crée la table users


async function create_users_table(){

  console.log("level0")

   const client = await fastify.pg.connect()

   console.log("level1")

  try{


    const queryExist = `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name='users' )`

    const resultExist = await client.query(queryExist)

    if(resultExist.rows[0].exists){
      console.log("cette table exist et ne peut pas etre crée : ")
      return
    }


  

   const createTableQuery = `CREATE TABLE IF NOT EXISTS users

   (id SERIAL PRIMARY KEY,
   user_id VARCHAR(100) NOT NULL,
   name VARCHAR(100) NOT NULL,
   age INTEGER NOT NULL,
   ethnie VARCHAR(100) NOT NULL,
   sex VARCHAR(100) NOT NULL,
   image TEXT,
   create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   messages JSONB DEFAULT '[]'::JSONB,
   pending_message JSONB DEFAULT '[]'::JSONB

    )`;


    await client.query(createTableQuery)

    console.log("la création de la table users a été un succes : ")



  }catch(error){
    console.log("une erreur s'est produit pour la création de la table users : ",error)
  }

  finally{
    client.release()
  }



}



async function read_users(){

  const client = await fastify.pg.connect()

  try{

    const read_query = `SELECT * FROM users`

    const result = await client.query(read_query)

   
    return JSON.stringify(result.rows, null, 2)

  }catch(error){
    console.log("une erreur s'est produit pour la lecteure de la table users : ",error)
  }finally{
    client.release()
  }

}



async function add_user(data){

  const client = await fastify.pg.connect()

  function create_user_id() {

    const chaine = data.name

    const propre = chaine.trim();                   // Supprimer les espaces début/fin
    const avecUnderscore = propre.split(" ").join("_"); // Remplacer les espaces par "_"
   
    return avecUnderscore + "_" + Date.now();       // Concaténer le timestamp
    }


  try{

    const user_id = create_user_id()

    const add_user_query = `INSERT INTO users (user_id,name,age,ethnie,sex,image) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`

    const values=[user_id,data.name,data.age,data.ethnie,data.sex,data.image]

    const result = await client.query(add_user_query,values)

    return result.rows[0]

  }catch(error){

    console.log("une erreur s'est produit pour l'ajout d'un user dans la table users : ",error)
  }

  finally{
    client.release()
  }
}



async function get_users(){
  const client = await fastify.pg.connect()

  try{

    const getUsersQuery = `SELECT user_id,name,image FROM users`

    const result =await  client.query(getUsersQuery)

    return result.rows

  }catch(error){
    console.log("une erreur est survenue pour la recuperation de la table users : ",error)
  }
  finally{
    client.release()
  }
}

async function get_users_except(id_list){

  const client = await fastify.pg.connect()

  try{
    
    const getQuery = `SELECT user_id,name,image FROM users`
    
    const result = await client.query(getQuery)

    const result_rows = result.rows

    const resultat = result_rows.filter(item => !id_list.includes(item.user_id));
    
    //console.log("id_list dans get_users_except infni : ",resultat);

    return resultat
    
  }catch(error){
    console.log("une erreur est survenue pour la recuperation des users except : ",error)
  }
  finally{
    client.release()
  }

}


async function update_messages(user_id,data){

  const client = await fastify.pg.connect()

  const list_data = JSON.stringify(data)

  try{

    const userCheckQuery = `SELECT user_id FROM users WHERE user_id=$1`

    const userCheckResult =await client.query(userCheckQuery,[user_id])

    if(userCheckResult.rows.length===0){

      throw  new Error(`l'user_id ${user_id} n'existe pas dans la table users : `)
    }


    const update_query = `UPDATE users SET messages=messages || $2  WHERE user_id = $1 RETURNING messages`

    const result =await client.query(update_query,[user_id,list_data])

    return result.rows[0]["messages"]


    }catch(error){
           console.log("Une errer s'est produit par la mise à jour de la colone messages : ",error)
 

    }finally{

         client.release()

          }
    }



async function update_pending_messages(user_id,data){

  //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx : ",user_id," : typeof(user_id)",typeof(user_id))

  const client = await fastify.pg.connect()

  const list_data = JSON.stringify(data)

  try{

    const userCheckQuery = `SELECT user_id FROM users WHERE user_id=$1`

    const userCheckResult =await client.query(userCheckQuery,[user_id])

    if(userCheckResult.rows.length===0){

      throw  new Error(`l'id ${user_id} n'existe pas dans la table users : `)
    }


    const update_query = `UPDATE users SET pending_message=pending_message || $2  WHERE user_id = $1 RETURNING pending_message`

    const result =await client.query(update_query,[user_id,list_data])

    const final_result = result.rows[0]["pending_message"]

    console.log("voici resultat de update_pending_messages : ",final_result)


    return final_result


  }catch(error){
    console.log("Une errer s'est produit par la mise à jour de la colone messages user_id : ",user_id," data : ",data," error : ",error)
  }finally{
    client.release()
  }

}

async function checkPendingMessageFunction(user_id){



if(!user_id){

  return false

}

const client =await fastify.pg.connect()

try{

  const queryCheckPendingMessage = `SELECT pending_message FROM users WHERE user_id = $1`

  const result = await client.query(queryCheckPendingMessage,[user_id])


  const list_pending_message = result.rows[0]['pending_message']

  console.log("list_pending_message : ",list_pending_message," user_id : ",user_id)

  const check = list_pending_message.length!==0

  return check

}
catch(error){

  console.log("une erreur est survenue dans le checkPendingMessage : ",error)
}

finally{
  client.release()
}



}



async function getPendingMessage(user_id){

  const client = await fastify.pg.connect()

  try{

    const queryGetPendingMessage = `SELECT pending_message FROM users WHERE user_id = $1`

    const result = await client.query(queryGetPendingMessage,[user_id])

    return result.rows[0]

  }catch(error){

    console.log("une erreur est survenue dans le getPendingMessage : ",error)

  }

  finally{
    client.release()
  }


}


async function setPendingMessage(user_id){
  const client = await fastify.pg.connect()


  try{

    const querySetPendingMessage = `UPDATE users

    SET pending_message = '[]'::jsonb

    WHERE user_id = $1;
    `
    const result =await client.query(querySetPendingMessage,[user_id])

    //console.log("voici result dans setPendingMessage : ",result)

    return result.rows[0]

  }
  catch(error){
    console.log("erreur dans setPendingMessage : ",error)
  }

  finally{
    client.release()
  }
}



async function get_colonne_pendingMessage(){

  const client =await fastify.pg.connect()

  try{

    const getColoneQuery = `SELECT pending_message FROM users`

    const result = await client.query(getColoneQuery)

    const result_rows = result.rows

    return result.rows

  }


  catch(error){

    console.log("voici l'erreur pour get_colonne : ",error)
  }

  finally{
    client.release()
  }


}



async function dropTable(){


  const client = await fastify.pg.connect()

  try{

    const dropQuery = `DROP TABLE IF EXISTS users`;

    await client.query(dropQuery)

    //console.log("la supression de la table users a été un succes : ")


  }catch(error){

    console.log("une erreur est survenue pour la supression de la table users : ",error)

  }finally{
    client.release()
  }


}

//vérification des colonnes de la table users


 async function check_column(){

  const client = await fastify.pg.connect()

try{
  const query_check_column = `SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'users';`

const result = await client.query(query_check_column)

console.log("result : ",result.rows)

return result.rows[0]

}catch(error){

  console.log("erreur survenue dans check_column : ",error)

}finally{
  client.release()
}

}






//creation de la tabler users 








setTimeout(async ()=>{

//await dropTable()

await create_users_table()

},1000)







//Lecture de la table users 

/*
setTimeout(async ()=>{

  const users_db = await read_users()

  console.log("voici la table users : ",users_db)
},1000)
*/



//ajout d'un user 


/*

setTimeout(async ()=>{

   const user2 =  await add_user("forkbom", "49", "M", "informatique", "process")

  console.log("deuxième test  user2 : ",user2)

  },1000)

*/



//Mise à jour de la colome messages 


/*
setTimeout(async ()=>{
  const result = await update_messages(4, {"malware":"RAT"})
  console.log("voici la colone mise à jour : ",result)
},1000)
*/




//Mise à jour de la colome pending_message 


/*
setTimeout(async ()=>{
  const result = await update_pending_messages(2, {"ver":"trojan"})
  console.log("voici la colone mise à jour : ",result)
},1000)

*/



//recupérer users

/*
setTimeout(async ()=>{
  const result = await get_users()


  console.log("voici les users : ",result)
},1000)

*/




//supprimer table users 



/*
setTimeout(()=>{},1000)

*/


//Verification de pendingMessage


/*
setTimeout(async ()=>{

const check = await checkPendingMessageFunction(1)

console.log("voici check : ",check)


},2000)

*/

/*
setTimeout(async ()=>{

  await setPendingMessage(1)
},1000)
*/

/*
setTimeout(async()=>{


  const list = await get_colonne_pendingMessage()

  console.log("list : ",list)
},2000)

*/


//Check des colonnes


/*
setTimeout(async ()=>{
  check_column()
},3000)
*/


//Stockage des relations userID --- socket.id 

let userSocketMap = new Map();

    // Initialiser Socket.IO avec le serveur HTTP standard
const io = new Server(fastify.server,{
  cors: {
    origin:"http://localhost:5173",// Autoriser toutes les origines temporairement
    methods: ["GET", "POST"]
  },

    pingTimeout: 10000, // Temps d'attente avant déconnexion (10 secondes)
    pingInterval: 10000,  // Envoi des pings toutes les 5 secondes*
    ackTimeout: 10000, // Temps en millisecondescl

    })
 

io.on('connection',async (socket)=>{
  
  console.log(`un user s'est connect : ${socket.id}`)

  const user_id = socket.handshake.auth.user_id

  const sid = socket.id

  if(user_id && user_id!==0){

    userSocketMap.set(user_id,sid)
    
    console.log("voici le userSocketMap : ",userSocketMap)
  }

  else {

    console.log("ce socket ne contient pas de user_id : ",user_id)

  }


  const idList = socket.handshake.auth.idList
  
  const messageObject= socket.handshake.auth.messageObject


  let messageList = null

  if(messageObject){
   messageList= Object.values(messageObject)
  }




const send_pending_message =async (user_id,sid,data)=>{

    io.timeout(2000).to(sid).emit('pending_message',data,async (err,reponse)=>{

      if(err){
        console.log("une erreur est survenue pour l'envoie de messages pour l'evenement  pending_message id ",user_id, " error : ",err,)

   
      }

      else {
        
        //console.log("voici la reponse du client userId : ",user_id," reponse : ",reponse)

        const result = await setPendingMessage(user_id)

        //console.log("voici le result pour setPendingMessage user_id : ",user_id," result : ",result)

      }

    })

  }

  async function pending_messageObject(){

  // console.log("bienvenu dans la section pending_messageObject id : ",userId)

  if(messageObject && messageObject[0]){
    
    //console.log("voici hacker id : ",userId," messageObject.length : ",messageObject.length)

    Object.entries(messageObject).some(async ([user_id,value])=>{

      if(userSocketMap.has(user_id)){

        const sid = userSocketMap.get(user_id)

        const result = await send_pending_message(user_id,sid,value)


      }
      else{

        console.log("ce user_id ",user_id," est absent dans le userSocketMap pour mettre à jour messageObject ",userSocketMap.has(user_id))

        const result = await update_pending_messages(user_id,value)

        console.log("voici result de pending_messageObject : ",result)

      }

    })

  }

  else{
    console.log("la liste des messages envoyé par le client est vide : ",messageObject)
  }

  }



  async function send_newUsers(){

   if(idList && idList.length!==0){

     //console.log("voici idList : ",idList)

     const users_filter = await get_users_except(idList)
    
     if(users_filter && users_filter.length!==0){

     const users_filter_json ={}

     users_filter.forEach((element)=>{

       users_filter_json[String(element.user_id)]=element

     })

  io.timeout(2000).to(socket.id).emit("newUsers", users_filter_json,(err,reponse)=> {

      if(err){
        console.log("une erreur est survenue pour l'envoie de données dans l'ecouteur newUsers : ",err)
      }

      else {
  
     //   console.log("voici la reponse du client de l'evenement newUsers : ",reponse)
      }

  });
    
     

       }

       else{
        console.log("users_filter est vide dans l'evenement newUsers : ",users_filter)

         io.timeout(2000).to(socket.id).emit("newUsers",{},(err,reponse)=> {
           if(err){
            console.log("une erreur est survenue pour l'envoie de données dans l'ecouteur newUsers pour newUsers null : ",err)
                  }

           else {
         
           //console.log("voici la reponse du client dans l'evenement newUsers null: ",reponse)
                }

            });
      




       }

     }


     else{
      console.log("Le client n'a pas envoyé une liste d'identifiant ou cette liste est vide : ",idList)
     }

  }



  async function first_send_pendingMessage(){

      const pendingMessageList = await getPendingMessage(user_id)


      console.log("pendingMessageList : ",pendingMessageList)

      await send_pending_message(user_id,sid,pendingMessageList)

  }


  if(user_id!=='0'){

    const checkPendingMessage =await checkPendingMessageFunction(user_id)

    console.log("checkPendingMessage  : ",checkPendingMessage," user_id : ",user_id)

    await send_newUsers()

    if(checkPendingMessage){
       await first_send_pendingMessage(user_id,sid)
    }

       await pending_messageObject()

    }


    else {
      console.log("new user_id : ",user_id)
    }



  socket.on("register",async (data,callback)=>{

    const user_current = await add_user(data)

    const newProfile = {
      user_id:user_current.user_id,
      name:user_current.name,
      image:user_current.image
    }


    
    if(user_current){

      console.log("sauvegarde profile reussie : ")

      //envoie du user_current aux autres clients

      const users = await get_users()

      console.log("level1")

      //console.log("users.length dans register : ",Object.values(users[0]).length)

      const users_json = {}

      users.forEach(element=>{

        users_json[element.user_id]=element
        
      })


      const user_id = user_current.user_id

      userSocketMap.set(user_id,socket.id)
      if(users && user_id){
        const dataForClient ={
          user_id:user_id,
          users:users_json
        }
        

        //console.log("dataForClient : ",dataForClient)
        callback(dataForClient)
      }


    }
  

    socket.broadcast.emit('broadcast', newProfile); // tous SAUF moi



  })

  // evenevment messages


  socket.on('message',async (data,callback)=>{

    console.log("nouveau message recu de la part du client : ",data)

    console.log("recipient_id de data : ",data.recipient)


    const recipient_id = data.recipient

    if (typeof callback === 'function') {

        callback("✅ J'ai bien reçu ton message.");

    }

    console.log("recipient_id : ",userSocketMap.has(recipient_id))

    if(recipient_id && userSocketMap.has(recipient_id)){

      console.log("première tentative d'envoie")

      const recipient_sid = userSocketMap.get(recipient_id)

      io.timeout(2000).to(recipient_sid).emit('message_from_server',data,async (err,reponse)=>{


        if(err){
          console.log("le message n'a pas été envoyé vers le client : ",err)
          const list_pending_message = await update_pending_messages(recipient_id,data)
          console.log("voici list_pending_message pour la mise à jour de de la colone pending_message pour l'evenement message : ",list_pending_message)
        }
        else{

          console.log("voici la reponse du client : ", reponse)
        }
      })
    }

    else{
      console.log("le recipient n'existe pas ou est pas disponible dans userSocketMap : ",userSocketMap)
      const list_pending_message = await update_pending_messages(recipient_id,data)
    }


  })

  socket.on('disconnect',()=>{
    console.log(`ce socket ${socket.id} s'est déconnecter : `)
    if(user_id && userSocketMap.has(user_id)){
      userSocketMap.delete(user_id);
      console.log("userSocketMap après déconnexion de l'userId ",user_id," : ",userSocketMap)
    }



  })



})



fastify.listen({ port: 5000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Serveur Fastify avec Socket.IO en écoute sur ${address}`);
});