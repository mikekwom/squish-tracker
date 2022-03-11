const Sequelize = require("sequelize");
const path = require("path");
const bcrypt = require("bcrypt");
require("dotenv").config();

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  addUser: async (req, res) => {
    // try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    };

    sequelize
      .query(
        `
      SELECT email, username FROM client
      WHERE lower(email) = '${user.email.toLowerCase()}' OR lower(username) = '${user.username.toLowerCase()}';`
      )
      .then((dbres) => {
        if (dbres[0][0] && dbres[0][0].email)
          return res.status(409).send("Email already in use!");
        if (dbres[0][0] && dbres[0][0].username)
          return res.status(409).send("Username already in use!");
      })
      .catch((error) => {
        console.log(error);
        return res.sendStatus(500);
      });

    sequelize
      .query(
        `
          INSERT INTO client
          (username, email, password)
          VALUES ('${user.username}', '${user.email}', '${user.password}')
          RETURNING *;
          `
      )
      .then((dbres) => res.status(200).send(dbres[0][0]))
      .catch((err) => console.log(err));
    // } catch {
    //   res.status(500).send();
    // }

    // console.log(`Out of function: ${hashedPassword}`);
  },

  serveCreateProfile: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/register.html"));
  },

  login: async (req, res) => {
    const user = sequelize.query(
      `SELECT username FROM client WHERE username = '${req.body.username}'`
    );
    if (user == null) {
      return res.status(400).send("Cannot find user");
    }
    if (
      await bcrypt.compare(req.body.password, user.password, (err, result) => {
        result = true;
      })
    ) {
      // ?????? go to profile when logged in
      res.sendFile(path.join(__dirname, "../public/profile.html"));
    } else {
      res.send("invalid input");
    }
  },

  serveProfile: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  },

  addSquish: (req, res) => {
    let { name, size, bio, purchaseDate, squishDate, user } = req.body;

    name = sequelize.escape(name);
    size = sequelize.escape(size);
    bio = sequelize.escape(bio);
    purchaseDate = sequelize.escape(purchaseDate);
    squishDate = sequelize.escape(squishDate);
    user = sequelize.escape(user);

    sequelize
      .query(
        `
      INSERT INTO squish
      (name, size, bio, purchase_date, squish_date, squish_owner, created)
      VALUES (${name}, ${size}, ${bio}, ${purchaseDate}, ${squishDate}, (SELECT id FROM client WHERE username = ${user}), NOW())
      RETURNING *;
      `
      )
      .then((dbres) => res.status(200).send(dbres[0]))
      .catch((err) => console.log(err));
  },

  getAllSquish: (req, res) => {
    let username = req.params.username;
    username = sequelize.escape(username);

    sequelize
      .query(
        `
      SELECT *
      FROM squish
      WHERE squish_owner = (SELECT id FROM client WHERE username = ${username})
      ORDER BY created DESC;
      `
      )
      .then((dbres) => res.status(200).send(dbres[0]))
      .catch((err) => console.log(err));
  },

  //   authenticateToken: (req, res, next) => {
  //     const authHeader = req.headers["authorization"];
  //     const token = authHeader && authHeader.split(" ");
  //     if (token == null) return res.sendStatus(401);

  //     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET),
  //       err,
  //       (user) => {
  //         if (err) return res.sendStatus(403);
  //         req.user = user;
  //         next();
  //       };
  //   },
};
