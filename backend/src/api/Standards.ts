const express = require("express");
const standardsRouter = express.Router();

import { standardRepo } from "../app";

standardsRouter.get("/", async (req, res)=> {
  const allstandards = await standardRepo.find();
  res.send(allstandards);
});


module.exports = {
  standardsRouter,
};