import db from '../models';
import Helper from '../helper/Helper';

// console.log(userModel)
export default {

  createDocument(req, res) {
    console.log(req.body, 'req.body');
    db.Document.create(req.body)
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

  getDocument(req, res) {
    res.send('Get all documents');
    // return res.status(200)
    //   .send({
    //     message: 'You have successfully retrived this user',
    //     user: Helper.getUserProfile(req.getUser)
    //   });
  },

  getUserDocuments(req, res) {
    res.send('Get documents for one user');
  },

  findDocument(req, res) {
    res.send('Find a particular document');
  },

  modifyDocument(req, res) {
    res.send('Make changes to a document');
  },

  deleteDocument(req, res) {
    res.send('Document has been successfully deleted');
  },
};