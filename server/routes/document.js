import express from 'express';
import Documents from '../controllers/document';

const document = express.Router();

document.post('/', Documents.createDocument);
document.get('/', Documents.listDocuments);
document.get('/:id', Documents.findDocument);
document.put('/:id', Documents.modifyDocument);
document.delete('/:id', Documents.deleteDocument);

export default document;
