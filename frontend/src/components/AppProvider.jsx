import React, {createContext,useState,useEffect} from 'react';

import io from 'socket.io-client';

import super_admin_img from '../assets/images/super_admin.jpg'


import admin from '../assets/images/admin.jpg'


import infni from '../assets/images/infni.jpg'



export const AppContext = createContext()






const defaultList = {}


const initializeMessage =()=>{
    const storedMessage = JSON.parse(localStorage.getItem('messages'))
    
}


const initializeFriendList =()=>{
	
    const storedList = JSON.parse(localStorage.getItem('friendList'))

	if(!storedList){
		localStorage.setItem('friendList',JSON.stringify(defaultList))
		return defaultList
	}

    console.log("friendList dans initializeFriendList : ", storedList)
	return storedList
}


const initializeChoiceList =()=>{
    
    const storedList = JSON.parse(localStorage.getItem('choiceList'))

   
    if(!storedList){
        localStorage.setItem('choiceList',JSON.stringify(defaultList))
        return defaultList
    }

    return storedList
}



const initializeLastAccess =()=>{
    

    const defaultLastAccess = Date.now()
    
    const storedLastAccess = localStorage.getItem('lastAccess')
    
    if(!storedLastAccess){
        localStorage.setItem('lastAccess',defaultLastAccess)
        return defaultLastAccess
    }

 
    return storedLastAccess
}



const inintializeMessageObject =()=>{
    const storedChoiceList = JSON.parse(localStorage.getItem('choiceList'))
     const storedFrienList = JSON.parse(localStorage.getItem('friendList'))

    let data = {}

    if(storedFrienList){
         //console.log("friendList present dans le localStorage pour inintializeMessageList xxxxxxxxx : ",storedFrienList)
         //console.log("choiceList present dans le localStorage pour inintializeMessageList xxxxxxxxx : ",storedChoiceList)

        const reverseFriendList = Object.values(storedFrienList)

        //console.log("voici reverseFriendList pour inintializeMessageObject : ",reverseFriendList)
        
        reverseFriendList.some(obj=>{

            const pendingFile = obj.pendingFile

            //console.log("pendingFile dans AppProvider x : ",storedFrienList)

            if(pendingFile.length!==0){

                data[obj.id]=pendingFile
            
            }

            else{
              
            }
        })

        

      
    }

    else{
        console.log("friendList absent dans le localStorage pour inintializeMessageList : ",storedFrienList)
    }

    return data
}


const reset_message_objet = ()=>{

    const storedFrienList = JSON.parse(localStorage.getItem('friendList'))


    // console.log("friendList dans localStorage pour reset_message_objet : ",storedFrienList)
    const newFriendList ={}

    if(storedFrienList){

     

        const messageListFilter = Object.values(storedFrienList).some(obj=>{
            obj.pendingFile=[]

            newFriendList[obj.id]=obj

         
        })


        localStorage.setItem('friendList',JSON.stringify(newFriendList))

        //Verication du stockage de newFriendList

        //console.log("voici newFriendList dans le localStorage dans reset_message_objet : ",JSON.parse(localStorage.getItem('friendList')))
        
        return newFriendList

    }

    else{
        console.log("friendList absent dans le localStorage : ",friendList )
    }
}



const pendingFileList = inintializeMessageObject()


//console.log("pendingFileList dans AppProvider : ",pendingFileList)

window.addEventListener("beforeunload", () => {
    
    const time_close = Date.now()

    localStorage.setItem("lastAccess", time_close);

});




