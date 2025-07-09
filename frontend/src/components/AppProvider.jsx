import React, {createContext,useState,useContext,useEffect} from 'react'

import {nanoid} from 'nanoid'
import io from 'socket.io-client';




export const AppContext =  createContext()





const init_user_id =async ()=>{

	const user_id= localStorage.getItem('user_id')

	if(!user_id){
		const first_user_id = nanoid()

		localStorage.setItem('user_id',first_user_id)

		return first_user_id
	}



	return user_id
}





const init_isMobile = () => {
  return /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
}


const init_socket = async () => {

    if (!window.socket) {  // ✅ Éviter la double connexion

        const user_id = localStorage.getItem('user_id')

        const user_name = localStorage.getItem('user_name')

        //console.log("userId dans AppProvider et window.socket : ",userId)
        //https://boxeur.onrender.com/
        //http://192.168.43.192:5000

        window.socket = io("http://192.168.43.192:5000/",
            {
            auth: {
                user_id: await init_user_id(), 
              
               
            },

            
             reconnection: true,           // ✅ Active la reconnexion automatique
	         reconnectionAttempts: 1000,     // ✅ Nombre maximal de tentatives
	     	 reconnectionDelay: 2000,      // ✅ Délai initial (2 secondes)
	     	 reconnectionDelayMax: 1000,  // ✅ Délai max entre les tentatives
	     	 timeout: 20000                // ✅ Timeout pour la connexion (20 secondes)

			



        });

        //window.socket.on("connect",()=>alert("rat"))




		window.socket.emit("virus",{message:"je suis le frontend via socket : "},(reponse)=>{

			console.log("reponse du server : ",reponse)
			
		})

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





const AppProvider = ({children})=>{

	
	const [initial_appHeight] = useState(window.visualViewport.height)

	const [appHeight,setAppHeight] = useState(window.visualViewport.height)

	

		useEffect(() => {
		    const viewport = window.visualViewport;

		    const handleResize = () => {
		      const height = viewport.height;

		      setAppHeight(height)
		    };

		    viewport.addEventListener('resize', handleResize);
		    
		    return () => {
		      viewport.removeEventListener('resize', handleResize);
		    };
		  }, []);

	



	const [profileObject,setProfileObject] = useState(init_profileObject())

	const [scroll,setScroll] = useState(0)

	const [isMobile]= useState(init_isMobile())

	//console.log("profileList dans AppProvider : ",profileList)

	useEffect(() => {

  		const socket = window.socket; // toujours utiliser le même socket déjà initialisé

  		const handleMessage = (data) => {
    
    	console.log("data de handleMessage : ",data)
    	const sender_id = data.sender_id;

    	//console.log("sender_id dans AppProvider : ",sender_id)

    	//console.log("storedProfileList dans AppProvider : ",storedProfileList)

		setProfileObject(prev => {
	        
	        const existingProfile = prev[data.sender_id];

		   	if (existingProfile) {
				const updatedMessages = [...existingProfile.messages, data]; // nouvelle référence
		    const updatedProfile = { ...existingProfile, messages: updatedMessages };
		    const updatedPrev = { ...prev, [data.sender_id]: updatedProfile };
		    localStorage.setItem('profileObject',JSON.stringify(updatedPrev))
		    return updatedPrev
		  } else {
		    const newProfile = {
		      name: data.sender_name,
		      id: data.sender_id,
		      messages: [data],
		    };

		    const updatedPrev = { ...prev, [data.sender_id]: newProfile };

		    return updatedPrev
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

		<AppContext.Provider value = {{profileObject,setProfileObject,scroll,setScroll,initial_appHeight,setAppHeight}}>

			{children}



		</AppContext.Provider>



		)


}


export default AppProvider