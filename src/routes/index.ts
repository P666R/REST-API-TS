import express from 'express';
import authentication from './authRoutes';
import users from './userRoutes';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);

  return router;
};
