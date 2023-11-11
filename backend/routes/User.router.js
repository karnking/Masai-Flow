const express = require("express");
const { UserModel } = require("../models/User.model");
const referralCodeGenerator = require("referral-code-generator");
const bcrypt = require("bcrypt");

const UserRouter = express.Router();

UserRouter.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await UserModel.find({ uid });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

UserRouter.post("/addUser", async (req, res) => {
  try {
    const { username, email, password, uid, number, profilePic } = req.body;

    const PresentOr = UserModel.findOne({ email });

    if (PresentOr) {
      res.status(407).send({ msg: "Email Already Exist In Database" });
    } else {
      bcrypt.hash(password, 4, async function (err, hash) {
        const new_user = await new UserModel({
          username,
          email,
          password: hash,
          uid,
          number,
          profilePic,
          referalCode: referralCodeGenerator.alpha("lowercase", 12),
        });
        await new_user.save();
      });

      res.status(200).send({ msg: "User Added Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

UserRouter.put("/editUser/:id", async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    res.status(200).send({ msg: "User Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = {
  UserRouter,
};
