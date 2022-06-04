import { Router } from 'express';
const router=Router();
import User  from "./../controllers/UserController.js";


router.get("/test",User.test);


export default router;