const router = require("express").Router()
const { signUp, signIn, logOut } = require("../controllers/controller.auth")

router.post('/signUp', signUp) 
router.post('/signIn', signIn) 
router.post('/logOut', logOut) 
  
module.exports = router