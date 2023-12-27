import crypto from 'crypto';
import User from '../models/userModel';

const SECRET = process.env.CRYPTO_SECRET;

export const authentication = (salt: string, password: string): string => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET)
    .digest('hex');
};

export const random = (): string => crypto.randomBytes(128).toString('base64');

export const getUsers = () => User.find({});

export const getUserByEmail = (email: string) => User.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) =>
  User.findOne({ 'authentication.sessionToken': sessionToken });

export const getUserById = (id: string) => User.findById(id);

export const createUser = (values: Record<string, any>) => User.create(values);

export const deleteUserById = (id: string) =>
  User.findByIdAndDelete({ _id: id });

export const updateUserById = (
  id: string,
  values: Record<string, any>,
  options: { new: boolean; runValidators: boolean } = {
    new: true,
    runValidators: true,
  }
) => User.findByIdAndUpdate(id, values, options);
