import React from 'react'
import Section from './Section'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Add from './Add'
import Edit from './Edit'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Section />} exact></Route>
        <Route path='/add' element={<Add />} exact></Route>
        <Route path='/edit/:id' element={<Edit />} exact></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
