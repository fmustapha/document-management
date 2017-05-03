import db from '../models/';

const Roles = db.Role;
const Users = db.User;

export default {
  createRole(req, res) {
    return Roles
      .create(
        req.body
      )
      .then(role => res.status(201).send({
        role,
        message: 'Role created succesfully'
      }))
      .catch(error => res.status(400).send({
        error,
        message: 'Error creating new role'
      }));
  },

  listRole(req, res) {
    return Roles
      .findAll()
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Roles Not Found',
          });
        }
        return res.status(200).send({ role });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error retrieving all roles'
      }));
  },

  retrieveRole(req, res) {
    return Roles
      .findById(req.params.id, {
        include: [{
          model: Users
        }],
      })
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return res.status(200).send({ role });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error occured while retrieving role'
      }));
  },

  updateRole(req, res) {
    return Roles
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return role
          .update({
            title: req.body.title || role.title,
            description: req.body.description || role.descritption
          })
          .then(() => res.status(200).send({
            role,
            message: 'Role updated successfully.'
          }))
          .catch(error => res.status(400).send({
            error,
            message: 'Role did not update successfully.'
          }));
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error updating role'
      }));
  },

  deleteRole(req, res) {
    return Roles
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return role
          .destroy()
          .then(() => res.status(200).send({
            message: 'Role deleted successfully.'
          }));
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error deleting Role.'
      }));
  },
};

