import express from 'express';
import User from '../controllers/user';

const user = express.Router();

user.get('/', User.getAllUsers);
user.get('/:id', User.getOneUser);
user.get('/:id/documents', User.getUserDocuments);
user.delete('/:id/documents', User.deleteUserDocuments);
user.delete('/:id/');
user.post('/', User.createUser);
user.post('/login', User.login);
user.post('/logout', User.logout);
user.put('/:id', User.updateUser);
user.delete('/:id', User.deleteUser);

export default user;
