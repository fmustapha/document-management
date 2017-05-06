import express from 'express';
import Search from '../controllers/search';

const search = express.Router();

search.get('/', Search.searchPage);
search.get('/users', Search.userSearch);
search.get('/documents', Search.documentSearch);

export default search;
