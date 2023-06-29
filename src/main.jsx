import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorPage } from './routes/errorPage'
import './index.css'
import './Root.css'
import {Root} from './routes/root.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { AboutUs } from './routes/aboutUs.jsx'
import { CurrentWeather } from './routes/currentWeather.jsx'
import { Lockdown } from './routes/lockdown.jsx'
import { Forecast } from './routes/forecast.jsx'


const router= createBrowserRouter([
  {
    path:"/",
    element:<Root />,
    errorElement:<ErrorPage/>,
    children:[ {
      path:"aboutUs",
      element:<AboutUs />,
      errorElement:<ErrorPage/>
    },
    {
      path:"currentWeather",
      element:<CurrentWeather/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"lockdown",
      element:<Lockdown />,
      errorElement:<ErrorPage/>
    },
    {
      path:"forecast",
      element:<Forecast />,
      errorElement:<ErrorPage/>
    }
  ]
  }
 
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
