import './App.css'
import { Route, Routes } from 'react-router';
import Header from './Components/Header';
import AddRecipe from './Components/RecipeAddBook';
import Home from './Components/RecipeHome';
import NotFound from './Components/NotFound';
import EditRecipe from './Components/RecipeEditBook';

function App() {

  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-recipe' element={<AddRecipe />} />
        <Route path='/edit-recipe/:id' element={< EditRecipe />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;
