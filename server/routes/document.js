import express from 'express';
import Documents from '../controllers/document';
import auth from '../middlewares/auth';

const document = express.Router();

document
.post('/', auth.verifyToken, Documents.createDocument);

document
.get('/', auth.verifyToken, Documents.listDocuments);

document
.get('/:id', auth.verifyToken, Documents.findDocument);

document
.put('/:id', auth.verifyToken, Documents.modifyDocument);

document
.delete('/:id', auth.verifyToken, Documents.deleteDocument);

export default document;
