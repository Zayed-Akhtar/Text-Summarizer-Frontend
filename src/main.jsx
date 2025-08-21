import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ImgGenerator from './components/ImageGenerator/ImgGenerator.jsx';
import TxtGenerator from './components/TextGenerator/TxtGenerator.jsx';

const routers = createBrowserRouter([
{
  path:"/",
  element: <App/>,
  children:[
    {path:"/", element: <ImgGenerator/>},
    {path:"/text-generator", element:<TxtGenerator/>}
  ]
}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routers}/>
  </StrictMode>,
)
