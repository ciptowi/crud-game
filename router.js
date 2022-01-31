const router = require("express").Router();
const pages = require("./controllers/pageController");

router.get("/", pages.home);
router.get("/form", pages.getFormCreate);
router.post("/user", pages.createData);
router.get("/users", pages.getAllData);
router.get("/user/:id", pages.getUserById);
router.get("/update/:id", pages.getUpdateById);
router.put("/update/:id", pages.updateById);
router.get("/delete/:id", pages.deleteById);

module.exports = router;
