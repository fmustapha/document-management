import express from 'express';
import User from '../controllers/User';
import auth from '../middlewares/auth';
import validateSignup from '../middlewares/validateSignup';

const user = express.Router();

user.get('/', auth.verifyToken, auth.authorizeAdmin,
 auth.validateSearch, User.getAllUsers);
user.get('/:id', auth.verifyToken, auth.authorizeAdmin, User.getOneUser);
user.get('/:id/documents',
auth.verifyToken, auth.authorizeAdmin, User.getUserDocuments);
user.post('/', validateSignup, User.createUser);
user.post('/login', User.login);
user.post('/logout', User.logout);
user.put('/:id', auth.verifyToken, auth.authorizeAdmin, User.updateUser);
user.get('/active', auth.verifyToken, User.activeUser);
user.delete('/:id',
auth.verifyToken, auth.authorizeAdmin || auth.authorizeOwner, User.deleteUser);

export default user;
