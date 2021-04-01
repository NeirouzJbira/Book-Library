const express = require("express");
const router = express.Router();
const bookControllers = require("../controllers/books");

router.route("/").get(bookControllers.list).post(bookControllers.create);

router
  .route("/:id")
  .get(bookControllers.getBookById)
  .patch(bookControllers.update)
  .delete(bookControllers.deleteBook);

module.exports = router;
