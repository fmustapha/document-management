import express from 'express';
import Search from '../controllers/Search';
import auth from '../middlewares/auth';

const search = express.Router();

search.get('/', Search.searchPage);
search.get('/users', auth.verifyToken, auth.authorizeAdmin,
 auth.validateSearch, Search.userSearch);
search.get('/documents', auth.verifyToken, auth.validateSearch, Search.documentSearch);

export default search;
