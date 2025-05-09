import React from 'react'

import {useState,useContext,useEffect} from 'react'

import './formulaire.css'

import {useNavigate} from 'react-router-dom'


import {AppContext} from './AppProvider'







const Formulaire =()=>{

  const navigate = useNavigate()

  const {friendList, setFriendList,choiceList,setChoiceList} = useContext(AppContext)

  const [inputName,setInputName] = useState("")

  const [inputAge,setInputAge]=useState("")



  const [inputEthnie,setInputEthnie] =useState("")

  const [sex,setSex]= useState("masculin")

  const [image, setImage]=useState(null)

  const create_id =(name)=>{

    return name.split(" ").join("_") //+"_"+Date.now()
  }

  const changeName = (event)=>{

     setInputName(event.target.value)

  }


  const changeAge = (event)=>{

     setInputAge(event.target.value)

  }

  
  const changeEthnie= (event)=>{

     setInputEthnie(event.target.value)

  }


  const handleChangeSex=(event)=>{
    setSex(event.target.value)
  }




const imageChange=(event)=>{

    const file= event.target.files[0]


    if(file){
      const reader =new FileReader()
      reader.onloadend=()=>{
       
        setImage(reader.result)
      }

      reader.readAsDataURL(file)

    }
  }





const handleSubmit=async (e)=>{

    e.preventDefault()

    if(inputName && inputAge && inputEthnie && sex && image){

       

      /*
      user_id = user_id+timestamp
      */

      const dataForServer = { 


      name:inputName,
      
      age:inputAge,
      
      ethnie:inputEthnie,

      sex:sex,
      
      image:image,

      tokenFile:[], 

    }



    socket.timeout(1000).emit("register",dataForServer,async(err,dataForClient)=>{

        console.log("dataForClient : ",dataForClient)
        if(err){
            console.log("une erreur est survenue : ",err)
        }

        else{
         
         

         if(dataForClient){

            const user_id = dataForClient.user_id

            const users = dataForClient.users


            console.log("dataForClient formulaire xxxxxxxxxxxxxxxxxxxxxxxx: ",dataForClient)

            console.log("voici ancien users xxxxxxxxxxxxxxxxxxxxxx  : ",users)


            
            
            await Object.keys(users).forEach((key) => {
            users[key].tokenFile = [];
            users[key].pendingFile=[];
            });
            
            
        
            navigate("/accueil")
            localStorage.setItem('user_id',user_id)
            localStorage.setItem('choiceList',JSON.stringify(users))
            setChoiceList(users)

            console.log("test pour verifier localStorage user_id : ",localStorage.getItem('user_id'))

            console.log("test pour verifier localStorage choiceList : ",JSON.parse(localStorage.getItem('choiceList')))


         }

         else{
            console.log("data non disponible dans l'evenement register : ",dataForClient)
         }
        
         

        }
    })





    }

  }



  return(
    <div
    className="style_container_form"
    >


    <form onSubmit ={handleSubmit} className="form">

        <div
        className = "div_name margin"
        >

          <label htmlFor = "inputName"> Nom </label>

          <input id = "inputName" type = "text" value = {inputName} onChange ={changeName} required  />

       

        </div>


        <div
        className = "div_age margin"
        >
            
             <label htmlFor = "inputAge"> Age </label>

             <input id = "inputAge" type = "text" value = {inputAge} onChange ={changeAge}  required/>


        </div>




        <div
        className = "div_ethnie margin"
        >
            
             <label htmlFor = "inputEthnie"> Ethnie </label>

             <input id = "inputEthnie" type = "text" value = {inputEthnie} onChange ={changeEthnie} required />


        </div>



        <div
        className="div_sex"
        >   
            <label htmlFor="sex" className="sex">Sexe</label>
            <select
            id= "sex"
            value ={sex}
            onChange={handleChangeSex}
            >

                <option value ="masculin" >Masculin</option>

                <option value ="femimin" >Feminin</option>


            </select>


        </div>




        <div
        className = "div_image margin"
        >
            
             <label htmlFor = "image"> Image </label>

             <input id = "image" type = "file" accept ="image"  onChange ={imageChange} required />


        </div>





         <div
        className = "div_submit margin"
        >
            <button type = "submit" className="button">

              Envoyez

            </button>

        </div>







    </form>
    </div>
    )

}




export default Formulaire


