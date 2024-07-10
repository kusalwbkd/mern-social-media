import React from 'react'
import { Form, Link, redirect } from "react-router-dom";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdOutlineMail, MdPassword } from "react-icons/md";
import { FormInput, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/UserSlice";

export const action=async({request})=>{
const formData=await request.formData()
const data=Object.fromEntries(formData)
try {
	await customFetch.post('/auth/signup',data)
	toast.success('You registered sucessfully! Please login')
	return redirect('/')
} catch (error) {
	toast.error(error?.response?.data?.msg);
	return error
}
}
const Signup = () => {
 
	return (
		<div className='max-w-screen-xl mx-auto  grid grid-cols-1 h-screen px-10 '>
	<Logo/>
			<Form  method="post" className='mx-auto grid grid-cols-1 justify-center items-center'>
				<div className=' grid grid-cols-1 mx-auto md:mx-20 '>
					
					<h1 className='text-4xl font-extrabold text-white'>Sign in to your account.</h1>
				
					<div className=' mt-6 grid grid-cols-1 gap-4 mb-6'  >
					
						<FormInput icon={<FaUser />} name={'username'} placeholder={'username'} type={'text'}/>
				
					   <FormInput icon={<MdOutlineMail/>} name={'email'} placeholder={'Email'} type={'email'}/>
					   <FormInput icon={<MdDriveFileRenameOutline/>} name={'fullName'} placeholder={'Full Name'} type={'text'}/>
					   <FormInput icon={<MdPassword/>} name={'password'} placeholder={'password'} type={'password'}/>

          </div>
					<SubmitBtn text={'Sign Up'}/>
				
				</div>
				<div className=' grid grid-cols-1  md:mx-20'>
					<p className='text-white text-lg'>Already have an account?</p>
					<Link to='/'className='btn rounded-full btn-primary text-white btn-outline' >
						Sign In
					</Link>
				</div>
			</Form>
		</div>
	);
}

export default Signup