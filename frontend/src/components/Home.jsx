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
	
	const {profileList} = useContext(AppContext)

	console.log("profileList dans home : ",profileList)

	
	return(
		<div className ="milieu">

			{
				profileList.map((profile)=>{

					return <Profile profile_user = {profile} key = {profile.id} />
				})
				
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