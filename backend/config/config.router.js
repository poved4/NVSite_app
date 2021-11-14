const router = require("express").Router()

router.use("/auth", require("../components/routes/routes.auth"))
router.use("/user", require("../components/routes/routes.user"))

module.exports = router