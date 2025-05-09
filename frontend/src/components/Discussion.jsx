import React,{useState,useEffect,useRef,useContext} from 'react'
import {FaArrowLeft,FaCamera,FaMicrophone,FaPaperPlane} from 'react-icons/fa'
import { MdSend } from 'react-icons/md';

import './discussion.css'

import {useParams,useNavigate} from 'react-router-dom'

import {AppContext} from './AppProvider'


const Text = ({text,color})=>{

	return(
		<div
		
		style={{
			color:color


		}}
		>

			{text}


		</div>

		)
}



const Entete =({element})=>{


    const navigate = useNavigate()


	  const {friendList,choiceList} = useContext(AppContext)




	const {id} = useParams()

	const data = friendList[id]


	const click = ()=>{
		navigate("/accueil")

	}

	return(

		<div

		className = "div_entete_disc"
		onClick ={click}

		>	

			<FaArrowLeft color = "blue" />

			<img src = {data.image} className = "img_entete_disc" />

			<Text text = {data.name} color = "blue" />


		</div>
		)
}



const Div_token = ({token})=>{

	const bleu_jolie = "#0C70F2"
	const gris_jolie = "#F0F1F2"
	
	const user_id = localStorage.getItem("user_id")
	const id = "python1739721869367"
	

	let align

	let bg_color


	if(token.sender ===user_id){
		align="flex-end"
		bg_color=bleu_jolie
	}


	else{
		align="flex-start"
		bg_color=gris_jolie
	}






	return(
		<div
		style={{
			display:"flex",
			justifyContent :align,
		
			
			paddingLeft:"20px",
			paddingRight:"20px",
			paddingTop:"20px",
			gap:"10px"

		}}

		>

			<div
			style={{
				backgroundColor:bg_color,
				padding:"5px",
				borderRadius:"20px",
				paddingLeft:"10px",
				paddingRight:"10px",
				maxWidth :"230px",
				
			}}
			>

				{token.message}

			</div>


		</div>

		)
}





const Milieu = ()=>{

	const {id} = useParams()

	const {friendList}=useContext(AppContext)

	return (


		<div

		className = "div_milieu_disc"
		> 


		{
			friendList && friendList[id]["tokenFile"][0]?

			friendList[id]["tokenFile"].map((token)=>{

				return <Div_token key = {token.key} token= {token} />
			}
				) : <p>Aucun token existe </p>

		}
		

		</div>


		)
}





const Bottom = ()=>{

	const {id} = useParams()

	const recipient_id = id

	
	const user_id = localStorage.getItem("user_id")


	const {friendList,setFriendList}=useContext(AppContext)


	const [text,setText] = useState("")

	const [stock,setStock] = useState("")

	const divRef = useRef(null)

	
	const create_key=()=>{

		console.log("friendList dans create_key : ",friendList[recipient_id])

		const taille = friendList[recipient_id]["tokenFile"].length+1

		const timeStamp = Date.now()

		


		const key = user_id+"_"+0+"_"+recipient_id+"_"+timeStamp+"_"+taille

		return key

	}






	const click = () => {
	let key_token= create_key()
  const token = {
    sender: user_id,
    recipient: recipient_id,
    message: text,
    key :key_token,
    timeStamp:Date.now()
  };
 

 console.log("token : ",token)

  setFriendList((prev) => {
  const updatedPrev = { ...prev };

  const recipient = updatedPrev[recipient_id];
  
  // Copie profonde de recipient
  const updatedRecipient = {
    ...recipient,
    tokenFile: [...recipient.tokenFile, token],
  };

  updatedPrev[recipient_id] = updatedRecipient;

  localStorage.setItem('friendList',JSON.stringify(updatedPrev))

  return updatedPrev;
	
	});


  console.log("friendList dans discussion : ",friendList)
  const pendingFile = friendList[recipient_id]["pendingFile"]



  if(pendingFile.length===0){
  	//console.log("pendingFile.length === 0 : ",pendingFile)
  	
  	socket.timeout(2000).emit('message',token,(err,data)=>{
  	
  	if(err){
  	console.log("une erreur est survenu pour l'envoie de donnée vers le serveur : ",err)
  	
  	setFriendList((prev) => {

  	
    // Crée une copie profonde de l'objet friendList

    const updatedPrev = { ...prev }; // Copie superficielle

    updatedPrev[user_id] = { 

      ...prev[user_id], // Copie de l'objet utilisateur spécifique

      pendingFile: [...prev[user_id]["pendingFile"], token], // Nouvelle liste de tokens

    };

    localStorage.setItem('friendList',JSON.stringify(updatedPrev))

    //console.log("voici friendList dans Discussion pour pendingFile.length===0 : ",updatedPrev)


    //console.log("voici friendList de localStorage dans Discussion pour pendingFile.length!==0 : ",JSON.parse(localStorage.getItem('friendList')))


    return updatedPrev;

  });

  	}
  	else{
  		console.log("succès pour l'envoie de donnée vers le serveur, voici la reponse : ",data)
  	}

  })
 
  }
  else{
  	console.log("pendingFile.length !==0 : ",pendingFile)


  	setFriendList((prev) => {

    // Crée une copie profonde de l'objet friendList

    const updatedPrev = { ...prev }; // Copie superficielle

    updatedPrev[user_id] = { 

      ...prev[user_id], // Copie de l'objet utilisateur spécifique

      pendingFile: [...prev[user_id]["pendingFile"], token], // Nouvelle liste de tokens

    }

    localStorage.setItem('friendList',JSON.stringify(updatedPrev))


    //console.log("voici friendList de setFriendList dans Discussion pour pendingFile.length!==0 : ",updatedPrev)

    //console.log("voici friendList de localStorage dans Discussion pour pendingFile.length!==0 : ",JSON.parse(localStorage.getItem('friendList')))



    return updatedPrev;

  });




  }






  setText("")
};



	const handleChange = (event)=>{
		const data = event.target.value 

		setText(data)
	
	}




	return(
		<div
		className = "div_bottom_disc"
		>	

			<div 
			className ="div_icon_disc"

			>
				<FaMicrophone size={35} color="#0C70F2" />

				<FaCamera size ={35} color ="#0C70F2" />
			</div>

			<div 
			className = "div_message_disc"
			>

				<div


				 >

				 	<input 
				 	type = "text"
				 	className = "input"
				 	placeholder = "Ecrivez un Message"
				 	value = {text}

				 	onChange = {handleChange}


				 	 />


				</div>




				<div 
				onClick = {click}
				className="send"
				>
					 <MdSend size = {40} color = "#0C70F2"  />


				</div>


				

			</div>

		</div>

		)
}











const Discussion =()=>{


	return(

		<div

		className = "div_disc"


		>


			<Entete />

			<Milieu />

			<Bottom />

			
		</div>

		)
}



export default Discussion