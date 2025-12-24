import {BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import RecipeDetail from "./components/RecipeDetail"
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/recipe/:id' element={<RecipeDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

