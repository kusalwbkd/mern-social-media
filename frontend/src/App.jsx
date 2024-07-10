import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { EditPostPage, Home, Landing, Logout, MyProfilePage, NotificationPage, ProfilePage, Signin, Signup } from './pages'

//loaders
import{loader as landingLoader} from './pages/Landing'
import{loader as homeLoader} from './pages/Home'
import { loader as notificationLoader } from './pages/NotificationPage'
import { loader as ProfileLoader } from './pages/ProfilePage'
import{loader as editProfileLoader} from './pages/EditPostPage'


//actions
import{action as signInAction} from './pages/Signin'
import{action as signUpAction} from './pages/Signup'
import { action as logOutAction } from './pages/Logout'
import { action as landingAction } from './pages/Landing'
import { action as profilAction } from './pages/ProfilePage'
import { action as EditPostPageAction } from './pages/EditPostPage'

import { store } from './store'
import Error from './pages/Error'
import { ErrorElement } from './components'


const App = () => {

  const router=createBrowserRouter([
    {
      path:'/',
      element:<Signin/>,
      action:signInAction(store),
      errorElement:<Error/>
      
    
    },
    {
      path:'signup',
      element:<Signup/>,
      action:signUpAction,
      errorElement:<Error/>
    },
    {
      path:'home',
      element:<Home/>,
      loader:homeLoader,
      errorElement:<Error/>,
      children:[
        {
          index:true,
          element:<Landing/>,
          loader:landingLoader,
          action:landingAction,
          errorElement:<ErrorElement/>
        },
        
        {
          path:'profile/:username',
          element:<ProfilePage/>,
          loader:ProfileLoader,
          action:profilAction,
          errorElement:<ErrorElement/>

        },
        {
          path:'edit-post/:id',
          element:<EditPostPage/>,
          loader:editProfileLoader,
          action:EditPostPageAction,
          errorElement:<ErrorElement/>

        },
        {
            path:'notifications',
            element:<NotificationPage/>,
            loader:notificationLoader,
            errorElement:<ErrorElement/>,
            errorElement:<ErrorElement/>


        },
        {
          
            path:'logout',
            element:<Logout/>,
            action:logOutAction(store)
        
        }
      ]
    }

  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App