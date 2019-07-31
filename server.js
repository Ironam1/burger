

const express = require("express");
const methOver = require("method-override");
const bodyParser = ("body-parser");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

// override for SQL POST having ?_method=UPDATE
app.use(methOver("_method"));

// handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// routes
const router = require("./controllers/burgers_controller");
app.use(router);

app.listen(PORT, function() {
    console.log("app listening on PORT: " + PORT);
});