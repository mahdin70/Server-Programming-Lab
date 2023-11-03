const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const fs = require("fs");
const initializePassport = require("../config/passport");


const usersFile = path.join(__dirname, "..", "users.json");

const loadUsersFromFile = () => {
  try {
    return JSON.parse(fs.readFileSync(usersFile));
  } catch (err) {
    console.error("Error loading users:", err);
    return [];
  }
};

let users = loadUsersFromFile();

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

const saveUsersToFile = () => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

const getLogin = async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "login.html");
  res.sendFile(filePath);
};

const postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

const getRegister = async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "register.html");
  res.sendFile(filePath);
};

const postRegister = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      id: Date.now().toString(),
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    users.push(newUser);
    saveUsersToFile();
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
};

module.exports = {
  getLogin,
  getRegister,
  postLogin,
  postRegister,
};
