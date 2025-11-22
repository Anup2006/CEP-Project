import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import CareerQuiz from './Pages/Career-Quiz/CareerQuiz.jsx'
import CareerExploration from './Pages/Career-Exploration/CareerExploration.jsx'
import Resources from './Pages/Resources/Resources.jsx'
import AuthForm from './Pages/AuthLanding/AuthForm.jsx'
import Contact from './Pages/Contact/Contact.jsx'
import App from './App.jsx'

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<AuthForm/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="quiz" element={<CareerQuiz/>}/>
      <Route path="explore-careers" element={<CareerExploration/>}/>
      <Route path="resources" element={<Resources/>}/>
      <Route path="contact" element={<Contact/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
