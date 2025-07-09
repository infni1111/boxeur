//avant commit 0 frontend

import React ,{useContext} from 'react'

import './components/App.css'

import {AppContext} from './components/AppProvider.jsx'

import Form from './components/Form.jsx'

import Home from './components/Home.jsx'

import ChatBox from './components/chatBox.jsx'

import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'



const App =()=>{

  const {initial_appHeight,appHeight} = useContext(AppContext)

  const user_id = localStorage.getItem("user_id")

  //console.log("user_id dans app : ",user_id)



  return(

    <div
    className = "app"

    style = {{height:appHeight}}
    >

        <Routes>



          <Route path= "/" element = {<Home />} />

          <Route path = "/home" element = {<Home />} />

          <Route path = "/chatBox/:id" element = {<ChatBox />} />

        </Routes>

    </div>

    )



}



export default App;