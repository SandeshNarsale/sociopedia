import express from "express";
import { 
    getUser,
    getUserFriends,
    addRemoveFriend,
 } from "../controllers/users.js";

 import { verifyToken } from "../middleware/auth.js";

const router =express.Router();

/* Read routes*/

router.get("/:id",verifyToken,getUser);/*   only read data using this route and verifytoken avaiable so authorization is there*/
router.get("/:id/friends",verifyToken,getUserFriends);

/*Update */
router.patch("/:id/:friendId",verifyToken,addRemoveFriend);

export default router;