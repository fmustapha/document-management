import db from '../models/';

const allRoles = ['admin', 'regular'];
const Roles = db.Role;
const Users = db.User;

const Role = {

  /**
  * Create a role
  * Route: POST: /roles
  *
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  createRole(req, res) {
    if (allRoles.indexOf(req.body.title) === -1) {
      return res.status(403).json({ message: 'Invalid role title' });
    }
    Roles
      .create(
        req.body
      )
      .then(role => res.status(201).send({
        role,
        message: 'Role created succesfully'
      }))
      .catch(() => {
        res.status(400).send({
          message: 'Error creating new role'
        });
      });
  },


/**
  * List roles
  * Route: GET: /roles or GET: /roles
  *
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
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
      .catch(() => res.status(400).send({
        message: 'Error retrieving all roles'
      }));
  },

/**
  * Get a role
  * Route: GET: /roles/:id or GET: /roles
  *
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
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
      .catch(() => res.status(400).send({
        message: 'Error occured while retrieving role'
      }));
  },


/**
  * Update a role
  * Route: PUT: /roles/:id
  *
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
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
          .update(req.body)
          .then(() => res.status(200).send({
            message: 'Role updated successfully.',
            role
          }))
          .catch(error => res.status(400).send({
            message: 'Role did not update successfully.',
            error
          }));
      })
      .catch(() => res.status(400).send({
        message: 'Error updating role'
      }));
  },

/**
  * Delete a role
  * Route: DELETE: /roles/:id
  *
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
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
      .catch(() => res.status(400).send({
        message: 'Cannot delete role with users assigned to it.'
      }));
  },
};

export default Role;
