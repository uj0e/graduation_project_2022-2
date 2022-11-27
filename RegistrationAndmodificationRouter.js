const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("상품 등록 페이지");
  res.sendFile(__dirname + "/business/RegistrationAndmodification.html");
});

module.exports = router;
