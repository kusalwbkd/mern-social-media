import React from 'react'
import { Outlet } from 'react-router-dom'
import { RightPanel, Sidebar } from '../components'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

export const loader=async()=>{
  try {
    const response=await customFetch.get('/users/suggested')
	const suggestedUsers=await response.data.suggestedUsers
  return{suggestedUsers}
  } catch (error) {
    toast.error(error?.response?.data?.msg);
	return error
  }
}

const Home = () => {
  return (
    <div className='flex max-w-6xl mx-auto '>
      <Sidebar/>
    <Outlet/>
    <RightPanel/>
    </div>
  )
}

export default Home