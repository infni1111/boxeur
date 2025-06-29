import React,{useContext,useState,useEffect} from 'react'

import {useNavigate} from "react-router-dom"
import {AppContext} from './AppProvider'
import './Home.css'


const Entete =()=>{

	return(
		<div className = "entete">

			je suis l'entete


		</div>

		)
}


const Profile = ({profile_user})=>{


	const navigate = useNavigate()


	const click = ()=>{

		navigate(`/chatBox/${profile_user.id}`)

	}

	return(

		<div className = "profile" onClick = {click}>

			{profile_user.name}

		</div>
        
		)
}

const Milieu =()=>{
	
	const {profileObject} = useContext(AppContext)

	console.log("profileObject dans home : ",profileObject)

	//console.log("profileList dans home : ",profileList)

	
	return(
		<div className ="milieu">

			{
				Object.values(profileObject).map(elment_of_object=> <Profile profile_user ={elment_of_object} key = {elment_of_object.id} />)
			}

		</div>
		)
}



const Bottom = ()=>{


	return(

		<div className = "bottom">

			je suis le Bottom 


		</div>


		)
}

const Home =()=>{

	return(

		<div className = 'home'>

			<Entete />

			<Milieu />

			<Bottom />

		</div>

		)
}



export default Home