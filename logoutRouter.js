const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    console.log("로그아웃 성공");
    req.session.destroy(function (err) {
      // 세션 파괴후 할 것들
      res.redirect("/login");
    });
});

module.exports = router;