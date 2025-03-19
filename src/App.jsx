
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLogin from './assets/components/UserLogin'
import UserRegister from './assets/components/UserRegister'
import Dashboard from './assets/components/Dashboard'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<UserLogin/>}></Route>
    <Route path='/register' element={<UserRegister/>}></Route>
    <Route path='/dashboard' element={<Dashboard/>}></Route>

    </Routes>
    
    </BrowserRouter>
  
        
    </>
  )
}

export default App
