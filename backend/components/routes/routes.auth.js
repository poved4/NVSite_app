const router = require("express").Router()
const { signUp, signIn } = require("../controllers/controller.auth")

router.post('/signUp', signUp)
router.post('/signIn', signIn)
  
module.exports = router