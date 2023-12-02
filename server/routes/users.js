const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

// For the signup page
router.post("/signUp", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ status: "duplicate", error: "Duplicate email" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);

    console.log(`${req.body.name} ${req.body.email} ${req.body.password}`);
    const user = await User.create({
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      movie: [],
    });
    console.log(user);

    return res.status(201).json({ status: "ok", user });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
});

// for the Login page which is also the default page retruns user id aswell

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ status: "Email doesn't exist" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      return res.json({ status: "ok", user: true, id: user.id });
    } else {
      return res.json({ status: "the password is incorrect" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error" });
  }
});

// To get the movies when the movies page is loaded for specific userid

router.get("/home/:key", async (req, res) => {
  const id = req.params.key;

  try {
    const user = await User.findOne({ id: id });
    console.log(user);

    if (user) {
      return res.json({ status: "ok", movies: user.movies || [] });
    } else {
      return res.json({ status: "error" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal Server Error" });
  }
});

// To update the movies when the user make any change in the list.

router.put("/home/:key", async (req, res) => {
  const id = req.params.key;
  const movies = req.body.movies;
  console.log(id);

  try {
    const user = await User.findOneAndUpdate(
      { id: id },
      { $set: { movies: movies } },
      { new: true }
    );

    if (user) {
      return res.json({ status: "ok", user });
    } else {
      return res.json({ status: "error", error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal Server Error" });
  }
});

module.exports = router;
