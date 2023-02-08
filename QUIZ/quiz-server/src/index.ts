import express from 'express';
import path from 'path';
import cors from "cors";
import userResolv from './config/UserResolv';
import bodyParser from "body-parser";
import {verifyToken, verifyTokenReturnUser} from "./utils/verifyToken";
import {Request, Response} from "express/ts4.0";
import {database} from "./config/database";
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

  app.post('/categoryList', (_req:any, res:Response) => {
    database.pool.execute('SELECT quiz_category_id AS categoryId, quiz_category_name as categoryName FROM Quiz_Category;',
      [],
      async (err:any, quizCategoryList:any) => {
        if (err) {
          res.send({
            status: 0,
            response: err.sqlMessage,
            errCode: err.errno
          })
          return 0;
        }

        res.send({
          status: 1,
          response: {quizCategoryList: quizCategoryList},
        })
        return 1;
      })
  })

  app.post('/getUserData', verifyTokenReturnUser, (_req:any, _res:Response) => {
  })

  app.post('/getCategoryQuizzes', (req:Request, res:Response) => {
    let { categoryId } = req.body

    database.pool.execute(`SELECT quiz_id as quizId, quiz_name as quizName, user_name as userName, quiz_description as quizDescription
                            FROM Quiz
                            LEFT JOIN user
                            ON Quiz.creator_id = user.user_id
                            WHERE Quiz.quiz_category_id = ?
                            ORDER BY Quiz.date_created DESC`,
      [categoryId ?? 'null'],
      async (err:any, quizList:any) => {
        if (err) {
          res.send({
            status: 0,
            response: err.sqlMessage,
            errCode: err.errno
          })
          return 0;
        }

        res.send({
          status: 1,
          response: {quizList: quizList},
        })
        return 1;
      })
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  })
})()