   
import Fastify from 'fastify'

import fastifyPosgres from '@fastify/postgres'

import 'dotenv/config'


import dotenv from 'dotenv'



import {Server} from 'socket.io'

const fastify = Fastify({
      logger: true

})


import dns from 'dns';

// Forcer dns.lookup à ne retourner que des adresses IPv4
const originalLookup = dns.lookup;
dns.lookup = (hostname, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = { family: 4, all: false };
  } else if (typeof options === 'object') {
    options.family = 4;
  } else {
    options = { family: 4, all: false };
  }
  return originalLookup.call(dns, hostname, options, callback);
};



fastify.register(fastifyPosgres, {
  connectionString: process.env.DATABASE_URL,
  idleTimeoutMillis: 30000,    // 30s d’inactivité avant recyclage
  connectionTimeoutMillis: 20000, // 20s avant timeout
});



fastify.get('/', async (request, reply) => {
  return { message: "Backend Fastify en ligne !" };
});



// Vérifiez la connexion PostgreSQL après le démarrage du serveur
fastify.ready(async (err) => {
  

});

//Function qui crée la table users


async function create_users_table(){

   const client = await fastify.pg.connect()

 
  try{


    const queryExist = `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema='public' AND table_name='users' )`

    const resultExist = await client.query(queryExist)

    if(resultExist.rows[0].exists){
      console.log("cette table exist et ne peut pas etre crée : ")
      return
    }


  

   const createTableQuery = `CREATE TABLE IF NOT EXISTS public.users

   (id SERIAL PRIMARY KEY,
   user_id VARCHAR(100) NOT NULL,
   name VARCHAR(100) NOT NULL,
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

    const read_query = `SELECT * FROM public.users`

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

 


  try{


    const add_user_query = `INSERT INTO public.users (user_id,name) VALUES ($1,$2) RETURNING *;`

    const values=[data.user_id,data.name]

    const result = await client.query(add_user_query,values)

    return result.rows[0]

  }catch(error){

    console.log("une erreur s'est produit pour l'ajout d'un user dans la table users : ",error)
  }

  finally{
    client.release()
  }
}



async function update_pending_messages(user_id,data){

  //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx : ",user_id," : typeof(user_id)",typeof(user_id))

  const client = await fastify.pg.connect()

  const list_data = JSON.stringify(data)

  try{

    const userCheckQuery = `SELECT user_id FROM public.users WHERE user_id=$1`

    const userCheckResult =await client.query(userCheckQuery,[user_id])

    if(userCheckResult.rows.length===0){

      throw  new Error(`l'id ${user_id} n'existe pas dans la table users : `)
    }


    const update_query = `UPDATE users SET pending_message=pending_message || $2  WHERE user_id = $1 RETURNING pending_message`

    const result =await client.query(update_query,[user_id,list_data])

    const final_result = result.rows[0]["pending_message"]



    return final_result


  }catch(error){
    console.log("Une errer s'est produit par la mise à jour de la colone messages user_id : ",user_id," data : ",data," error : ",error)
  }finally{
    client.release()
  }

}





async function getPendingMessage(user_id){

  const client = await fastify.pg.connect()

  try{

    const queryGetPendingMessage = `SELECT pending_message FROM public.users WHERE user_id = $1`

    const result = await client.query(queryGetPendingMessage,[user_id])


    console.log("result dans getPendingMessage : ",result)

    return result.rows[0]?.pending_message || [];

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

    const querySetPendingMessage = `UPDATE public.users

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





async function dropTable(){


  const client = await fastify.pg.connect()

  try{

    const dropQuery = `DROP TABLE IF EXISTS public.users`;

    await client.query(dropQuery)

    //console.log("la supression de la table users a été un succes : ")


  }catch(error){

    console.log("une erreur est survenue pour la supression de la table users : ",error)

  }finally{
    client.release()
  }


} 

/*
setTimeout(async ()=>{
  const result = await read_users()

  console.log("result : ",result)


},500)

*/

//creation de la tabler users 


/*
setTimeout(async ()=>{

await dropTable()

await create_users_table()

},1000)
*/





//ajout d'un user 


/*
setTimeout(async ()=>{

   const user2 =  await add_user({user_id:"2555",name:"aomine"})

  console.log("deuxième test  user2 : ",user2)

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

//Stockage des relations userID --- socket.id 


let userSocketMap = new Map();

    // Initialiser Socket.IO avec le serveur HTTP standard
const io = new Server(fastify.server,{
  cors: {
    origin:"*",// Autoriser toutes les origines temporairement
    methods: ["GET", "POST"]
  },

    pingTimeout: 10000, // Temps d'attente avant déconnexion (10 secondes)
    pingInterval: 10000,  // Envoi des pings toutes les 5 secondes*
    ackTimeout: 10000, // Temps en millisecondescl

    })
 

io.on('connection',async (socket)=>{

  
  async function send_pending_msg(user_id){

    
    const pending_msg_list = await getPendingMessage(user_id)

    console.log("pending_msg_list pour  : ",pending_msg_list," name : ",user_name)

    if (pending_msg_list.length !== 0) {
        console.log("pending_msg_list non vide ", pending_msg_list," name : ",user_name);

        for (const msg of pending_msg_list) {
          socket.emit("message_from_server", msg); // ✅ un seul message à la fois
        }

        await setPendingMessage(user_id);
      }


    else{
      console.log("pas de messages pour user_name ",user_name)
    }
  }
  

  let user_id = socket.handshake.auth.user_id

  let user_name = socket.handshake.auth.user_name


  //console.log("voici user_id : ",user_id)


  const sid = socket.id

  if(user_id && user_id!==0){

    userSocketMap.set(user_id,sid)
    
    //console.log("voici le userSocketMap : ",userSocketMap)
  
  }


  socket.on("virus",(message,callback)=>{
    //console.log("voici le message du client : ",message)

    callback("je suis le backend via socket : ",)
  })

  await send_pending_msg(user_id)


  socket.on("register",async(data)=>{
    
    console.log("nouveau donnée envoyé par le user : ",data)
    
    const result = await add_user(data)

    console.log("result : ",result)

    user_id = data.user_id

    userSocketMap.set(user_id,sid)




  })

  socket.on("message_from_client",async (data)=>{

    console.log("nouveau message arrivé : ",data)

    const recipient_id = data.recipient_id

    const recipient_sid = userSocketMap.get(data.recipient_id)
    

    if(!recipient_sid){
      console.log("ce data.sender_name n'existe pas dans userSocketMap voici userSocketMap : ",userSocketMap)

      const  result_updating_message = await update_pending_messages(recipient_id, data)

      console.log("resultde la mise à jour de data.sender_name : ",result_updating_message)

      return
    }


    io.to(recipient_sid).emit("message_from_server",data)


  })

  // evenevment messages

  socket.on('disconnect',()=>{
    console.log(`ce socket ${socket.id} s'est déconnecter : `)
    if(user_id && userSocketMap.has(user_id)){
      userSocketMap.delete(user_id);
      console.log("userSocketMap après déconnexion de l'userId ",user_id," : ",userSocketMap)
    }



  })



})


const port = process.env.PORT || 5000;
fastify.listen({ port, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Serveur Fastify avec Socket.IO en écoute sur ${address}`);
});
