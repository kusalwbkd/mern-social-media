import { useEffect, useState } from "react";
import { CreatePost, Posts } from "../components";
import { useSelector } from 'react-redux';
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";


export const loader=async()=>{
  try {
	const response1=await customFetch.get('/posts/all')
	const posts=await response1.data.posts

	const response2=await customFetch.get('/posts/following')
	const feedPosts=await response2.data.feedPosts

	

	
	return {posts,feedPosts}
  } catch (error) {
	toast.error(error?.response?.data?.msg);
	return error
  }
}

export const action=async({request})=>{
	const formData=await request.formData()
	
	
	try {
	   
	 await customFetch.post('/posts/create',formData)
	 toast.success("Post created sucessfully")
	 window.location.reload()
	 return redirect('/home')
   } catch (error) {
	 console.log(error);
	 toast.error(error?.response?.data?.msg);
   return error;
   } 
}
const Landing = () => {
	const [feedType, setFeedType] = useState("forYou");
	
	const user=  useSelector((state)=>state.userState.user)
	const navigate=useNavigate()
	if(!user){
     useEffect(()=>{
		toast.warn('Please login')
   navigate('/')
	 },[])
	}
	return (
		<>
			<div className='flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen'>
				{/* Header */}
				<div className='flex w-full border-b border-gray-700'>
					<div
						className={
							"flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
						}
						onClick={() => setFeedType("forYou")}
					>
						For you
						{feedType === "forYou" && (
							<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary'></div>
						)}
					</div>
					<div
						className='flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative'
						onClick={() => setFeedType("following")}
					>
						Following
						{feedType === "following" && (
							<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary'></div>
						)}
					</div>
				</div>

				
				<CreatePost />

				
				<Posts feedType={feedType}/>
			</div>
		</>
	);
};
export default Landing;