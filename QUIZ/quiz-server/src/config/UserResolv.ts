//import jwt from 'jsonwebtoken';
import {database} from './database';
import {Request} from "express";
import { hash, compare } from 'bcryptjs';


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
        if(err) throw err;

        console.log(await hash(password, 12));


        if (user.length === 0) {
          throw new Error("could not find user");
        }

        console.log(password + ' ' + user[0].user_password)
        const valid = await compare(password, user[0].user_password);
        console.log(valid)
        if(!valid){
          throw new Error("Wrong password");
        }
        //create token
        res.send({
          status: 1,
          response: "SUCCESS!"
        })
      })

    return 'xd';
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
        if(err) throw err;

        res.send({
          status: 1,
          response: "SUCCESS!"
        })

      })

    return 'XD';
  }
}
