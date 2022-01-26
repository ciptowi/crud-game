const { User, User_biodata, User_game, sequelize } = require("./models");

module.exports = {
  home: (req, res) => {
    res.render("home");
  },

  getFormCreate: (req, res) => {
    res.render("form_create");
  },

  getAllData: (req, res) => {
    User.findAll().then((a) => {
      res.status(200).render("users", { a });
    });
  },

  getUserById: (req, res) => {
    User.findOne({
      model: User,
      where: { id: req.params.id },
      include: [{ model: User_biodata }, { model: User_game }],
    }).then((a) => {
      // res.status(200).json(a);
      res.status(200).render("user", { a });
    });
  },

  getUpdateById: (req, res) => {
    User.findOne({
      model: User,
      where: { id: req.params.id },
      include: [{ model: User_biodata }, { model: User_game }],
    }).then((a) => {
      // res.status(200).json(a);
      res.status(200).render("form_update", { a });
    });
  },

  createData: async (req, res) => {
    const userTransaction = await sequelize.transaction();

    try {
      var resUser = await User.create(
        {
          username: req.body.username,
          password: req.body.password,
        },
        {
          transaction: userTransaction,
        }
      );
      await User_biodata.create(
        {
          user_id: resUser.dataValues.id,
          UserId: resUser.dataValues.id,
          fullname: req.body.fullname,
          gender: req.body.gender,
          address: req.body.address,
        },
        {
          transaction: userTransaction,
        }
      );
      await User_game.create(
        {
          user_id: resUser.dataValues.id,
          UserId: resUser.dataValues.id,
          difficulty: req.body.difficulty,
          level: req.body.level,
          have_won: req.body.have_won,
          have_lost: req.body.have_lost,
        },
        {
          transaction: userTransaction,
        }
      );

      await userTransaction.commit();
      res.status(201).render("message/created");
    } catch (err) {
      console.log(err);
      await userTransaction.rollback();
      res.status(422).send("can't create User");
    }
  },

  updateById: async (req, res) => {
    try {
      await User.update(
        {
          username: req.body.username,
          password: req.body.password,
        },
        {
          where: { id: req.params.id },
        }
      );
      await User_biodata.update(
        {
          fullname: req.body.fullname,
          gender: req.body.gender,
          address: req.body.address,
        },
        {
          where: { user_id: req.params.id },
        }
      );
      await User_game.update(
        {
          difficulty: req.body.difficulty,
          level: req.body.level,
          have_won: req.body.have_won,
          have_lost: req.body.have_lost,
        },
        {
          where: { user_id: req.params.id },
        }
      );

      res.status(201).render("message/updated");
    } catch (err) {
      console.log(err);
      await userTransaction.rollback();
      res.status(422).json("can't update User");
    }
  },

  deleteById: (req, res) => {
    User.destroy({
      where: { id: req.params.id },
    });
    User_biodata.destroy({
      where: { user_id: req.params.id },
    });
    User_game.destroy({
      where: { user_id: req.params.id },
    }).then((a) => {
      res.render("message/deleted");
    });
  },
};
