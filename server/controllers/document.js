import db from '../models';
import Helper from '../helper/Helper';

export default {

  createDocument(req, res) {
    return db.Document.create(req.body)
      .then(((newDocument) => {
        res.status(200)
          .send({
            newDocument,
            message: 'Document has been successfully created'
          });
      }))
      .catch((error) => {
        res.status(400)
          .send(error);
      });
  },

  findDocument(req, res) {
    return db.Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).send({ message: 'Document not found' });
        }
        return res.status(200)
        .send({
          message: 'Successful',
          document
        });
      })
      .catch(error => res.status(400).send({
        error
      }));
  },

  // listDocuments(req, res) {
  //   return db.Document.findAll({
  //     offset: req.query.offset || 0,
  //     limit: req.query.limit || 20,
  //     include: [db.User],
  //     order: [
  //       ['updatedAt', 'DESC']
  //     ]
  //   })
  //   .then(document => res.status(200)
  //   .send({ message: 'Successfull', document }))
  //   .catch(error => res.status(400).send({
  //     error,
  //     message: 'Error retrieving documents'
  //   }));
  // },

/**
    * Get all document
    * Route: GET: /documents/
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
            message: 'You have successfully retrieved all documents',
            documents,
            pagination
          });
      });
  },


  modifyDocument(req, res) {
    db.Role.findById(req.decoded.data.roleId)
    .then(() => db.Document
        .find({ where: {
          id: req.params.id } })
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document Not Found',
              });
            }
            if (Helper.isAdmin(req, res)
            || Helper.isOwner(req, res, document)) {
              return document
              .update(req.body)
              .then(updatedDoc => res.status(200).send({
                updatedDoc,
                message: 'Document updated successfully'
              }));
            }
            return (res.status(403)
               .send({ message: 'Unauthorized Access' }));
          })
          .catch(error => res.status(400).send({
            error,
            message: 'Error updating document'
          })));
  },

  deleteDocument(req, res) {
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
        || Helper.isAdmin(req, res)) {
          return document
          .destroy()
          .then(() => res.status(200).send({
            message: 'Document, has been successfully deleted'
          }));
        }
        return (res.status(403)
               .send({ message: 'Unauthorized Access' }));
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error deleting document'
      }));
  },
};
