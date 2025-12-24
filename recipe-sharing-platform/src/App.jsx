import {BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import RecipeDetail from "./components/RecipeDetail"
import AddRecipeForm from './components/AddRecipeForm'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/recipe/:id' element={<RecipeDetail />} />
        <Route path='/AddRecipeForm' element={<AddRecipeForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

