// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
// import prisma from "./db/prisma";
import client from './db';
import { createDatabase } from './db/';
import userRouter from './routes/users';
dotenv.config();

const app = express();
const port = 3000;

async function connectToDb() {
  try {
    await client.connect();
    console.log('Connected to the database');
    await createDatabase();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectToDb();

app.use(express.json());
app.use('/user', userRouter);

app.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT NOW()');
    // console.log("prisma", prisma);
    res.send(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
