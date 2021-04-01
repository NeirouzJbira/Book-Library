const express = require("express");
const router = express.Router();
const readerControllers = require("../controllers/readers");

router.route("/").get(readerControllers.list).post(readerControllers.create);

router
  .route("/:id")
  .get(readerControllers.getReaderById)
  .patch(readerControllers.update)
  .delete(readerControllers.deleteReader);

module.exports = router;
