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

	const navigate = useNavigate()

	return(
		<div className = "entete_chatBox">	
			
			<div className ="div_profile_admin">
				<FaArrowLeft onClick={()=>navigate("/home")} />

				<img src = {img_admin} className = "img_admin" /> 

				<p className = "text_admin" >

					admin

				</p>

			</div>


			<FaBars size={22} />

			
		</div>


		)
}




const MessageLine = ({token})=>{

	const user_id = localStorage.getItem('user_id')

	
	const bleu_jolie ="#1a73e8"

	const gris_jolie = "#F0F1F2"

	let align

	let bgColor


	let transition

	//console.log("token : ,",token)

	//console.log("token.senderId : ",token.senderId)



	if(token.sender_id ===user_id){

		transition= "right"
		
		bgColor = bleu_jolie
		align='flex-end'

	}
	else{

		transition="left"
		bgColor= gris_jolie
		align='flex-start'
	}
	


	return(
		<div style  = {{

						width:"100%",
						padding:"1%",
						paddingLeft:"7%",

						paddingRight:"7%",
						display :"flex",

					
						justifyContent:align,

						}}>

			<div style = {{
				backgroundColor:bgColor,
				display :"inline-block",
				maxWidth :"70%",

			}}

			className = {transition==="left"?"left token_msg":"right token_msg"}

		


			>

				{token.message}


			</div>

		</div>
		)
}





const Milieu = ()=>{


	const {id} = useParams()


	const {profileObject,scroll,setScroll,midleHeight,setMidleHeight} = useContext(AppContext)

	const containerRef = useRef(null)


	useEffect(()=>{
		if(containerRef.current){
			containerRef.current.scrollTop=containerRef.current.scrollHeight
		}
		
		setScroll(0)


	},[profileObject[id],scroll])


	if (!profileObject[id]){
	
		return <div className = "milieu_chatBox">profileObject encore vide</div>;

	}


	return(

        

		<div className ="milieu_chatBox" ref = {containerRef} style={{height:midleHeight}}   >

			
			{
				profileObject[id]["messages"].map(token_of_messages=><MessageLine token = {token_of_messages} key = {token_of_messages.key} />)
			}
	

		</div>

		)


}






const Bottom = ()=>{



	const [textAreaHeight,setTextAreaHeight]=useState("6%")

	const {id} = useParams()

	const {profileObject, setProfileObject,scroll,setScroll,midleHeight,setMidleHeight} = useContext(AppContext)

	const user_id = localStorage.getItem('user_id')

	const user_name = localStorage.getItem('user_name')

	const inputRef = useRef(null)   

	const [inputMessage,setIntputMessage] = useState("") 


	const changeMessage= (e)=>{

		const value = e.target.value


 		 const charCount = value.length;

		setIntputMessage(value)
		//console.log(inputMessage) const charCount = value.length;

		  // Ajuster la hauteur selon le nombre de caractères

		const el = inputRef.current;
  if (el && el.scrollHeight > el.clientHeight) {
  	console.log("nouveau hauteur : ")
  	
  	setMidleHeight(lastHeight=>{


    	const lastHeightNumber = parseInt(lastHeight)
    	const newHeightNumer = lastHeightNumber-2
    	return newHeightNumer.toString()+"%"
    }

  		)
    setTextAreaHeight(lastHeight=>{


    	const lastHeightNumber = parseInt(lastHeight)
    	const newHeightNumer = lastHeightNumber+2
    	return newHeightNumer.toString()+"%"
    })
 

    // Tu peux ici déclencher une logique ou agrandir automatiquement
  }
		


	}


	const send = ()=>{


		setIntputMessage("")
		setTextAreaHeight("6%")
  		setMidleHeight("84%")
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

		setProfileObject(prev=>{
			const updatePrev = {...prev}

			const updateProfile = {...prev[id],messages:[...prev[id]["messages"],token]}

			return {...prev,

				[id]:updateProfile}
		})


		
		socket.emit("message_from_client",token)


		
	}

	return(
		<div className = "bottom_chatBox"   style = {{height:textAreaHeight}} >

			<div className = "div_icon_bottom">

				< MdPhotoCamera size={30} color="#1a73e8" />

				<MdVideocam size={30} color="#1a73e8" />

				<FaMicrophone className = "micro" size={28} color="#1a73e8" />



			</div>
			
		
		
				<textarea
  					ref={inputRef}
  					placeholder="Message..."
  					onChange={changeMessage}
  					value={inputMessage}
  					onFocus={() => 

  						{

  					setTextAreaHeight("8%")
  					setScroll(1)
  						}
  					}

  					onBlur={()=>
  						{
  							setTextAreaHeight("6%")
  							setMidleHeight("84%")

  						}


  					}
  					rows={1}
 				  
					/>


				<IoSend size={30} color="#1a73e8" onClick ={send} />



			
			


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