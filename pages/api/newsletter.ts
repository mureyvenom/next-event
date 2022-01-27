import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../helpers/mongoConnect";
import User from "./models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { email } = req.body;

      if (!email || !email.includes("@")) {
        res.status(422).json({
          message: "Enter a valid email address",
        });
        return;
      }

      await dbConnect();

      //check if user with email exists

      const existingUser = await User.find({
        email: email,
      });

      if (existingUser.length) {
        res.status(422).json({
          message: "This email already exists",
        });
        return;
      }

      const newUser = new User({
        email: email,
      });

      await newUser.save();

      res.status(201).json({
        message: "Registration successful",
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "wahala",
    });
  }
};

export default handler;
