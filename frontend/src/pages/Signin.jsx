import { Form, Link, redirect } from "react-router-dom";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { FormInput, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/UserSlice";



export const action=(store)=>async({request})=>{
	const formData=await request.formData()
	const data=Object.fromEntries(formData)

	try {
		const response=await customFetch.post('/auth/login',data)
		toast.success('You logged in')
	store.dispatch(loginUser(response.data))
		return redirect('/home')
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error
	}
}
const SignIn = () => {

	
	
	return (
		<div className='max-w-screen-xl mx-auto flex h-screen px-10 '>
	<Logo/>
			<Form className='flex flex-col justify-center items-center mx-auto ' method="post">
				<div className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col   ' >
					
					<h1 className='text-4xl font-extrabold text-white'>Sign in to your account.</h1>
					<p>
						username: <span className=" text-bold">some</span>
					</p>

					<p>
						password: <span className=" text-bold">password</span>
					</p>
				
					<div className='flex gap-4 flex-wrap' >
					
						<FormInput icon={<FaUser />} name={'username'} placeholder={'username'} type={'text'}/>
				
					   <FormInput icon={<MdPassword/>} name={'password'} placeholder={'password'} type={'password'}/>
          </div>
					<SubmitBtn text={'Sign In'}/>
				
				</div>
				<div className='flex flex-col lg:w-2/3 gap-2 mt-4 '>
					<p className='text-white text-lg'>Don't have an account?</p>
					<Link to='/signup'className='btn rounded-full btn-primary text-white btn-outline w-full' >
						Register
					</Link>
				</div>
			</Form>
		</div>
	);
};
export default SignIn;  