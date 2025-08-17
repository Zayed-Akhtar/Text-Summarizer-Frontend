import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ImgGenerator from './components/ImageGenerator/ImgGenerator.jsx';

const routers = createBrowserRouter([
{
  path:"/",
  element: <App/>,
  children:[
    {path:"/", element: <ImgGenerator/>}
  ]
}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routers}/>
  </StrictMode>,
)
