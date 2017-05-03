import express from 'express';
import Role from '../controllers/role';

const role = express.Router();

role.post('/', Role.createRole);
role.get('/', Role.listRole);
role.get('/:id', Role.retrieveRole);
role.put('/:id', Role.updateRole);
role.delete('/:id', Role.deleteRole);

export default role;
