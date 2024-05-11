import './App.css'
import Header from './components/header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<null | string>(null);


  useEffect(() => {
    const user = window.localStorage.getItem("gotrue.user");
    if (user) {
      const currentUser = JSON.parse(user)
      setIsAuthenticated(currentUser.email)
    }
  }, [])


  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  )
}

export default App
