import { NextApiRequest, NextApiResponse } from "next";

const feeback = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    name: "John",
  });
};

export default feeback;
