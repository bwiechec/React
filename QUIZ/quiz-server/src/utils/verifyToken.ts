import { verify } from "jsonwebtoken";
import path from 'path';
import {Response} from "express";
import {Request} from "express/ts4.0";
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

export const verifyToken = async (req:Request, res:Response, next:any) => {
  console.log(req.headers);
  const authorization = req?.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }
  try {
    console.log(authorization);
    const token = authorization.split(" ")[1];
    console.log(token);
    verify(token, process.env.ACCESS_TOKEN_SECRET!);
  } catch (err) {
    res.send({
      status: 0,
      response: "USER_ID"
    })
  }

  return next();
}