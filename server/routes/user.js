import express from 'express';
import User from '../controllers/user';
import auth from '../middlewares/auth';

const user = express.Router();

user.get('/', auth.verifyToken, auth.authorizeAdmin, User.getAllUsers);
user.get('/:id', auth.authorizeAdmin, User.getOneUser);
user.get('/:id/documents', auth.authorizeAdmin, User.getUserDocuments);
user.post('/', User.createUser);
user.post('/login', User.login);
user.post('/logout', User.logout);
user.put('/:id', auth.authorizeOwner, User.updateUser);
user.delete('/:id', auth.authorizeAdmin, auth.authorizeOwner, User.deleteUser);

export default user;
