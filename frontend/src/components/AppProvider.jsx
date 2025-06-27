import React, {createContext,useState,useContext,useEffect} from 'react'

import {nanoid} from 'nanoid'
import io from 'socket.io-client';




export const AppContext =  createContext()



const check_admin_function = ()=>{
	
	const user_id = localStorage.getItem("user_id")

	if(!user_id){
		return -1
	}

	if(user_id && user_id.startsWith("infni")){
		return 1
	}

	if(user_id && !user_id.startsWith("infni")){

		//console.log("user_id : ",user_id)
		return 0
	}
}


const init_socket = () => {

    if (!window.socket) {  // ✅ Éviter la double connexion

        const user_id = localStorage.getItem('user_id')

        //console.log("userId dans AppProvider et window.socket : ",userId)

        window.socket = io("https://boxeur.onrender.com/",
            {
            auth: {
                user_id: user_id?user_id:'0', 
            
               
            }});



        window.socket.on("disconnect",()=>{
            console.log("le socket s'est déconnecté : ")
        })
    }
    
    return window.socket;
};



const init_profileList = ()=>{

	const storedProfileList= JSON.parse(localStorage.getItem("profileList"))

	const defaultProfileList = [
			
			{
				name:"infni",
				id:"infni",
				key:"infni",
			},

		


	]


	if(!storedProfileList){

		return defaultProfileList
	}



	return storedProfileList

}


const init_messageObject =()=>{

	const storedMessageObject = JSON.parse(localStorage.getItem("messageObject"))


	const defautMessageOject = {

	}

	if(!storedMessageObject){
            
          //console.log("il existe riens dans init_messageObject ")
		return defautMessageOject

	}

	
	return storedMessageObject
}



init_socket()




socket.emit("virus",{message:"je suis le frontend via socket : "},(reponse)=>{

	console.log("reponse du server : ",reponse)
	
})


const AppProvider = ({children})=>{



	//console.log("checkAdmin dans AppProvider : ",checkAdmin)

	const [messageObject,setMessageObject] = useState(init_messageObject)

	//console.log("messageObject dans AppProvider : ",messageObject)

	const [profileList,setProfileList] = useState(init_profileList)


	useEffect(() => {
  		const socket = window.socket; // toujours utiliser le même socket déjà initialisé

  		const handleMessage = (data) => {
    
    	const sender_id = data.sender_id;

   	    const check_profileList = profileList.some(profile => sender_id === profile.id);

    	if (!check_profileList) {
      	
      		const newProfile = {
      	    name: data.sender_name,
       	    id: data.sender_id,
       	    key: nanoid(),
     	   
     	    };

     	    setProfileList(prev => {
       
            const updatedPrev = [...prev, newProfile];
        
            localStorage.setItem('profileList', JSON.stringify(updatedPrev));
       
            return updatedPrev;
    	
    	   });
        }



    	setMessageObject(prev => {
    
        const updatedPrev = { ...prev };

        if (!updatedPrev[sender_id]) {
      
            updatedPrev[sender_id] = [data];
     
          } else {
       
        updatedPrev[sender_id] = [...updatedPrev[sender_id], data];
     
       }

     
        localStorage.setItem('messageObject', JSON.stringify(updatedPrev));
    
       return updatedPrev;
  
        });


        };

 

        socket.on("message_from_server", handleMessage);

      
        // 🔄 Nettoyage du listener au démontage (important !)


        return () => {
  
        socket.off("message_from_server", handleMessage);
 
        };


       }, []); // ⬅️ tableau vide : exécuté une seule fois

      

	return(

		<AppContext.Provider value = {{messageObject,setMessageObject,profileList,setProfileList}}>

			{children}



		</AppContext.Provider>



		)


}


export default AppProvider