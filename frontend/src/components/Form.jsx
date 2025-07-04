import React, { useState ,useContext,useEffect} from 'react'

import {useNavigate} from 'react-router-dom'

import {AppContext} from './AppProvider'

import {nanoid} from 'nanoid'


import './Form.css'

const Form = ()=>{

	const {messageObject,setMessageObject,checkAdmin,setCheckAdmin} = useContext(AppContext)


	const navigate = useNavigate()

	const [inputName,setInputName] = useState("")

	const changeName = (event)=>{



		setInputName(event.target.value)


	} 



	const create_user_id = (name)=>{

		if(name==="infni"){

			return "infni"
		}

		return name.split(" ").join("_")+"_"+Date.now()

	}

	
	function check_name(chaine) {
    	
    	return chaine.startsWith("infni");
	

	}


	
	const send = (e)=>{
		
		e.preventDefault()

		if(!inputName){
			console.log("inputName vide : ",)

			return
		}


		if(!socket.connected){
			console.log("socket deconnecté : ")
			return
		}

		const user_id =inputName==="infni"?inputName:nanoid()
		const data = {
			name : inputName,
			user_id:user_id,
			}


			socket.emit("register",data)
			localStorage.setItem("user_name",inputName)
			localStorage.setItem("user_id",user_id)

			setInputName("")

			navigate("/home")

			
			


	}

	return(

		<form className = "form" onSubmit = {send}>

			<div className = "div_name">
				<label htmlFor='inputName'>Nom : </label>

				<input id = "inputName" value ={inputName} onChange={changeName} />



			</div>
			<button type ="submit" className = "button" >

				envoyez


			</button>

		</form>
	
)





}
export default Form