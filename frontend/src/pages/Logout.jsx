import React from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'
import { logoutUser } from '../features/user/UserSlice'

export const action=(store)=>async({request})=>{
    try {
        await customFetch.post('/auth/logout')
        store.dispatch(logoutUser())

        return redirect('/')
    } catch (error) {
        toast.error(error?.response?.data?.msg);
	return error
    }

}

 const Logout = () => {
  return (
    <div>Logout</div>
  )
} 

export default Logout