const init_socket = () => {

    const choiceListStored=JSON.parse(localStorage.getItem('choiceList'))

    // console.log("voici choiceList dans localStorage : ",choiceListStored)

    const list_id =[]

    const messageObject = inintializeMessageObject()

    //console.log("messageObject dans AppProvider : ",messageObject)

    if(choiceListStored){

        Object.keys(choiceListStored).forEach(key=>list_id.push(key))

       // console.log("voici la liste des id : ",list_id)

    }



    if (!window.socket) {  // ✅ Éviter la double connexion

        const user_id = localStorage.getItem('user_id')

        //console.log("userId dans AppProvider et window.socket : ",userId)

        window.socket = io("http://localhost:5000",
            {
            auth: {
                user_id: user_id?user_id:'0', 
                idList:list_id,
                messageObject:messageObject
               
            }});
         

        


        window.socket.on("disconnect",()=>{
            console.log("le socket s'est déconnecté : ")
        })
    }
    
    return window.socket;
};




init_socket()


const AppProvider = ({children})=>{
    
    const [ready,setReady] = useState(false)

	const [user_id, setUserId] = useState(localStorage.getItem("user_id"))

    const [lastAccess,setLastAccess] = useState(initializeLastAccess)
    
	const [friendList,setFriendList] = useState(initializeFriendList)  
    
	const [choiceList, setChoiceList] = useState(initializeChoiceList);

    useEffect(() => {
         if (ready) {
             setChoiceList(initializeChoiceList());
                  }
        }, [ready]);



     const messageObject= inintializeMessageObject()

     socket.on("connect",()=>{
            //console.log("une première connection à été établie ")

            if(Object.values(messageObject).length!==0){
               const newFriendList =  reset_message_objet()

               setFriendList(prev=>{

                //console.log("acien friendList : ",prev)

                //console.log("nouvelle valeur de friendList : ",newFriendList )

                return newFriendList
               })
            }

            else{
               // console.log("la file d'attente des mesage est vide pour la mise à jour de friendList dans l'evenement connect dans AppProvider: ",messageObject)
            }

        })

     socket.on('pending_message',(data,callback)=>{
        console.log("nouvelle données dans l'evenement pending_message : ",data)

        const list_pendingMessage = data['pending_message']

        console.log("i love infni, it is my name")

        console.log("list_pendingMessage : ",list_pendingMessage)
      
        
        list_pendingMessage.forEach(element=>{
            


            setFriendList(prev=>{

                const user_id_sender = element.sender
               
                const updatedPrev = { ...prev }; // Copie superficielle
               
                if(updatedPrev[user_id_sender]){
                    console.log("ce user_id_sender existe")

                    const current_tokenFile = [...updatedPrev[user_id_sender]["tokenFile"]]


                    const check = current_tokenFile.some(token=>element.key===token.key)



                   if(!check){
                     updatedPrev[user_id_sender]["tokenFile"].push(element)

                    console.log("updatedPrev : ",updatedPrev)

                    localStorage.setItem('friendList',JSON.stringify(updatedPrev))

                    return updatedPrev
                   }

                   else{
                    //console.log("cette element existe déjà")
                   }
                }


                localStorage.setItem('friendList',JSON.stringify(updatedPrev))


                //console.log("verification de friendList dans l'evenement pending_message dans le localStorage : ",JSON.parse(localStorage.getItem('friendList')))
                return updatedPrev;


            })
        })
        callback("le client a recu bien les données dans l'evenement pending_message :")
     })


     socket.on('broadcast',(newProfile)=>{

        console.log("nouveau user créé : ",newProfile)

        if(Object.values(newProfile)!==0){

            newProfile.pendingFile = []
            newProfile.tokenFile = []

            const localChoiceList = JSON.parse(localStorage.getItem('choiceList'))||{}

            localChoiceList[newProfile["user_id"]]=newProfile

            localStorage.setItem('choiceList',JSON.stringify(localChoiceList))

            console.log("vérification de localChoiceList : ",localChoiceList)
            
            setChoiceList(localChoiceList)


        }
        else{
            console.log("nouveau profile crée null : ",data)
        }
     })
  
     socket.on("newUsers",(users,callback)=>{
         console.log("voici la data de newUsers : ",users)
        
        if(!users){
            setReady(true)

            console.log("i love hacking")
        }


        else{

            if(users && Object.values(users).length!==0){


                let choiceListStored = initializeChoiceList()
               
                 Object.keys(users).forEach((key) => {
                 users[key].tokenFile = [];
                 users[key].pendingFile=[];
                 });
               
               const newChoiceList = {...users,...choiceListStored}

               console.log("choiceList mis à jour : ",newChoiceList)

               localStorage.setItem('choiceList',JSON.stringify(newChoiceList))
               
               setChoiceList(newChoiceList)
     
            }


             setReady(true)

        }

        callback("données recu dans l'evenement newUsers")
    })


     useEffect(() => {
    if (!window.socket) return;

    // Éviter la duplication d'événements
    window.socket.off("message_from_server");
    
    window.socket.on("message_from_server", (data, callback) => {

        console.log("voici les données envoyées par le serveur : ", data);

        const senderId = data.sender;

        console.log("voici senderId : ",senderId)

        if (senderId) {

            const storedFrienList = JSON.parse(localStorage.getItem('friendList'))


            if(!storedFrienList){
                console.log("storedFrienList null ou undefined dans message_from_server : ",storedFrienList)

                return
            }



            const array_friendList = Object.values(storedFrienList);

            const check = array_friendList.some(obj => {
    
                    const check_return = obj.user_id === senderId

                    return check_return

                         }
                    );
            console.log("voici check pour vérifier new senderId dans friendList : ", check);

            if(!check){

                console.log("faux faux faux faux faux faux faux faux faux faux faux faux faux faux faux ",check)

                setFriendList(prev=>{

                    const storedChoiceList= JSON.parse(localStorage.getItem('choiceList'))

                    if(!storedChoiceList){
                        console.log("storedChoiceList absent dans message_from_server : ",storedChoiceList)
                        return
                    }


                    console.log("storedChoiceList dans message_from_server : ",storedChoiceList)
                  
               
                    let updatedPrev = {...prev}

                    const element = storedChoiceList[senderId]



                    const isDuplicate = element["tokenFile"].some(token => token.timeStamp === data.timeStamp);

                    if(!isDuplicate){

                    element["tokenFile"]=[...element["tokenFile"],data]
                     console.log("last updatedPrev : ",updatedPrev)
                    
                    updatedPrev[senderId]=element

                    console.log("new updatedPrev : ",updatedPrev)

                    localStorage.setItem('friendList',JSON.stringify(updatedPrev))


                    console.log("verification de friendList dans l'evenement pending_message dans le localStorage : ",JSON.parse(localStorage.getItem('friendList')))
               
                    }
                  
                 
                      
                     return updatedPrev;

                })

                
            }

            else{
                console.log("ce senderId se trouve dans friendList : ")

                setFriendList(prev=>{
                    let updatedPrev = {...prev}


                    let current_tokenFile = updatedPrev[senderId]["tokenFile"]

                    const isDuplicate = current_tokenFile.some(token => token.timeStamp === data.timeStamp);

                    if (!isDuplicate) {


                
                    current_tokenFile = [...current_tokenFile, data];
                    
                    updatedPrev[senderId]["tokenFile"] = current_tokenFile;



                    localStorage.setItem('friendList',JSON.stringify(updatedPrev))

                    console.log("updatedPrev dans message_from_server :: ",updatedPrev)
        
                    }
        
                    return updatedPrev

                })
            }



        }
        callback("j'ai bien reçu les messages dans l'evenement message_from_server");
    });

    return () => {
        window.socket.off("message_from_server"); // Nettoyage à la suppression du composant
    };
}, [friendList]); // Dépendances : le callback se mettra à jour quand friendList change





 
	return (

			<AppContext.Provider value = 
			{{friendList,setFriendList,
				
				user_id,setUserId,
				choiceList,setChoiceList,
              
				}}

			 >


				{children}

			</AppContext.Provider>

		)
}



export default AppProvider
