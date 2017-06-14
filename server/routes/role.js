import express from 'express';
import Role from '../controllers/Role';
import auth from '../middlewares/auth';

const role = express.Router();

role.post('/', auth.verifyToken, auth.authorizeAdmin, Role.createRole);
role.get('/', auth.verifyToken, auth.authorizeAdmin, Role.listRole);
role.get('/:id', auth.verifyToken, auth.authorizeAdmin, Role.retrieveRole);
role.put('/:id', auth.verifyToken, auth.authorizeAdmin, Role.updateRole);
role.delete('/:id', auth.verifyToken, auth.authorizeAdmin, Role.deleteRole);

export default role;
