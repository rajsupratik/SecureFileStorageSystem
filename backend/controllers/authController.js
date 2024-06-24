const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  const password_hash = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password_hash, email });
  await newUser.save();
  res.status(201).send('User registered');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};
