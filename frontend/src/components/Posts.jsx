
import { useLoaderData } from "react-router-dom";

import Post from "./Post";


const Posts = ({feedType}) => {

	
	const {posts,feedPosts,userPosts,likedPosts}=useLoaderData()
	

	return (
		 <>
			{feedType==='forYou' && <>
				{posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
         <div>
		 {posts?.map((post) => (
			 <Post key={post._id} post={post} />
		 ))}
		 
	 </div>
	 </>
	 } 


{feedType==='following' && <>
				{feedPosts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
         <div>
		 {feedPosts?.map((post) => (
			 <Post key={post._id} post={post} />
		 ))}
		 
	 </div>
	 </>
}

{feedType==='posts' && <>
				{userPosts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
         <div>
		 {userPosts?.map((post) => (
			 <Post key={post._id} post={post} />
		 ))}
		 
	 </div>
	 </>
}

{feedType==='likes' && <>
				{likedPosts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
         <div>
		 {likedPosts?.map((post) => (
			 <Post key={post._id} post={post} />
		 ))}
		 
	 </div>
	 </>
}



	 </>



			
	);
};
export default Posts;