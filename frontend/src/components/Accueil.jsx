import React,{useState,useEffect,useRef,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { FaRegHeart,FaCamera, FaEllipsisV, FaSearch,FaBars, FaRegComment, FaGamepad, FaDollarSign,FaBook} from 'react-icons/fa'; // Importation de l'icône du cœur vide
import { MdSearch, MdMenu } from 'react-icons/md';  // Recherche et Menu en Material Design
import { IoSearch } from 'react-icons/io5';  // Recherche avec un autre style
import { FiMenu } from 'react-icons/fi';  // Menu avec un autre style
import {AppContext} from "./AppProvider"
import './accueil.css'






const db_icon = {
	coeur:FaRegHeart, 
	camera:FaCamera,
	menu:FaBars,
	recherche:IoSearch,
	game : FaGamepad,
	message:FaRegComment,
	argent:FaDollarSign,
	book:FaBook,
}





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

const Entete=()=>{

	const Icon = ({name,size,color})=>{

		const Component = db_icon[name]
		return(

			<Component size={size} color = {color} />
			)
	}

	return(

		<div
		className = "container_entete_accueil"

		>
			<Text text= " i love hacking " color="red" />



			<div
			className= "div_icon"
		
			>
				 <Icon size="4dvh" color="#0C70F2" name = "recherche" 


				 />
				 
				  <Icon size="4dvh" color="#0C70F2" name = "menu"

				   />

			</div>
			
		</div>
		)
}

const Profile = ({element,className})=>{

	const {choiceList,setChoiceList,friendList,setFriendList}=useContext(AppContext)


	//console.log("voici choiceList dans Profile dans accueil : ",choiceList)
	
	const navigate = useNavigate()

	
    


	const click = ()=>{

		//console.log("voici choiceList dans accueil : ",choiceList)

		//console.log("voici friendList dans accueil : ",friendList)


		const user_id_element = element.user_id
		
		const reverse_friendList = Object.values(friendList)

		//console.log("voici reverse_friendList : ",typeof(reverse_friendList[0].id))

		//console.log("voici elment.id : ",typeof(element.id))

		const check = reverse_friendList.some(obj=>obj.user_id===element.user_id)
        
		//console.log("voici check : ",check)
        

		
		if(!check){
		

			setFriendList((prev)=>{

			const updatePrev = {...prev}

			const newObject = {[element.user_id]:element}

			const dico = {...newObject,...updatePrev}

			console.log("dico dans accueil : ",dico)

			localStorage.setItem('friendList',(JSON.stringify(dico)))

			return dico
		})

		//console.log("voici le nouveau Profile créer à partir de element : ",data)
	
		}

		else{
			console.log("cette elment exist déjà dans friendList : ")
		}


		navigate(`/Discussion/${user_id_element}`)

	}


	return(
			<div
				onClick = {click}
				className = {className}
			>

				<div>

					<img src = {element.image} className = "image" />

				</div>


				<Text text = {element.name} color= "blue" />

			</div>


		)

}






const ChoiceList = ()=>{
	
	const {friendList,choiceList,setChoiceList} = useContext(AppContext)

    

	
	
	const click =()=>{
	//console.log("voici friendList dans Entete accueil : ",friendList)

	}







	return (

		<div
		className = "container_friend"

		onClick = {click}
		>

			<div
			className = "div_friendlist"
			>

				{
					choiceList?

					Object.values(choiceList).map(

						(element)=>{

							return <Profile element = {element} key = {element.user_id} className = "div_profile" />
		

						}



						) : <p> Element introuvable </p>


				}
			

			</div>

		</div>

		)
}



const Friendlist = ()=>{

	

	const {friendList,first,accueilList,db} = useContext(AppContext)
	/*
	console.log("voici friendList : ",friendList)
	*/

	//console.log("voici friendList dans accueil : ",friendList)



	return(

	<div
	className = "container_milieu"
	>
		<div


		className = "div_accueillist"


		>

		{friendList?

		 Object.values(friendList).map(
			(element)=>{

				 return <Profile element = {element} key = {element.user_id} className = "div_profile2" />


		} 
			):<p>patientez</p>

		}


		</div>

	</div>

		)
}




const Milieu =()=>{



	return(

		<div

		className = "div_milieu_accueil"

		>


			<ChoiceList />


			<Friendlist />



		</div>

		)
}






const Link =({name,size,text,color})=>{

	

	const Icon = ({name, size, color}) => {
 		 const Component = db_icon[name];
 		 return <Component size={size} color={color} />;
		};



	const navigate = useNavigate()


	const click = ()=>{
		navigate('/learn')
	}
	return(
		<div

		className = {"link_bottom"}

		onClick = {click}

		>

			<Icon name ={name} size = {size} text = {text} color ={color} />

			<Text text = {text}  color={color} />


		</div>

		)
     }


const Bottom = ()=>{

	const bleu_jolie = "#0C70F2"


	return(

		<div
		className = "div_bottom_accueil"
		>

			<Link name = "message" text="message" size = {20} color = "red" />
			<Link name = "message" text="video" size = {20} color = {bleu_jolie} />
			<Link name = "argent" text="Business" size = {20} color = {bleu_jolie} />
			<Link name = "book" text="Learn" size = {20} color = {bleu_jolie} />
		
		</div>
	)
}



const Accueil =()=>{



	return(

		<div

		className = "div_accueil"


		>
			<Entete />

			<Milieu />

			<Bottom />
			
		</div>
	)


}


export default Accueil