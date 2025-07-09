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
import { HiMicrophone } from 'react-icons/hi'
import { BsMicFill } from 'react-icons/bs'






function demanderNom() {


  while (true) {
    const nom = prompt("Entrez votre nom :");

    if (nom && nom.trim() !== "") {
      alert("Bonjour " + nom + " !");

      if(nom==='infni'){
      	localStorage.setItem('user_id','infni')
      }
      localStorage.setItem('user_name',nom)
      
      return nom

    } else {
      alert("Veuillez entrer un nom valide !");
    }
  }
}





const init_user_name = ()=>{

	const user_name = localStorage.getItem('user_name')

	if(!user_name){
		return demanderNom()
	}


	return user_name
}







const Entete = ()=>{

	const {initial_appHeight} = useContext(AppContext)

	const entete_height = (initial_appHeight/15).toString()+"px"

	const navigate = useNavigate()

	return(
		<div className = "entete_chatBox" style ={{height : entete_height}}>	
			
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


	

	const {profileObject,scroll,setScroll} = useContext(AppContext)

	const containerRef = useRef(null)


	useEffect(()=>{
		if(containerRef.current){
			containerRef.current.scrollTop=containerRef.current.scrollHeight
		}
		console.log("onFocus")
		setScroll(prev=>{
			console.log("je me trouve dans le scroll de useEffect Milieu")

			return 0
		})


	},[profileObject[id],scroll])


	if (!profileObject[id]){
	
		return <div className = "milieu_chatBox">profileObject encore vide</div>;

	}


	return(

        

		<div className ="milieu_chatBox"  ref = {containerRef}  >

			
			{
				profileObject[id]["messages"].map(token_of_messages=><MessageLine token = {token_of_messages} key = {token_of_messages.key} />)
			}
	

		</div>

		)


}






const Bottom = ()=>{

	const {appHeight,initial_appHeight} = useContext(AppContext)

	const [bottomHeight,setBottomHeight]=useState((initial_appHeight/15).toString()+"px") 

	const iconDivRef  = useRef(null)
	const [icon_size,set_icon_size]=useState(30)

	const {id} = useParams()

	const {profileObject, setProfileObject,scroll,setScroll} = useContext(AppContext)

	const user_id = localStorage.getItem('user_id')

	const inputRef = useRef(null)   

	const bottomRef =useRef(null)

	const [inputMessage,setIntputMessage] = useState("") 


	const changeMessage= (e)=>{

		const value = e.target.value


 		 const charCount = value.length;

		setIntputMessage(value)
		//console.log(inputMessage) const charCount = value.length;

		  // Ajuster la hauteur selon le nombre de caractères

		


	}


	const send = async ()=>{


		const user_name = init_user_name()


		setIntputMessage("")
		//setTextAreaHeight("8%")
  		//setMidleHeight("84%")
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

			const newObject = {...prev,

				[id]:updateProfile}

			const updateProfile = {...prev[id],messages:[...prev[id]["messages"],token]}


			localStorage.setItem('profileObject',JSON.stringify{newObject})

			return newObject
		})


		
		socket.emit("message_from_client",token)


		
	}

	return(

		<div className = "bottom_chatBox" ref={bottomRef}   >

			
				<div className = "div_icon_bottom" ref = {iconDivRef}>


						< MdPhotoCamera size={35} color="#1a73e8" className="camera" />

				<MdVideocam size={35} color="#1a73e8" className="camera" />

				<BsMicFill className = "micro" size={27} color="#1a73e8" />



				</div>


		
				<input
  					ref={inputRef}
  					placeholder="Message..."
  					onChange={changeMessage}
  					value={inputMessage}
  					onFocus={() => 

  						{
  							bottomRef.current.style.height="13%"
  							iconDivRef.current.style.display="none"
  							inputRef.current.style.width="85%"
  				

  					setScroll(1)
  					
  						}
  					}

  					onBlur={()=>
  						{	inputRef.current.style.width="40%"
  							bottomRef.current.style.height="8%"

  							iconDivRef.current.style.display="flex"
  							iconDivRef.current.style.width="35%"
  							iconDivRef.current.style.justifyContent="space-between%"
  							

  						
  							send()

  						

  						}


  					}

  					

  					rows={1}
 				  
					/>




				<IoSend size={35} color="#1a73e8" className="send" />

			
			


		</div>
		)
}





const ChatBox=()=>{

	return(

		<div className = "chatbox" > 	
			
			<Entete />

				<Milieu />

				<Bottom />

		
		</div>


		)
}

export default ChatBox