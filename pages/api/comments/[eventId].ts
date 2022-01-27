import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../helpers/mongoConnect";
import Comment from "../models/Comment";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { eventId } = req.query;
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({
        message: "Enter valid data to post a comment",
      });
      return;
    }

    await dbConnect();

    const newComment = new Comment({
      eventId: eventId,
      email: email,
      text: text,
      name: name,
    });

    const returned = await newComment.save();
    console.log(returned);

    res.status(201).json({
      message: "Comment added",
      commentData: returned,
    });
  }

  if (req.method === "GET") {
    await dbConnect();

    const comments = await Comment.find({
      eventId: eventId,
    });

    res.status(200).json({
      message: "Comments fetched",
      comments: comments,
    });
  }
};

export default handler;
