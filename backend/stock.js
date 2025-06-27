    const fastify = require('fastify')({
      logger: true
    });


    fastify.register(require('@fastify/postgres'), {
  connectionString: 'postgres://admin:admin@localhost:5433/db'
});

// Vérifiez la connexion PostgreSQL après le démarrage du serveur
fastify.ready(async (err) => {
  if (err) {
    console.log.error('une erreur s"est produite :', err.message);
   
    process.exit(1); // Arrête l'application si une erreur survient
  }

  // Test de la connexion PostgreSQL
  try {
    const client = await fastify.pg.connect();
    fastify.log.info('Connexion PostgreSQL établie avec succès.');
    client.release();
  } catch (error) {
    fastify.log.error('Erreur de connexion à PostgreSQL :', error.message);
    process.exit(1); // Arrête l'application si la connexion échoue
  }
});

// Exemple de route
fastify.get('/test', async (request, reply) => {
  const client = await fastify.pg.connect();
  try {
    const result = await client.query('SELECT NOW();'); // Vérifie la date/heure actuelle du serveur
    reply.send({ time: result.rows[0].now });
  } catch (err) {
    reply.status(500).send({ error: 'Erreur lors de la requête PostgreSQL' });
  } finally {
    client.release();
  }
});

// Démarrage du serveur
fastify.listen({ port: 5000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Serveur en écoute sur ${address}`);
});

    

     const httpServer = require('http').createServer((req, res) => {
    fastify.server.emit('request', req, res);
    });


    // Initialiser Socket.IO avec le serveur HTTP standard
    const io = require('socket.io')(httpServer, {
      cors: {
        origin: "localhost:3000", // Autoriser toutes les origines temporairement
        methods: ["GET", "POST"]
      },

      pingTimeout: 10000, // Temps d'attente avant déconnexion (10 secondes)
      pingInterval: 10000,  // Envoi des pings toutes les 5 secondes*
      ackTimeout: 10000, // Temps en millisecondescl

    });


    

    // Reste de votre logique Socket.IO
    io.on('connection', (socket) => {
      console.log("Client connecté :", socket.id);
      // Autres événements
    });










    //Stockage des relations userID --- socket.id 

    let userSocketMap = new Map();

    const messageDb = {
      

      id7:{

        dataBase:[],
        dataFile:[],
      
        currentSending: false

      },

      id1:{

        dataBase:[],
        dataFile:[],
      
        currentSending: false

      },
      
      id2: {

        dataBase:[],
        dataFile:[],
       
        currentSending:false,

      },
       id3: {

        dataBase:[],
        dataFile:[],
       
        currentSending:false,

      },

       id4: {

        dataBase:[],
        dataFile:[],
       
        currentSending:false,

      },
       id5: {

        dataBase:[],
        dataFile:[],
       
        currentSending:false,

      },
       id6: {

        dataBase:[],
        dataFile:[],
       
        currentSending:false,

      },
       id8: {

        dataBase:[],
        dataFile:[],
       
        currentSending:false,

      },

       id9: {

        dataBase:[],
        dataFile:[],
       
        currentSending:false,

      },

      id9: {

        dataBase:[],
        dataFile:[],
       
        currentSending:false,

      }














    }





    const tempUserId = ["id1","id2","id3","id4","id5","id6","id7","id8","id9","id10"]


    const friendList = [

        {
          imageSrc:"media/gojo1.jpeg",
          id:"gojo1"

        },

        {
          imageSrc:"media/gojo2.jpeg",
          id:"gojo2"     
        },
       
        {
          imageSrc:"media/gojo3.jpeg",
          id:"gojo3"

        }

      ]



    const accueilList = [

        {
          imageSrc:"media/gojo1.jpeg",
          id:"gojo1"

        },

        {
          imageSrc:"media/gojo2.jpeg",
          id:"gojo2"     
        },
       
        {
          imageSrc:"media/gojo3.jpeg",
          id:"gojo3"

        },
          {
          imageSrc:"media/hacker4.jpeg",
          id:"gojo3"

        },
          {
          imageSrc:"media/hacker5.jpeg",
          id:"gojo3"

        },
          {
          imageSrc:"media/hacker6.jpeg",
          id:"gojo3"

        }

      ]









    io.on('connection',(socket)=>{

      //récupération de l'Id de l'utilisateur <
      
      const userId = socket.handshake.auth.user_Id;

      const userIdsid = socket.id 
      
      console.log(userId)



      socket.on("getItem",(message,callback)=>{

        if(message){
          console.log("Voici le message envoyer par le client : ",message)
          callback({status:true,message})
        



        }
        else{
          console.log("aucun message envoyer par le client : ", message)

        }
     
     })








      if(userId && userId!=="first"){

        userSocketMap.set(userId,userIdsid)

        let dataStored

        let dataFile 

        if(messageDb[userId]){
          dataStored = messageDb[userId]
        }

        else {
          console.log("il existe pas cette userId dans la base de donnée")
        }

        if(dataStored){
          dataFile=dataStored["dataFile"]
        }
        else{
          console.log("l'id spécifier n'existe pas dans la BD")
        }

        if(dataFile && dataFile.length>0){

          console.log("l'id spécifier existe  dans la BD")
              console.log("premier pour dataFileStored")  

              messageDb[userId].currentSending=true

             
              io.timeout(3000).to(userIdsid).emit("dataFileStored",dataFile,(err,reponse)=>{
                if(err){
                    

                    console.log("l'envoie de dataFileStored pour la premier connextion a échouer : ",err)

                    messageDb[userId].currentSending=false

                    
                }
                else{

                      messageDb[userId].dataFile = []
                    
                      console.log("L'envoie de dataFileStored vers le client a été un succès dont voici la reponse : ",reponse)

                       messageDb[userId].currentSending=false
                         
                  }
              
              })

            
            }

            else{
              console.log("la Base de données est vide : ",dataFile)
            }


        console.log("Voici à jour la liste des sid : ",userSocketMap)
        console.log("voici l'id : ",userId)
        console.log("connection succès")
     
      }


      else {
        console.log("le socket recu n'a pas de id xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx:  ",userId)
        console.log("je vais lui donner un nouveau id au client : ")


        const id =tempUserId[0]
        
        const data = {
          
          "id":id,
          
          "friendList":friendList,
        
        }


        socket.timeout(3000).emit("newId",data,(err,reponse)=>{

          if(err){
            console.log("l'envoie du nouveau userId au client a echouer : ")
          }

          else {

            if(reponse.status && reponse.message){
              console.log("l'envoie de l'id au client a reussi voici le message : ",reponse.message)
              tempUserId.shift(0)

              userSocketMap.set(id,socket.id)

              console.log("voici à jour la liste de userId : ",tempUserId)
            }
            else {
              console.log("le client a repondu negativement pour la reception du newId : ",reponse)
            }
            
          }

        })
       
      }

      socket.on("disconnect", (reason) => {
      console.log(`Utilisateur déconnecté : ${userId} (SID: ${socket.id}), raison: ${reason}`);

      // Parcourez le dictionnaire pour supprimer la correspondance correcte de SID
      for (const [key, value] of userSocketMap.entries()) {
        if (value === socket.id) {
          userSocketMap.delete(key); // Supprime l'entrée pour cet utilisateur
          console.log(`Connexion supprimée pour l'utilisateur : ${key}`);
          break; // Une fois trouvé, arrêtez la boucle
        }
      }

      console.log("État actuel du dictionnaire :", userSocketMap);
    });



      socket.on("register-id",(name,callback)=>{
        console.log("je suis dans cette section et dans la section register-id je suis dans la section register-id avec ce nom : ",name)
       if(name){
        const sid = socket.id
        userSocketMap.set(name,sid)
        console.log("voici le dictionnaire de sid : ",userSocketMap)
        console.log("un nouveau utilisateur s'est connecter : ",name)
        callback({status:true,message:accueilList})
       }

       else{
        console.log("Erreur inscription utilisateur")
        callback({status:false,message:"il s'est passé une erreur au niveau du serveur "})
       }

      })






     



      socket.on('send_to_server',(message,callback)=>{

          const recipientName = message.recipient
          let dataStored 
          let dataBase
          let dataFile

          console.log("voici le recipientName premier : ",recipientName[0],"second : ",recipientName[3], " : voici sa taille : ",recipientName.length)
          if(messageDb[recipientName]){
            dataStored=messageDb[recipientName]
            dataBase=dataStored["dataBase"]
            dataFile = dataStored["dataFile"]

          }
          


          else {
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx : ",messageDb["id4"])
            console.log("   premier : ",typeof(recipientName[0]),"   deuxieme : ",recipientName[1],"   troisieme : ",recipientName[2],"   quatrieme : ",recipientName[3])
            console.log("ce recipientName n'existe pas dans la base de donnée : ",recipientName)
          }
            
          if(message && recipientName && dataBase && dataFile){
            console.log("avantxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
            console.log("voici le tokenfile",message)
            


            console.log("aprèsxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")

            console.log("voici le destinataire du me message : ",recipientName)
           
            let currentSending =dataStored["currentSending"]
            
            console.log(" je suis bete , pourtant cela marche vraiment : ",currentSending)
            if(!currentSending){
              console.log("dataStored de currentSending est undefined infni infni infni : ",dataStored)
            }


            let recipientSid = userSocketMap.get(recipientName)

            console.log("Voici la bd  du destinataire : ",dataStored,"voici sa file d'attente : ",dataStored["dataFile"],"envoi en cours : ",currentSending)

            const send = (message)=>{
               
         
              if(dataFile.length>0){
                console.log("il existe une file d'attente donc le destinataire n'est pas disponible ")
                messageDb[recipientName].dataFile.push(message)
                console.log("voici la liste de file d'attente à jour avec dataFile.length>1 : ",messageDb[recipientName].dataFile)
              }



              else{


                console.log("la file d'attente est vide, dont on peut essayer de renvoyer ")
                if(!recipientSid){
                     messageDb[recipientName].dataFile.push(message)
                    console.log(" le sid du destinataire est introuvable, voici la liste de file d'attente à jour avec dataFile.length==1 : ", messageDb[recipientName].dataFile)
                  
                }
                else{

                  io.timeout(3000).to(recipientSid).emit('send_to_client',message,(err,reponse)=>{
                    if(err){
                       messageDb[recipientName].dataFile.push(message)
                      console.log("le message envoyer dans la partie recipientSid a echouer, voici l'erreur : ",err)
                    }
                    else{
                      
                      console.log("le message envoyer dans la partie recipientSid a reussi, voici la reponse : ",reponse)

                    }
                  

                  })

                }
              


              }
            

            

            }

            if(currentSending==true){
                console.log("voici la partie critique : ")
                setTimeout(()=>{
                 send(message)
                }, 3000)
        
            }

              else{
              send(message)
            
            }


            callback({status:true,message:"les données ont été bien recu par le serveur "})
         }


         else{
            console.log("il y'a pas de tokenFile ou messageName ")
            if(!dataFile){
              console.log("pas de dataFile")
            }

            if(!dataBase){
              console.log("pas de dataBase")
            }



            callback({status:false,message:"il n'existe pas de token ou de recipient ou autre probleme"})
          }




      })

    })





    // Écouter sur le port 5000
    httpServer.listen(5000, '0.0.0.0', (err,adress) => {

      console.log(`Serveur en écoute sur http://0.0.0.0:5000`);
    });


