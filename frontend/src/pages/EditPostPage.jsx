import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";


export const action=async({request,params})=>{
	const formData=await request.formData()

	try {
		const response=await customFetch.patch(`/posts/${params.id}`,formData)
		toast.success('post updated sucessfully')
		return redirect('/home')
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error
	}
}


export const loader=async({params})=>{
    try {
       const{data}= await customFetch.get(`/posts/${params.id}`)
       return data
    } catch (error) {
return error
    }
}


const EditPostPage = () => {
	const{post}=useLoaderData()
	
	const [img, setImg] = useState(null);
  // const[text,setText]=useState('')
	const imgRef = useRef(null);
	const[photo,setPhoto]=useState(post?.img)

	const user=  useSelector((state)=>state.userState.user)
	const handleImgChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setPhoto(null)
			setImg(file)
			
		}
	};
	
	return (
		<div className='flex p-4 items-start gap-4 border-b border-gray-700'>
			<div className='avatar'>
				<div className='w-8 rounded-full'>
					<img src={user.profileImg || "/avatar-placeholder.png"} />
				</div>
			</div>
			<Form className='flex flex-col gap-2 w-full' method="post" encType='multipart/form-data' >
				<textarea
					className='textarea w-full p-0 text-lg resize-none border-none focus:outline-none  border-gray-800'
					placeholder='What is happening?!'
					name="text"
					defaultValue={post?.text}
				/>
				{(img ||photo)&& (
					<div className='relative w-72 mx-auto'>
						<IoCloseSharp
							className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
							onClick={() => {
								setImg(null)
								setPhoto(null)
								imgRef.current.value = null;
							}}
						/>
						
						<img src={photo||URL.createObjectURL(img)} className='w-full mx-auto h-72 object-contain rounded'  />
					</div>
				)}



				<div className='flex justify-between border-t py-2 border-t-gray-700'>
					<div className='flex gap-1 items-center'>
						<CiImageOn
							className='fill-primary w-6 h-6 cursor-pointer'
							onClick={() => imgRef.current.click()}
						/>
						<BsEmojiSmileFill className='fill-primary w-5 h-5 cursor-pointer' />
					</div>
				 <input type='file' hidden ref={imgRef} name="img" onChange={(e)=>{
					handleImgChange(e)
					setPhoto(null)
					
					} } /> 
				
					<button className='btn btn-primary rounded-full btn-sm text-white px-4' type="submit">
						submit
					</button>
				</div>
				
			</Form>
		</div>
	);
};
export default EditPostPage;