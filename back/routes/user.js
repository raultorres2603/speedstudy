var express = require("express");
var router = express.Router();
var jose = require("jose");

router.get("/info", async function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    res.status(401).json({ error: "No token provided" });
  } else {
    try {
      const { payload } = await jose.jwtVerify(
        token,
        new TextEncoder().encode(process.env.SKT)
      );
      res.status(200).json({ user: payload.user });
    } catch (error) {
      res.status(401).json({ error: error });
    }
  }
});

module.exports = router;
