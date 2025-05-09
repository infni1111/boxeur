//avant commit 0 frontend
import React ,{useContext} from 'react'

import {AppContext} from './components/AppProvider'

import './components/App.css'

import Discussion from './components/Discussion'

import Formulaire from './components/Formulaire'

import Accueil from './components/Accueil'

import Learn from './components/Learn'

import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'











const App =()=>{


  const {friendList, setFriendList, db, setDb } = useContext(AppContext)
    
  const user_id = localStorage.getItem("user_id")


  //console.log("userId dans App : ",user_id)

  

  return(



    <div
    className = "style_container_app"
    >

      <Router>

        <Routes>

          <Route path="/" element ={user_id? <Accueil />:<Formulaire />} />


          <Route path ="/accueil" element = {<Accueil />} />

          <Route path ="/Discussion/:id" element = {<Discussion />} />


          <Route path = "/learn" element = {<Learn />} />

        </Routes >

      </Router>



    </div>

    )
}



export default App;