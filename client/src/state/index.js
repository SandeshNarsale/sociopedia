import { createSlice } from "@reduxjs/toolkit";
/*Global info we can use it anywhere so we dont need state and properties in diff compoenets */
const initialState ={
    mode:"light",/*initial mode light*/
    user :null,
    token :null,
    posts :[],
};

export const authSlice =createSlice({
    name:"auth",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode = state.mode === "light" ? "dark" :"light";/*change mode light to dark and vice versa*/
        },
        setLogin: (state,action)=>{/*action include all arg */
            state.user =action.payload.user;
            state.token=action.payload.token;
        },
        setLogout :(state)=>{
            state.user=null;
            state.token=null;
        },
        setFriends:(state,action)=>{
            if(state.user){
                state.user.friends =action.payload.friends;
            }else{
                console.error("user friends non-existent :(")
            }
        },
        setPosts:(state,action)=>{
            state.posts =action.payload.posts;
        },
        setPost :(state,action)=>{
            const updatedPosts=state.posts.map((post)=>{
                if(post._id === action.payload.post_id )return action.payload.post;
                return post;
            });
            state.posts =updatedPosts;
        }
    }
})

export const {setMode ,setLogin , setLogout , setFriends ,setPosts ,setPost } =authSlice.actions;
export default authSlice.reducer;