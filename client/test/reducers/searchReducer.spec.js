import chai from 'chai';
import search from '../../reducers/searchReducer';
import types from '../../actions/actionTypes';

const expect = chai.expect;

describe('search reducer', () => {
  let userResult;
  let documentResult;
  beforeEach((done) => {
    userResult = {
      users: {
        pagination: {
          page_count: 1,
          total_count: 1,
          page_size: 10,
          page: 1
        },
        user: [
          {
            id: 4,
            username: 'johndoe',
            firstname: 'Johnathan',
            lastname: 'Doe',
            email: 'johndoe@gmail.com',
            roleId: 2,
            createdAt: '2017-05-07T14:57:12.870Z',
            updatedAt: '2017-05-07T14:59:43.747Z'
          }
        ]
      }
    };
    documentResult = {
      document: {
        pagination: {
          page_count: 1,
          total_count: 1,
          page_size: 10,
          page: 1
        },
        document: [
          {
            id: 39,
            title: 'cscscscssc',
            content: '<p>cscscssssssssss</p>',
            accessId: 1,
            ownerId: 1,
            createdAt: '2017-05-07T20:53:42.686Z',
            updatedAt: '2017-05-07T20:53:42.686Z',
            folderId: null
          }
        ]
      }
    };
    done();
  });
  describe('SEARCH_USER', () => {
    it('should add results from search to the user search state', (done) => {
      const initialState = {
        search: {
          user: null,
          document: null
        }
      };

      const action = { type: types.SEARCH_USER, result: userResult };
      const newState = search(initialState.search, action);
      expect(newState.user).to.be.an('object');
      expect(newState.user).to.eql(userResult);
      expect(newState).to.not.eql(initialState);
      done();
    });
  });
  describe('SEARCH_DOCUMENT', () => {
    it('should add results from search to the document search state', (done) => {
      const initialState = {
        search: {
          user: null,
          document: null,
        },
      };

      const action = { type: types.SEARCH_DOCUMENT, result: documentResult };
      const newState = search(initialState.search, action);
      expect(newState.document).to.be.an('object');
      expect(newState.document).to.eql(documentResult);
      expect(newState).to.not.eql(initialState);
      done();
    });
  });

  // describe('CLEAR_SEARCH', () => {
  //   it('should add results from search to the user search state', (done) => {
  //     const initialState = {
  //       results: {
  //         users: searchUsers,
  //         docs: searchDocs,
  //       },
  //       searchPage: 1
  //     };

  //     const action = { type: 'CLEAR_SEARCH' };
  //     const newState = search(initialState, action);
  //     expect(newState.results.docs).to.eql(null);
  //     expect(newState.results.users).to.eql(null);
  //     expect(newState).to.not.eql(initialState);
  //     done();
  //   });
  // });
  // describe('NOT_FOUND_DOCS', () => {
  //   it('should add results from search to the user search state', (done) => {
  //     const initialState = {
  //       results: {
  //         users: searchUsers,
  //         docs: searchDocs,
  //       },
  //       searchPage: 1
  //     };

  //     const action = { type: 'NOT_FOUND_DOCS' };
  //     const newState = search(initialState, action);
  //     expect(newState.results.docs).to.eql(null);
  //     expect(newState.results.users).to.eql(searchUsers);
  //     expect(newState).to.not.eql(initialState);
  //     done();
  //   });
  // });
  // describe('NOT_FOUND_USERS', () => {
  //   it('should add results from search to the user search state', (done) => {
  //     const initialState = {
  //       results: {
  //         users: searchUsers,
  //         docs: searchDocs,
  //       },
  //       searchPage: 1
  //     };

  //     const action = { type: 'NOT_FOUND_USERS' };
  //     const newState = search(initialState, action);
  //     expect(newState.results.users).to.eql(null);
  //     expect(newState.results.docs).to.eql(searchDocs);
  //     expect(newState).to.not.eql(initialState);
  //     done();
  //   });
  // });
});
