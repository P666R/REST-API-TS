import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes';

dotenv.config();

const app = express();

//* Setting credentials: true in the CORS configuration allows browser to include credentials in cross-origin requests
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const PORT: string | number = process.env.PORT || 3000;

const DB = process.env.MONGODB_URL.replace(
  '<password>',
  process.env.MONGODB_PASSWORD
);

//* telling Mongoose to use native Promise implementation provided by JS
mongoose.Promise = Promise;

//* Define the function to start the server
const startServer = async (
  db: string,
  port: string | number
): Promise<void> => {
  try {
    //* Connect to the database
    await mongoose.connect(db);
    console.log('Database successfully connected...');

    //* Start the server
    server.listen(port, () => {
      console.log(`Server running on PORT: ${port}...`);
    });
  } catch (error) {
    //* Log any errors that occur while starting the server
    console.log('Error while starting server: ', error);
  }
};

startServer(DB, PORT);

app.use('/', router());
