import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return null;
      }
    }
    return null;
  };
  

const initialState = {
 
  user: getUserFromLocalStorage()
}

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers:{
    loginUser:(state,action)=>{
        const { user } = action.payload;
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
    },
  }
});


export const { loginUser,logoutUser } = userSlice.actions;
export default userSlice.reducer;