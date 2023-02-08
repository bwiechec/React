//import jwt from 'jsonwebtoken';
import {database} from './database';
import {Request} from "express";
import { hash, compare } from 'bcryptjs';
import {createAccessToken} from "../utils/token";


export default class userResolv {
  static login = async (req:Request, res:any) => {
    console.log(req.body);
    let {
      username,
      password
    } = req.body
    console.log(username + ' ' + password)
    database.pool.execute('SELECT * FROM `User` WHERE `user_name` = ? OR `email` = ?',
      [username, username],
      async (err:any, user:any) => {
        if(err){
          res.send({
            status: 0,
            response: err.sqlMessage,
            errCode: err.errno
          })
          return 0;
        }

        console.log(await hash(password, 12));

        if (user.length === 0) {
          res.send({
            status: 0,
            response: "USER NOT FOUND!"
          })
          return 0;
        }

        console.log(user[0])
        const valid = await compare(password, user[0].user_password);
        console.log(valid)
        if(!valid){
          res.send({
            status: 0,
            response: "INVALID PASSWORD!"
          })
          return 0;
        }
        //create token
        res.send({
          status: 1,
          response: "SUCCESS!",
          token: createAccessToken(user[0].user_id)
        })
        return 1;
      })

    return 0;
  };

  static registerUser = async (req:Request, res:any) => {
    const {
      username,
      password,
      email,
      birthdate
    } = req.body;

    const encryptedPassword = await hash(password, 12);

    console.log(username + ' ' +
      encryptedPassword + ' ' +
      email + ' ' +
      birthdate);

    database.pool.execute('INSERT INTO `User`(user_name, user_password, email, birth_date) ' +
        'VALUES (?, ?, ?, ?)',
      [username, encryptedPassword, email, new Date(birthdate)],
      (err:any, _user:any) => {
        if(err){
          res.send({
            status: 0,
            response: err.sqlMessage,
            errCode: err.errno
          })
          return 0;
        }

        res.send({
          status: 1,
          response: "SUCCESS!"
        })
        return 1;
      })

    return 0;
  }
}
