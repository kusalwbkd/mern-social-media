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


const App = () => {

  const router=createBrowserRouter([
    {
      path:'/',
      element:<Signin/>,
      action:signInAction(store)
      
    
    },
    {
      path:'signup',
      element:<Signup/>,
      action:signUpAction
    },
    {
      path:'home',
      element:<Home/>,
      loader:homeLoader,
      children:[
        {
          index:true,
          element:<Landing/>,
          loader:landingLoader,
          action:landingAction
        },
        
        {
          path:'profile/:username',
          element:<ProfilePage/>,
          loader:ProfileLoader,
          action:profilAction
        },
        {
          path:'edit-post/:id',
          element:<EditPostPage/>,
          loader:editProfileLoader,
          action:EditPostPageAction
        },
        {
            path:'notifications',
            element:<NotificationPage/>,
            loader:notificationLoader
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