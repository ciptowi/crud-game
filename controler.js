const { User, User_biodata, User_game } = require("./models");

module.exports = {
  home: (req, res) => {
    res.render("home");
  },

  getFormCreate: (req, res) => {
    res.render("form_create");
  },

  getAllData: (req, res) => {
    User.findAll()
      // User_biodata.findAll()
      // User_game.findAll()
      .then((a) => {
        res.status(200).render("users", { a });
      });
  },

  getUserById: (req, res) => {
    User.findOne({
      model: User,
      where: { id: req.params.id },
    }).then((a) => {
      res.status(200).render("user", { a });
    });
  },

  getUpdateById: (req, res) => {
    User.findOne({
      model: User,
      where: { id: req.params.id },
    }).then((a) => {
      res.status(200).render("form_update", { a });
    });
  },

  createData: (req, res) => {
    User.create({
      username: req.body.username,
      password: req.body.password,
    });
    User_biodata.create({
      fullname: req.body.fullname,
      gender: req.body.gender,
      address: req.body.address,
    });
    User_game.create({
      difficulty: req.body.difficulty,
      level: req.body.level,
      have_won: req.body.have_won,
      have_lost: req.body.have_lost,
    })
      .then((a) => {
        res.status(201).render("message/created");
      })
      .catch((err) => {
        res.status(422).send("can't create User");
      });
  },

  updateById: (req, res) => {
    User.update(
      {
        title: req.body.title,
        body: req.body.body,
        approved: req.body.approved,
      },
      {
        where: { id: req.params.id },
      }
    );
    User_biodata.update(
      {
        fullname: req.body.fullname,
        gender: req.body.gender,
        address: req.body.address,
      },
      {
        where: { id: req.params.id },
      }
    );
    User_game.update(
      {
        difficulty: req.body.difficulty,
        level: req.body.level,
        have_won: req.body.have_won,
        have_lost: req.body.have_lost,
      },
      {
        where: { id: req.params.id },
      }
    )
      .then((a) => {
        res.status(201).render("message/updated");
      })
      .catch((err) => {
        res.status(422).json("can't update User");
      });
  },

  deleteById: (req, res) => {
    User.destroy({
      where: { id: req.params.id },
    });
    User_biodata.destroy({
      where: { id: req.params.id },
    });
    User_game.destroy({
      where: { id: req.params.id },
    }).then((a) => {
      res.render("message/deleted");
    });
  },
};
