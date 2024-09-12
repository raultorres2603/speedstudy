var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SR);
const jose = require("jose");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://raultorres2603:${process.env.SMONGO}@c0.zpepo.mongodb.net/?retryWrites=true&w=majority&appName=c0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/* GET home page. */
router.post("/login", async function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  try {
    await client.connect();
    try {
      const result = await client
        .db("sscards")
        .collection("users")
        .findOne({ username: username });
      if (result) {
        if (bcrypt.compareSync(password, result.password)) {
          const token = await new jose.SignJWT({
            user: result,
          })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("1h")
            .sign(new TextEncoder().encode(process.env.SKT));
          res.status(200).send(token);
        } else {
          res.status(402).send("Wrong password");
        }
      } else {
        res.status(404).send("Usuario no encontrado");
      }
    } catch (error) {
      res.status(501).send("Error on finding");
    }
  } catch (error) {
    res.status(500).send("Error on connecting");
  }
});

module.exports = router;
