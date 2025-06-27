import React, {useContext,useState,useEffect,useRef} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import {AppContext} from './AppProvider'
import './chatBox.css'
import {MdPhotoCamera} from 'react-icons/md'
import {MdVideocam} from 'react-icons/md'
import {FaArrowLeft} from 'react-icons/fa'
import {IoSend} from 'react-icons/io5'
import {FaBars} from 'react-icons/fa'
import {FaMicrophone} from 'react-icons/fa'
import img_admin from '../assets/images/infni.jpg'
import {nanoid} from 'nanoid'


const virus = nanoid()




const Entete = ()=>{

	return(
		<div className = "entete_chatBox">	
			
			<div className ="div_profile_admin">
				<FaArrowLeft />

				<img src = {img_admin} className = "img_admin" /> 

				<p className = "text_admin" >

					admin

				</p>

			</div>


			<FaBars />

			
		</div>


		)
}




const MessageLine = ({token})=>{

	const user_id = localStorage.getItem('user_id')

	
	const bleu_jolie ="#1a73e8"

	const gris_jolie = "#F0F1F2"

	let align

	let bgColor

	//console.log("token : ,",token)

	//console.log("token.senderId : ",token.senderId)



	if(token.sender_id ===user_id){


		
		bgColor = bleu_jolie
		align='flex-end'

	}
	else{
		bgColor= gris_jolie
		align='flex-start'
	}
	


	return(
		<div style  = {{backgroundColor:"blue",
						width:"100%",
						paddingLeft:"300px",
						paddingRight:"300px",
						display :"flex",

						fontSize:"25px",
						justifyContent:align,

						}}>

			<div style = {{
				backgroundColor:bgColor,
				display :"inline-block"

			}}

		


			>

				{token.message}


			</div>

		</div>
		)
}





const Milieu = ()=>{


	const {id} = useParams()


	const {messageObject} = useContext(AppContext)


	if (!messageObject[id]){
	
		return <div className = "milieu_chatBox">messageObject encore vide</div>;

	}



	return(

        

		<div className ="milieu_chatBox">

			
				
			{
				messageObject[id].map(token_msg_obj=>{
					return <MessageLine token = {token_msg_obj} key = {token_msg_obj.key} />
				})
			}
			

		</div>

		)
}






const Bottom = ()=>{


	const {id} = useParams()

	const {messageObject, setMessageObject } = useContext(AppContext)

	const user_id = localStorage.getItem('user_id')

	const user_name = localStorage.getItem('user_name')

	const inputRef = useRef(null)

	const [inputMessage,setIntputMessage] = useState("") 

	const changeMessage= (e)=>{

		setIntputMessage(e.target.value)
		//console.log(inputMessage)

	}


	const send = ()=>{


		setIntputMessage("")

		if(!socket.connected){
			console.log("socket non établie avec le serveur : ",)
			return
		}

		if(!inputMessage){

			console.log("inputMessage vide, veuillez ressayez : ",inputMessage)

			return 
		}



		const token_key = nanoid()

		const token = {
			key:token_key, 
			sender_id:user_id,
			sender_name:user_name,
			recipient_id:id,

			message:inputMessage,


		}


		if(!messageObject[id]){
			//console.log("premier communication avec cette id créer  messageObject",messageObject)
			
			setMessageObject((prev)=>{
				const updatedPrev = {...prev}
				updatedPrev[id] = [token]

				localStorage.setItem('messageObject',JSON.stringify(updatedPrev))

				return updatedPrev
			})

		}

		else{
			setMessageObject((prev)=>{
				
				const updatedPrev = {...prev}
				updatedPrev[id]=[...updatedPrev[id],token]
				localStorage.setItem('messageObject',JSON.stringify(updatedPrev))

				return updatedPrev
			})
		}

		socket.emit("message_from_client",token)


		
	}

	return(
		<div className = "bottom_chatBox">

			<div className = "div_icon_bottom">

				< MdPhotoCamera size={30} color="#1a73e8" />

				<MdVideocam size={30} color="#1a73e8" />

				<FaMicrophone className = "micro" size={28} color="#1a73e8" />



			</div>
			
		
			<div className="div_input"> 

				<input ref = {inputRef} placeholder = "  Message..." onChange = {changeMessage} value = {inputMessage} />

				
				<IoSend size={30} color="#1a73e8" onClick ={send} />

			


			</div>

		</div>
		)
}




const ChatBox=()=>{
	return(

		<div className = "chatbox"> 	
			
			<Entete />

			<Milieu />

			<Bottom />
		</div>


		)
}

export default ChatBox