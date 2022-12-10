import express from 'express';
import db from './connection';
import router from "../routes/router";
import fetch from '../utils/fetchApi';
import dotenv from 'dotenv';
dotenv.config()

global.__basedir = process.cwd();

const app = express();

db.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('stylesheets'));
app.set('view engine', 'ejs')
app.use(router)

fetch.getData()
setInterval(() => {
    fetch.getData()
}, process.env.REFRESH_RATE * 1000);

export default app;