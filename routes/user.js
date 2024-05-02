const express = require("express");
const router = express.Router();

const {createUser,loginUser , getUsers,getRoleUsers,editProfile , extraData} = require("../controllers/user");

const authenticatedRoute = require("../middleware/auth");

router.route("/create").post(createUser);

router.route("/login").post(loginUser);

router.route("/users/:role/:search_text").get(authenticatedRoute , getUsers)
router.route("/users/:role").get(authenticatedRoute , getRoleUsers)

router.route("/users/:id").patch(authenticatedRoute , editProfile);

router.route("/extra/:id").post(authenticatedRoute , extraData);



module.exports = router;