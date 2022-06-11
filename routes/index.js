import { Router } from 'express';
import Authentication from '../middleware/auth.js';
const router=Router();
import User  from "./../controllers/UserController.js";

router.get("/test",User.test);
router.post("/register",User.register);
router.post("/login",User.login);
router.post("/updatePassword",Authentication.verifyToken,User.updatePassword)

export default router;