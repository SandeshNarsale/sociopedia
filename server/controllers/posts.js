import Post from "../models/Post.js";
import User from "../models/User.js";

/*Create */

export const createPost =async (req, res)=>{
    try{
        const { userId, description ,picturePath}=req.body;
        const user =await User.findById(userId);
        const newPost =new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath:user.picturePath,
            picturePath,
            likes:{},
            comments:[]
        })

        await newPost.save();/*save Post */

        const post =await Post.find();/*Grab all Post from mongoDb */

        res.status(201).json(post);
    }catch(err){
        res.status(409).json({message: err.message});
    }
}

/*Read */

export const getFeedPosts =async(req,res)=>{
    try{
        const post =await Post.find();/*Grab all Post from mongoDb */
        res.status(200).json(post);

    }catch(err)
    {
        res.status(404).json({message:err.message});
    }
}

export const getUserPosts =async(req,res)=>
{
    try{
        const { userId }=req.params;
        const post =await Post.find({userId});
        res.status(200).json(post);

    }catch(err)
    {
        res.status(404).json({message:err.message});
    }

}

/* Update */

export const likePost =async(req,res)=>{
    try{
        const { id}=req.params;
        const {userId} =req.body;
        const post=await Post.findById(id);/*Post information*/
        const isLiked =post.likes.get(userId);/*in like check this userid exits if exits that mean that post liked by userId*/
        if(isLiked){/*if liked then delete user from like*/
            post.likes.delete(userId);
        }else{/*if not liked then like with userid*/
          post.likes.set(userId,true);
        }

        const updatedPost =await Post.findByIdAndUpdate(/* find by id and then update like whatever done before*/
            id,
            {like:post.like},
            {new:true}
        );
       res.status(200).json(updatedPost);

    }catch(err)
    {
        res.status(404).json({message:err.message});
    }
}