import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

const FollowUnFollow = ({user,text}) => {
    const {pathname}=useLocation()
const navigate=useNavigate()
    const followUnFollowUser=async(id)=>{
		try {
			await customFetch.post(`/users/follow/${id}`)
            navigate(`${pathname}`)
			toast.success("user followed!")
          
		} catch (error) {
			toast.error(error?.response?.data?.msg);
          
	return error
		}
	}
  return (
    <button
    className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
    onClick={(e)=>{
        e.preventDefault(),
        followUnFollowUser(user?._id)
    }
        
    
    }
>
    {text}
</button>
  )
}

export default FollowUnFollow