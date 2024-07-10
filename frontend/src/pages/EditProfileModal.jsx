import { useEffect, useState } from "react";
import {Form, Link, useLocation, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const EditProfileModal = ({user}) => {
	const [formData, setFormData] = useState({
		fullName: user?.fullName,
		username:user?.username,
		email: user?.email,
		bio:user?.bio,
		link: user?.link,
		newPassword: "",
		currentPassword: "",
	});

    const navigate=useNavigate()
	const{pathname}=useLocation()
	
	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};


 const handleEditProfile=async()=>{
	try {
		await customFetch.patch('/users/update',
			{
				fullName:formData.fullName,
				username:formData.username,
				bio:formData.bio,
				link:formData.link,
				newPassword:formData.newPassword,
				oldPassword:formData.oldPassword
				
			}

		)

		toast.success("profile updated....")
		window.location.reload()
		
	} catch (error) {
		toast.error(error?.response?.data?.msg);
	return error
	}
 }

	return (
		<>
			<button
				className='btn btn-outline rounded-full btn-sm'
				onClick={() => document.getElementById("edit_profile_modal").showModal()}
			>
				Edit profile
			</button>
			<dialog id='edit_profile_modal' className='modal'>
				<div className='modal-box border rounded-md border-gray-700 shadow-md'>
					<h3 className='font-bold text-lg my-3'>Update Profile</h3>
					<form
						className='flex flex-col gap-4'
						method="post"
						
					>
						<div className='flex flex-wrap gap-2'>
							<input
								type='text'
								placeholder='Full Name'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								value={formData.fullName}
								name='fullName'
								onChange={handleInputChange}
							
							/>
							<input
								type='text'
								placeholder='Username'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								value={formData.username}
								name='username'
								onChange={handleInputChange}
								
							/>
						</div>
						<div className='flex flex-wrap gap-2'>
							<input
								type='email'
								placeholder='Email'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								value={formData.email}
								name='email'
								onChange={handleInputChange}
								
							/>
							<textarea
								placeholder='Bio'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								value={formData.bio}
								name='bio'
								onChange={handleInputChange}
								
							/>
						</div>
						<div className='flex flex-wrap gap-2'>
							<input
								type='password'
								placeholder='Current Password'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								name='oldPassword'
								value={formData.oldPassword}
								onChange={handleInputChange}
							/>
							<input
								type='password'
								placeholder='New Password'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								name='newPassword'
								value={formData.newPassword}
								onChange={handleInputChange}
							/>
						</div>
						<input
							type='text'
							placeholder='Link'
							className='flex-1 input border border-gray-700 rounded p-2 input-md'
							defaultValue={formData.link}
							name='link'
							onChange={handleInputChange}
							
						/>
						<button className='btn btn-primary rounded-full btn-sm text-white' type="submit"
						onClick={(e)=>{
							e.preventDefault()
							handleEditProfile()
						}}
						
						>Update</button>


					</form>
				</div>
				<form method='dialog' className='modal-backdrop'>
					<button className='outline-none'>close</button>
				</form>
			</dialog>
		</>
	);
};
export default EditProfileModal;