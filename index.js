const express = require("express");
const app = express();
const port = 4000;
const {
  home,
  getFormCreate,
  getAllData,
  getUserById,
  getUpdateById,
  createData,
  updateById,
  deleteById,
} = require("./controler");
const methodOverride = require("method-override");

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

app.get("/", home);
app.get("/form", getFormCreate);
app.post("/user", createData);
app.get("/users", getAllData);
app.get("/user/:id", getUserById);
app.get("/update/:id", getUpdateById);
app.put("/update/:id", updateById);
app.get("/delete/:id", deleteById);

app.listen(port, () => {
  console.log(`Program running at port ${port}`);
});
