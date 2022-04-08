import {Router} from "express";

const router = Router();

router.get("/test",(req,res)=>{
    console.log('나와라')
    res.send('test')
});

export default router;