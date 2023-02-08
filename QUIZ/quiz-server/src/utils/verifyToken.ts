import { verify } from "jsonwebtoken";
import path from 'path';
import {Response} from "express";
import {Request} from "express/ts4.0";
import {database} from "../config/database";
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
    verify(token, process.env.ACCESS_TOKEN_SECRET!);
    console.log(token);
  } catch (err) {
    return res.send({
      status: 0,
      response: "USER_ID"
    })
  }

  return next();
}

export const verifyTokenReturnUser = async (req:Request, res:Response, next:any) => {
  console.log(req.headers);
  const authorization = req?.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }
  try {
    console.log(authorization);
    const token = authorization.split(" ")[1];
    console.log(token);
    let userData = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    console.log(typeof(userData));
    database.pool.execute('SELECT user_id, user_name, is_super_user, email FROM `User` WHERE `user_id` = ?',
      [typeof(userData) === 'object' ? userData.userId : null],
      async (err:any, user:any) => {
        if (err) {
          return res.send({
            status: 0,
            response: err.sqlMessage,
            errCode: err.errno
          })
        }

        return res.send({
          status: 1,
          response: {user: user[0]},
        })
        //return next();
      })
  } catch (err) {
    console.log(err);
    return res.send({
      status: 0,
      response: "USER_ID"
    })
  }

  return next();
}