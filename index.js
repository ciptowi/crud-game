const express = require("express");
const app = express();
const port = 4000;
const methodOverride = require("method-override");
const router = require("./router");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use(router);

app.listen(port, () => {
  console.log(`Program running at port ${port}`);
});
