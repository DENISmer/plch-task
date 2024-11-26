import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import PostList from './components/PostList'
import PostPage from './components/PostDetail'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostPage />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
