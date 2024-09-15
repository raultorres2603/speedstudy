var express = require("express");
var router = express.Router();
var jose = require("jose");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://raultorres2603:${process.env.SMONGO}@c0.zpepo.mongodb.net/?retryWrites=true&w=majority&appName=c0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

router.post("/new", async function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.SKT)
    );
    try {
      await client.connect();
      try {
        await client
          .db("sscards")
          .collection("themes")
          .insertOne({
            name: req.body.theme.name,
            img: req.body.theme.img,
            subThemes: req.body.theme.subThemes,
            creator: new ObjectId(payload.user._id),
          });
        res.status(200).json({ success: "Theme created" });
      } catch (error) {
        res.status(500).json({ error: error });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } catch (error) {
    res.status(401).json({ error: error });
  }
});

router.delete("/remove/:themeId", async function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.SKT)
    );
    try {
      await client.connect();
      try {
        await client
          .db("sscards")
          .collection("themes")
          .deleteOne({ _id: new ObjectId(req.params.themeId) });
        res.status(200).json({ success: "Theme deleted" });
      } catch (error) {
        res.status(404).json({ error: error });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } catch (error) {
    res.status(401).json({ error: error });
  }
});

router.use(function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[0];
  if (token !== "Bearer") {
    res.status(401).json({ error: "No token provided" });
  } else {
    next();
  }
});

module.exports = router;
