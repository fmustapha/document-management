import chai from 'chai';
import documentReducer from '../../reducers/documentReducer';
import types from '../../actions/actionTypes';

const expect = chai.expect;

describe('documents reducer', () => {
  let initialState;
  let docPayload;
  const document = {
    id: 32,
    title: 'A',
    content: 'nkscnkncsn'
  };
  beforeEach((done) => {
    initialState = {
      currentDocument: { id: 21, title: 'doc', content: 'contains...' },
      userDocuments: null,
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
      error: null
    };
    docPayload = {
      pagination: {
        page_count: 3,
        total_count: 3,
        page_size: 1,
        page: 1
      },
      documents: [
        {
          id: 40,
          title: 'demo',
          content: 'demo test',
          accessId: 1,
          ownerId: 1,
          createdAt: '2017-05-07T20:54:02.244Z',
          updatedAt: '2017-05-07T20:54:02.244Z',
          folderId: null,
          User: {
            id: 1,
            username: 'fyodor',
            roleId: 1
          }
        }
      ]
    };
    done();
  });

  describe('ADD_DOCUMENT', () => {
    it('should add a created document to documents state in the store',
    (done) => {
      initialState.documents = docPayload;
      const action = { type: types.ADD_DOCUMENT, document };
      const newState = documentReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState.documents[0].title).to.eql('A');
      expect(newState.documents[0].id).to.eql(32);
      done();
    });
  });
  describe('LIST_DOCUMENT', () => {
    it('should update the documents state in the store with all documents',
    (done) => {
      const action = { type: types.LIST_DOCUMENT, documents: { documents: [] } };
      const newState = documentReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState.documents).to.not.eql(null);
      done();
    });
  });
  describe('LIST_USER_DOCUMENT', () => {
    it('should update the documents state with all the user\'s documents',
    (done) => {
      const action = { type: types.LIST_USER_DOCUMENT, documents: { documents: [] } };
      const newState = documentReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState.documents).to.not.eql(null);
      done();
    });
  });
  describe('UPDATE_DOCUMENT', () => {
    it('should update the state of the document', (done) => {
      const updatedDocument = { id: 21,
        title: 'a doc',
        content: 'contains words' };
      const action = { type: types.UPDATE_DOCUMENT, updatedDocument };
      const newState = documentReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      done();
    });
  });
  describe('ADDING_DOCUMENT', () => {
    it('should change the state of isCreating in the state', (done) => {
      const isCreating = false;
      const action = { type: types.ADDING_DOCUMENT, isCreating };
      const newState = documentReducer(initialState, action);
      expect(newState.isCreating).to.not.eql(initialState.isCreating);
      done();
    });
  });
  describe('VIEW_DOCUMENT', () => {
    it('should change a particular document in the store when it is updated',
    (done) => {
      const action = { type: types.VIEW_DOCUMENT, document };
      const newState = documentReducer(initialState, action);
      expect(newState.currentDocument.id).to.eql(32);
      done();
    });
  });
  describe('DELETE_DOCUMENT', () => {
    it(`should remove a deleted document from the 
    user's document and all documents in the store`,
    (done) => {
      initialState.documents = { rows: docPayload.documents };
      initialState.userDocuments = { rows: docPayload.documents };
      const id = 40;
      const action = { type: types.DELETE_DOCUMENT, id };
      const newState = documentReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState.documents.rows[0]).to.not.eql(docPayload.documents[0]);
      expect(newState.documents.rows.length).to.not
      .eql(initialState.documents.rows.lenght);
      done();
    });
  });
  describe('DELETING_DOCUMENT', () => {
    it('should set the state isDeleting to true',
    (done) => {
      const action = { type: types.DELETING_DOCUMENT };
      const newState = documentReducer(initialState, action);
      expect(newState.isDeleting).to.not.eql(initialState.isDeleting);
      done();
    });
  });
  describe('ADD_DOCUMENT_ERROR', () => {
    it('should return an error if the document was not successfully added',
    (done) => {
      const error = 'Please complete all fields to add a document';
      const action = { type: types.ADD_DOCUMENT_ERROR, error };
      const newState = documentReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState.error).to.not.eql(null);
      done();
    });
  });
});
