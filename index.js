const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
require("dotenv").config();

// MiddleWere
app.use(express.json());
app.use(cors());

// Mongodb
const { MongoClient, ServerApiVersion } = require("mongodb");
// URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0lpuf.mongodb.net/?retryWrites=true&w=majority`;
// Client info
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const servicesRoutes = require("./routes/services.route");

async function run() {
  // Collections

  app.use(servicesRoutes);

  try {
    await client.connect();
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// Initial API
app.get("/", (req, res) => {
  res.send("Hello there!");
});
app.use((req, res, next) => {
  res.status(404).json({
    message: "Resource Not Found",
  });
});

// Listening port
app.listen(port, () => {
  console.log("Welcome To Shohoj Pay Server");
});
