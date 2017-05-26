import express from 'express';
import Search from '../controllers/search';
import auth from '../middlewares/auth';

const search = express.Router();

search.get('/', Search.searchPage);
search.get('/users', auth.validateSearch, Search.userSearch);
search.get('/documents', auth.validateSearch, Search.documentSearch);

export default search;
