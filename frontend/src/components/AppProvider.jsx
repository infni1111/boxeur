import React, {createContext,useState,useContext,useEffect} from 'react'

import {nanoid} from 'nanoid'
import io from 'socket.io-client';




export const AppContext =  createContext()


const isMobile = () => {
  return /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
}

if(isMobile()){
	//alert("c'est un Android")
}

else{
	//alert("c'est l'ordinateur")
}


const init_socket = () => {

    if (!window.socket) {  // ✅ Éviter la double connexion

        const user_id = localStorage.getItem('user_id')

        //console.log("userId dans AppProvider et window.socket : ",userId)
        //https://boxeur.onrender.com/

        window.socket = io("http://192.168.43.192:5000",
            {
            auth: {
                user_id: user_id?user_id:'0', 
               
            }});

        //window.socket.on("connect",()=>alert("rat"))

        window.socket.on("disconnect",()=>{
            console.log("le socket s'est déconnecté : ")
        })
    }
    
    return window.socket;
};



const init_profileObject = ()=>{

	const storedProfileObject= JSON.parse(localStorage.getItem("profileObject"))

	const defaultProfileObject = {
			
			infni:{
				name:"infni",
				id:"infni",
				messages:[],
			},

	
	}


	if(!storedProfileObject){

		localStorage.setItem('profileObject',JSON.stringify(defaultProfileObject))

		console.log("verification du bon stockage de profileObject : ",JSON.parse(localStorage.getItem('profileObject')))

		return defaultProfileObject
	}

	//console.log("si ceci est affiché, il doit y avoir storedProfileList : ",storedProfileList)

	return storedProfileObject

}



init_socket()




socket.emit("virus",{message:"je suis le frontend via socket : "},(reponse)=>{

	//console.log("reponse du server : ",reponse)
	
})


const AppProvider = ({children})=>{



	const [profileObject,setProfileObject] = useState(init_profileObject())

	//console.log("profileList dans AppProvider : ",profileList)

	useEffect(() => {

  		const socket = window.socket; // toujours utiliser le même socket déjà initialisé

  		const handleMessage = (data) => {
    
    	//console.log("data de handleMessage : ",data)
    	const sender_id = data.sender_id;

    	//console.log("sender_id dans AppProvider : ",sender_id)

    	//console.log("storedProfileList dans AppProvider : ",storedProfileList)


   	 		setProfileObject(prev => {
 		            
 		            const existingProfile = prev[data.sender_id];

  				   	if (existingProfile) {
	   					const updatedMessages = [...existingProfile.messages, data]; // nouvelle référence
					    const updatedProfile = { ...existingProfile, messages: updatedMessages };
					    return { ...prev, [data.sender_id]: updatedProfile };
					  } else {
					    const newProfile = {
					      name: data.sender_name,
					      id: data.sender_id,
					      messages: [data],
					    };
					    return { ...prev, [data.sender_id]: newProfile };
					  }
					});


        };

 

        socket.on("message_from_server", handleMessage);

      
        // 🔄 Nettoyage du listener au démontage (important !)


        return () => {
  
        socket.off("message_from_server", handleMessage);
 
        };


       }, []); // ⬅️ tableau vide : exécuté une seule fois

      

	return(

		<AppContext.Provider value = {{profileObject,setProfileObject}}>

			{children}



		</AppContext.Provider>



		)


}


export default AppProvider