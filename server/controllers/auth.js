import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*Register User*/

export const register= async(req,res)=>{/*async if beacause we are calling mongoose Database so during call mongoose database call should be async*/
    try{
        let{ /*data from frontend */
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        /*password encripation*/
        const salt= await bcrypt.genSalt();/*salt by bcrypt to encrpt password */
        password = await bcrypt.hash(password,salt);
        
        const newUser =new User({ /*data back to Frontend */
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile :Math.floor(Math.random()*10000),
            impressions :Math.floor(Math.random()*10000)

        });
        
        const savedUser =await newUser.save();//data saved mongodb
        
        res.status(201).json(savedUser);/*if all above code excute succesfully the Response we send NewUser json data to frontend
        201 status code to succesfull excution */
        
    }catch(err){
        res.status(500).json({error : err.message});
        /*response for failure status code 500 and error msg*/
    }
};

/* Logging in */
export const login =async(req, res)=>{
    try{
        const { email , password }=req.body;
        const user =await User.findOne({email :email});/* use mongoose to find email*/
        if(!user) return res.status(400).json({msg :"User does not exit ."});

        const isMatch = await bcrypt.compare(password, user.password);/*compare password with mongoose password*/
        if(!isMatch) return res.status(400).json({msg :"Invalid credentials"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});

    } catch(err){
        res.status(500).json({error : err.message});
    }
}