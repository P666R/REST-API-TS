import express from 'express';
import {
  getUserById,
  deleteUserById,
  getUsers,
  updateUserById,
} from '../helpers';

//* get all users
export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

//* get a user
export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) return res.sendStatus(400);

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

//* update a user
export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const updatedUser = await updateUserById(id, { username });

    if (!updatedUser) return res.sendStatus(400);

    res.status(200).json({
      status: 'success',
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

//* delete a user
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    if (!deletedUser) return res.sendStatus(400);

    res.status(204).json({
      status: 'success',
      data: {
        deletedUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
