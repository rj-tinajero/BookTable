const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");

router.get("/admin/books", bookController.index);
router.get("/admin/addBook", bookController.new);
router.post("/admin/books/create", bookController.create);
router.post("/admin/books/:id/update", bookController.update);
router.post("/admin/books/:id/destroy", bookController.destroy);
router.get("/store", bookController.store);

module.exports = router;