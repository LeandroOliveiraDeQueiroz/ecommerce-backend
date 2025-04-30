import express from 'express';
import dotenv from 'dotenv';
import client from './db';
import { createDatabase } from './db/';
import userRouter from './routes/users';
import checkAuth from './middleware/checkAuth';
import cors from 'cors';
import favoriteProductsListRouter from './routes/favoriteProductsList';

dotenv.config();

const app = express();
const port = 3000;

async function connectToDb() {
  try {
    await client.connect();

    await createDatabase();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectToDb();

//TODO configure CORS accept correctly domains
app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json());
app.use(checkAuth);
app.use('/user', userRouter);
app.use('/favorite-products-list', favoriteProductsListRouter);

app.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT NOW()');
    res.send(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {});
