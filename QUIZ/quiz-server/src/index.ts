import express from 'express';
import path from 'path';
import cors from "cors";
import userResolv from './config/UserResolv';
import bodyParser from "body-parser";
import {verifyToken} from "./utils/verifyToken";
import {Response} from "express/ts4.0";
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const port = 4000;
const app = express();

(async () => {
  app.use(cors());
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.get('/', (_req, res) => {
    res.send({
      status: 1,
      response: "Welcome to quiz-server",
    });
  });

  app.post('/login', userResolv.login, (req, res) => {
    console.log(req.body);
    res.send({
      status: 1,
      response: "you've reached login endpoint!"
    });
  })

  app.post('/register', userResolv.registerUser, (_req, res) => {
    res.send({
      status: 1,
      response: "you've reached register endpoint!"
    });
  })

  app.post('/userList', verifyToken, (_req:any, res:Response) => {
    res.send({
      status: 1,
      response: "USER_ID"
    })
  })

  app.post('/categoryList', verifyToken, (_req:any, res:Response) => {
    res.send({
      status: 1,
      response: "CATEGORY_LIST"
    })
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  })
})()