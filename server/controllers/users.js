import User from "../models/User.js";

/*Read */

export const getUser =async(req, res)=>{
    try{
        const  { id } =req.params;
        const user =await User.findById(id);
        
        res.status(200).json(user);
        }
    catch(err){
        res.status(404).json({message : err.message});
    }
}

export const getUserFriends =async(req,res)=>{
    try{
        const { id} =req.params;
        const user =await User.findById(id); /* find user */

        const friends =await Promise.all(
            user.friends.map((id)=> User.findById(id)) /* all user saved in map for that id */
        );
        const formattedFriends =friends.map(
            ({ _id,firstName, lastName ,occupation ,location,picturePath})=>{
                return { _id,firstName, lastName ,occupation ,location,picturePath};/* no need to share all info of friends like password so data is fromated and specfic data is shared */
            }
        )
        res.status(200).json(formattedFriends);

    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}

/*Update */

export const addRemoveFriend =async (req, res)=>{
    try{
        const {id, friendId} =req.params;
        const user =await User.findById(id);
        const friend =await User.findById(friendId);

        if(user.friends.includes(friendId)){/* if they are friends*/
            user.friends =user.friends.filter((id)=> id !== friendId);/*remove friend from user */
            friend.friends =friend.friends.filter((id)=> id !== id);/*remove user from friend */
        }
        else{/* if they are not friends*/
            user.friends.push(friendId);/*add friend to user */
            friend.friends.push(id);/*add user to friend */
        }
        await user.save();
        await friend.save();

        const friends =await Promise.all(
            user.friends.map((id)=> User.findById(id)) /* all user saved in map for that id */
        );
        const formattedFriends =friends.map(
            ({ _id,firstName, lastName ,occupation ,location,picturePath})=>{
                return { _id,firstName, lastName ,occupation ,location,picturePath};/* no need to share all info of friends like password so data is fromated and specfic data is shared */
            }
        )
        res.status(200).json(formattedFriends);


    }catch(err){
        res.status(404).json({message : err.message});
    }
}