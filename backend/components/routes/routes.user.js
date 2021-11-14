const router = require("express").Router()
const { getUsers, getUserByID, createUser, updateUserByID, patchUserByID, deleteUserByID } = require("../controllers/controller.user")

router.route('/')
  .get(getUsers)
  .post(createUser)
  
router.route('/:userID')
  .get(getUserByID)
  .put(updateUserByID)
  .patch(patchUserByID)
  .delete(deleteUserByID)

module.exports = router