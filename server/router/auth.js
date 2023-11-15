const express = require("express");
const router = express.Router();
const user = require("../models/userSchema")
const bcrypt = require('bcrypt');
const authenticate = require("../middleware/authenticate")



//registration form
router.post("/register", async (req, res) => {
    console.log(req.body);
    const { name, email, password, cpassword } = req.body;
    if (!name || !email || !password || !cpassword) {
        res.status(422).json({ message: "please fill the data" });

    }
    try {
        const userExist = await user.findOne({ email: email });
        if (userExist) {
            res.status(422).json({ message: "email already exist" });
        } else {
            const entry = new user({ name, email, password, cpassword });
            await entry.save();
            if (entry) {
                res.status(201).json({ message: "user registered successfully" });
                console.log(entry);
            } else {
                res.status(422).json({ message: "not registered" })
            }
        }


    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "internal server erros" });
    }

})


//login form 
router.post("/login", async (req, res) => {
    try {
       
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Invalid credentials" })
        }
        const userValid = await user.findOne({ email: email });
        if(userValid){
            const isMatch = await bcrypt.compare(password, userValid.password);
            if(!isMatch){
                res.status(422).json({err: "password not matched"})
            }else{
                const token = await userValid.generateAuthtoken();
               console.log(token);
                //cookie generate
                res.cookie("usercookie", token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result= {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result})
                
            }
        }




    } catch (err) {
        res.status(401).json(err);
        console.log(err);
    }
})

   
//uservalid 

router.get("/validuser",authenticate,async (req,res) => {
//  console.log("done");
try{
const ValidUserOne = await user.findOne({_id: req.userId})
res.status(201).json({status:201, ValidUserOne});
}catch(err){
    res.status(401).json({status: 401, err});
}
})


//logout user
router.get("/logout",authenticate, async(req,res)=>{
try{
req.rootUser.tokens =  req.rootUser.tokens.filter((currelem)=>{
    return currelem.token !=req.token
});
res.clearCookie("usercookie", {path:"/"})

  req.rootUser.save();

res.status(201).json({status:201})
 
}catch(err){
    res.status(401).json({status: 401, err})
}
})




module.exports = router;