import express from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
  router.get('/users/:id', isAuthenticated, getUser);
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
};
