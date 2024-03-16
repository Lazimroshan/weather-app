import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Savedcitys from './Savedcitys'

function Router() {
  return (
    <div>
        
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/Signup' element={<Signup/>}/>
            <Route path='/home/:userid' element={<Home/>}/>
            <Route path='/saved/:userid' element={<Savedcitys/>}/>
        </Routes>
        </BrowserRouter>

    </div>
  )
}

export default Router