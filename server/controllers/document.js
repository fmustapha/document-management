import db from '../models';
import Helper from '../helper/Helper';

export default {
  /**
    * create a document
    * Route: POST: /documents/
    *
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} response object or void
    */
  createDocument(req, res) {
    if (!req.body.ownerId) {
      req.body.ownerId = req.decoded.id || req.decoded.data.id;
    }
    if (!req.body.access || ['private', 'public', 'role'].indexOf(req.body.access) === -1) {
      return res.status(400).json({ error: {
        message: 'Access type can only be public, private or role'
      } });
    }
    return db.Document.create(req.body)
      .then(((document) => {
        res.status(200)
          .send({
            document,
            message: 'Document has been successfully created'
          });
      }))
      .catch(() => {
        res.status(400)
          .send({ message: 'Invalid credentials supplied' });
      });
  },


  /**
    * find a document
    * Route: GET: /documents/:id
    *
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} response object or void
    */
  findDocument(req, res) {
    return db.Document.findById(req.params.id,
      {
        include: [
          {
            model: db.User,
            attributes: [
              'id',
              'username',
              'roleId'
            ]
          }
        ]
      }
    )
      .then((document) => {
        if (!document) {
          return res.status(404).send({ message: 'Document not found' });
        }
        const roleId = req.decoded.roleId || req.decoded.data.roleId;
        if ((Helper.isOwner(req, res, document) ||
         Helper.isAdmin(parseInt(roleId, 10))
          || document.access !== 'private')) {
          return res.status(200)
            .send({
              message: 'Successful',
              document
            });
        }
        return res.status(403).send({ message: 'Unauthorized access' });
      })
      .catch(() => res.status(400).send({
        message: 'Invalid parameter(s)'
      }));
  },

  /**
    * list all documents
    * Route: GET: /documents/
    *
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} response object or void
    */
  listDocuments(req, res) {
    req.odmsFilter.attributes = Helper.getDocAttribute();
    db.Document
      .findAndCountAll(req.odmsFilter)
      .then((documents) => {
        const condition = {
          count: documents.count,
          limit: req.odmsFilter.limit,
          offset: req.odmsFilter.offset
        };
        delete documents.count;
        const pagination = Helper.pagination(condition);
        res.status(200)
          .send({
            message: 'You have successfully retrieved documents',
            documents,
            pagination
          });
      }).catch(() => res.status(400).send({ message: 'Invalid parameter(s)' }));
  },

  /**
   * Get all document
   * Route: PUT: /documents/
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} response object or void
   */
  modifyDocument(req, res) {
    const roleId = req.decoded.roleId || req.decoded.data.roleId;
    db.Role.findById(roleId)
    .then(() => db.Document
        .findById(req.params.id)
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document Not Found',
              });
            }
            if (Helper.isAdmin(roleId)
            || Helper.isOwner(req, res, document)) {
              return document.update(req.body)
                .then(updatedDocument => res.status(200).send({
                  updatedDocument,
                  message: 'Document updated successfully'
                }));
            }
            return (res.status(403)
               .send({ message: 'Unauthorized Access' }));
          })
          .catch(() => res.status(400).send({
            message: 'Error updating document, invalid parameter(s)'
          })));
  },


  /**
   * Delete document
   * Route: DELETE: /document/:id
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} containing successful message or error message
   */
  deleteDocument(req, res) {
    const roleId = req.decoded.roleId || req.decoded.data.roleId;
    db.Document
      .find({
        where: {
          id: req.params.id
        },
      })
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        if (Helper.isOwner(req, res, document)
        || Helper.isAdmin(roleId)) {
          return document
          .destroy()
          .then(() => res.status(200).send({
            message: 'Document, has been successfully deleted'
          }));
        }
        return (res.status(403)
               .send({ message: 'Unauthorized Access' }));
      })
      .catch(() => res.status(400).send({
        message: 'Error deleting document'
      }));
  },
};
