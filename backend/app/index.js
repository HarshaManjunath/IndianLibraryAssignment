const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const configureDB = require("./config/database");


configureDB();
app.use(express.json());


var privacyRoutes = require("./config/routes");
privacyRoutes(app);
const port = 3000;


app.listen(port, () => {
    console.log("server is running on port", port);
});
