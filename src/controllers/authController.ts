import express from 'express';
import { authentication, random, getUserByEmail, createUser } from '../helpers';

const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);

    const user = await getUserByEmail(email).select(
      '+authentication.password +authentication.salt'
    );

    if (!user) return res.sendStatus(400);

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash)
      return res.sendStatus(403);

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie('PR-AUTH', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

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

const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) return res.sendStatus(400);

    const existingUser = await getUserByEmail(email);

    if (existingUser) return res.sendStatus(400);

    const salt = random();
    const user = await createUser({
      username,
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    res.status(201).json({
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
