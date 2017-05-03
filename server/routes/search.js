import express from 'express';
import Search from '../controllers/search';

const search = express.Router();

// search.get('/', Search);
search.get('/users/?q={username}', Search.search);
// search.get('/documents/?q={doctitle}', Search.getOneDocument);
export default search;
