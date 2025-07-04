import React,{useContext,useState,useEffect} from 'react'

import {useNavigate} from "react-router-dom"
import {AppContext} from './AppProvider'
import './Home.css'


const Entete =()=>{

	return(
		<div className = "entete center">

		
			<p>Clique sur <span>infni</span> pour causer avec moi </p>

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

		<div className = "bottom center">

			cette partie n'est pas encore coder

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