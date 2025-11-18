import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ImgGenerator from './components/ImageGenerator/ImgGenerator.jsx';
import TxtGenerator from './components/TextGenerator/TxtGenerator.jsx';
import Home from './components/HomePage/Home.jsx';
import AuthPage from './components/Authentication/AuthPage.jsx';
import Login from './components/Authentication/Login.jsx';
import Register from './components/Authentication/Register.jsx';

const routers = createBrowserRouter([
{
  path:"/",
  element: <App/>,
  children:[
    {path:"/", element: <Home/>},
    {path:"/text-generator", element:<TxtGenerator/>},
    {path:"/image-generator", element:<ImgGenerator/>}
  ]
},
{path:"/authentication",
  element:<AuthPage/>,
  children:[
    {path:"login", element:<Login/>},
    {path:"register", element:<Register/>}
  ]
}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routers}/>
  </StrictMode>,
)
