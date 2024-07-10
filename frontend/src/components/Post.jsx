import { FaEdit, FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Form, Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import CommentAndEditModal from "./CommentAndEditModal";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";


const Post = ({ post }) => {
	const [comment, setComment] = useState("");
	const user = useSelector((state) => state.userState.user)
	console.log(post);
	const navigation = useNavigation()
	//const isCommenting=navigation.state==='submitting'
	const isSubmitting = navigation.state === 'submitting'
	const postOwner = post?.user;
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const formattedDate = "1h";


	const handleDeletePost = async (id) => {

		try {
			await customFetch.delete(`/posts/${id}`)
			toast.success('post deleted sucessfully')
			navigate('/home')
		} catch (error) {
			toast.error(error?.response?.data?.msg);
			return error
		}
	};

	const handdleComment = async (id) => {

		try {
			await customFetch.post(`/posts/comment/${id}`, {
				text: comment
			})
			toast.success('comment added')
			navigate(`${pathname}`)


		} catch (error) {
			toast.error(error?.response?.data?.msg);
			return error
		}

	}
	const handleLikePost = async (id) => {
		try {
			await customFetch.post(`/posts/like/${id}`)

			navigate(`${pathname}`)
			//window.location.reload()


		} catch (error) {
			toast.error(error?.response?.data?.msg);
			return error
		}
	};

	const handleDeleteComment=async(postId,commentId)=>{
        try {
			await customFetch.delete(`/posts/${postId}/comments/${commentId}`)
			toast.success('comment deleted')
			navigate('/home')
		} catch (error) {
			toast.error(error?.response?.data?.msg);
		return error
		}
	}

	return (
		<>
			<div className='flex gap-2 items-start p-4 border-b border-gray-700'>
				<div className='avatar'>
					<Link to={`/home/profile/${postOwner?.username}`} className='w-8 rounded-full overflow-hidden'>
						<img src={postOwner?.profileImg || "/avatar-placeholder.png"} />
					</Link>
				</div>
				<div className='flex flex-col flex-1'>
					<div className='flex gap-2 items-center'>
						<Link to={`/home/profile/${postOwner?.username}`} className='font-bold'>
							{postOwner?.fullName}
						</Link>
						<span className='text-gray-700 flex gap-1 text-sm'>
							<Link to={`/profile/${postOwner?.username}`}>@{postOwner?.username}</Link>
							<span>·</span>
							<span>{formattedDate}</span>
						</span>
						{postOwner?.username === user.username && (
							<span className='flex justify-end flex-1'>
								<FaTrash className='cursor-pointer hover:text-red-500' disabled={isSubmitting} onClick={() => handleDeletePost(post?._id)} />
							</span>
						)}
					</div>
					<div className='flex flex-col gap-3 overflow-hidden '>
						<span>{post?.text}</span>
						{post?.img && (
							<img
								src={post?.img}
								className='h-80 object-contain rounded-lg border border-gray-700'
								alt=''
							/>
						)}
					</div>
					<div className='flex justify-between mt-3'>
						<div className='flex gap-4 items-center w-2/3 justify-between'>
							<div
								className='flex gap-1 items-center cursor-pointer group'
								onClick={() => document.getElementById("comments_modal" + post._id).showModal()}
							>
								<FaRegComment className='w-4 h-4  text-slate-500 group-hover:text-sky-400' />
								<span className='text-sm text-slate-500 group-hover:text-sky-400'>
									{post?.comments?.length}
								</span>
							</div>

							<dialog id={`comments_modal${post._id}`} className='modal border-none outline-none'>
								<div className='modal-box rounded border border-gray-600'>
									<h3 className='font-bold text-lg mb-4'>Comments</h3>



									<div className='flex flex-col gap-3 max-h-60 overflow-auto'>
										{post?.comments?.length === 0 && (
											<p className='text-sm text-slate-500'>
												No comments yet 🤔 Be the first one 😉
											</p>
										)}
										{post?.comments?.map((comment) => (
											<div key={comment._id} className='flex gap-2 items-start'>
												<div className='avatar'>
													<div className='w-8 rounded-full'>
														<img
															src={comment?.user?.profileImg || "/avatar-placeholder.png"}
														/>
													</div>
												</div>
												<div className='flex flex-col'>
													<div className='flex items-center gap-1'>
														<span className='font-bold'>{comment?.user?.fullName}</span>
														<span className='text-gray-700 text-sm'>
															@{comment?.user?.username}
														</span>
														{(postOwner?.username === user.username || comment?.user?.username === user.username)

															&& 
															
                                                            <>
															<FaEdit className=' ml-4 cursor-pointer hover:text-green-500' />

															
															
															<FaTrash className=' ml-4 cursor-pointer hover:text-red-500' onClick={()=>handleDeleteComment(post?._id, comment?._id)} />
															</>
														}


													</div>
													<div className='text-sm'>{comment?.text}</div>
												</div>
											</div>
										))}
									</div>


									<form
										className='flex gap-2 items-center mt-4 border-t border-gray-600 pt-2'


									>
										<textarea
											className='textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800'
											placeholder='Add a comment...'
											name="text"
											value={comment}
											onChange={(e) => setComment(e.target.value)}

										/>
										<button className='btn btn-primary rounded-full btn-sm text-white px-4' onClick={(e) => {
											e.preventDefault()
											handdleComment(post?._id)
										}}>
											{isSubmitting ? (
												<span className='loading loading-spinner loading-md'></span>
											) : (
												"Post"
											)}
										</button>
									</form>
								</div>
								<form method='dialog' className='modal-backdrop'>
									<button className='outline-none'>close</button>
								</form>
							</dialog>

							{postOwner?.username === user.username && <Link to={`./edit-post/${post?._id}`} className='flex gap-1 items-center group cursor-pointer'>
								<CiEdit it className='w-6 h-6  text-slate-500 group-hover:text-green-500' />

							</Link>}






							<div className='flex gap-1 items-center group cursor-pointer' onClick={() => handleLikePost(post?._id)}>
								{!post.likes.includes(user._id) && (
									<FaRegHeart className='w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500' />
								)}
								{post.likes.includes(user._id) && <FaRegHeart className='w-4 h-4 cursor-pointer text-pink-500 ' />}

								<span
									className={`text-sm group-hover:text-pink-500 ${post.likes.includes(user._id) ? "text-pink-500" : " text-slate-500"
										}`}
								>
									{post?.likes?.length}
								</span>
							</div>
						</div>

					</div>
				</div>
			</div>
		</>
	);
};
export default Post;


