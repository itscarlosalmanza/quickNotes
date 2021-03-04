const express = require("express");
// require routes to use
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

// run APP
const app = express();
//set PORT
const PORT = process.env.PORT || 3000;

// set middleware, static, body parsing
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(express.json());

app.use("/api", apiRoutes);

app.use("/", htmlRoutes);

// use port set up and run the server
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
