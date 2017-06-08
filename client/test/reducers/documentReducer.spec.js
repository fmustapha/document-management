// import documentReducer from '../../src/reducers/documents.reducer';

// describe('documents reducer', () => {
//   let initialState;
//   let docPayload;
//   beforeEach((done) => {
//     initialState = {
//       fetching: false,
//       fetched: false,
//       error: null,
//       documents: null,
//       allDocuments: null,
//       confirmDelete: null,
//       doc: null,
//       editDoc: false
//     };
//     docPayload = {
//       paginationMeta: {
//         page_count: 3,
//         total_count: 3,
//         page_size: 1,
//         page: 1
//       },
//       results: [
//         {
//           id: 40,
//           title: 'demo',
//           content: 'demo test',
//           accessId: 1,
//           ownerId: 1,
//           createdAt: '2017-05-07T20:54:02.244Z',
//           updatedAt: '2017-05-07T20:54:02.244Z',
//           folderId: null,
//           User: {
//             id: 1,
//             username: 'fyodor',
//             roleId: 1
//           }
//         }
//       ]
//     };
//     done();
//   });
//   describe('CREATED_DOC', () => {
//     it('should add a created document to documents state in the store',
//     (done) => {
//       initialState.documents = docPayload;
//       const payload = {
//         id: 32,
//         title: 'A',
//         content: 'nkscnkncsn'
//       };
//       const action = { type: 'CREATED_DOC', payload };
//       const newState = documentReducer(initialState, action);
//       expect(newState).to.not.eql(initialState);
//       expect(newState.documents.results[1].title).to.eql('A');
//       expect(newState.documents.results[1].id).to.eql(32);
//       expect(newState.error).to.eql(initialState.error);
//       expect(newState.allDocuments).to.eql(initialState.allDocuments);
//       expect(newState.confirmDelete).to.eql(initialState.confirmDelete);
//       expect(newState.doc).to.eql(initialState.doc);
//       expect(newState.editDoc).to.eql(initialState.editDoc);
//       done();
//     });
//   });
//   describe('FETCHED_CURRENT_USER_DOCS', () => {
//     it('should update the documents state with all the user\'s documents',
//     (done) => {
//       const action = { type: 'FETCHED_CURRENT_USER_DOCS', payload: docPayload };
//       const newState = documentReducer(initialState, action);
//       expect(newState).to.not.eql(initialState);
//       expect(newState.documents).to.not.eql(null);
//       expect(Object.keys(newState.documents.paginationMeta)).to.have.lengthOf(4);
//       expect(newState.documents.paginationMeta.page_count).to.eql(3);
//       expect(newState.documents.results).to.be.an('array');
//       expect(newState.documents.results[0].id).to.eql(40);
//       expect(newState.error).to.eql(initialState.error);
//       expect(newState.allDocuments).to.eql(initialState.allDocuments);
//       expect(newState.confirmDelete).to.eql(initialState.confirmDelete);
//       expect(newState.doc).to.eql(initialState.doc);
//       expect(newState.editDoc).to.eql(initialState.editDoc);
//       expect(initialState.documents).to.eql(null);
//       done();
//     });
//   });
//   describe('EDIT_DOCUMENT', () => {
//     it('should set the editDoc state to true in the store', (done) => {
//       const payload = { id: 21, title: 'a doc', content: 'contains words' };
//       const action = { type: 'EDIT_DOCUMENT', payload };
//       const newState = documentReducer(initialState, action);
//       expect(newState).to.not.eql(initialState);
//       expect(newState.editDoc).to.eql(payload);
//       expect(newState.error).to.eql(initialState.error);
//       expect(newState.allDocuments).to.eql(initialState.allDocuments);
//       expect(newState.confirmDelete).to.eql(initialState.confirmDelete);
//       expect(newState.doc).to.eql(initialState.doc);
//       expect(newState.documents).to.eql(initialState.documents);
//       done();
//     });
//   });
//   describe('CLEAR_EDIT_DOCUMENT', () => {
//     it('should clear the edit state of the store', (done) => {
//       const payload = undefined;
//       const action = { type: 'CLEAR_EDIT_DOCUMENT', payload };
//       const newState = documentReducer(initialState, action);
//       expect(newState.editDoc).to.eql(false);
//       expect(newState.error).to.eql(initialState.error);
//       expect(newState.allDocuments).to.eql(initialState.allDocuments);
//       expect(newState.confirmDelete).to.eql(initialState.confirmDelete);
//       expect(newState.doc).to.eql(initialState.doc);
//       expect(newState.documents).to.eql(initialState.documents);
//       done();
//     });
//   });
//   describe('UPDATED_DOCUMENT', () => {
//     it('should change a particular document in the store when it is updated',
//     (done) => {
//       initialState.documents = docPayload;
//       const payload = {
//         id: 40,
//         title: 'update'
//       };
//       const action = { type: 'UPDATED_DOCUMENT', payload };
//       const newState = documentReducer(initialState, action);
//       expect(newState).to.not.eql(initialState);
//       expect(newState.documents.results[0].title).to.eql('update');
//       expect(newState.error).to.eql(initialState.error);
//       expect(newState.allDocuments).to.eql(initialState.allDocuments);
//       expect(newState.confirmDelete).to.eql(initialState.confirmDelete);
//       expect(newState.doc).to.eql(initialState.doc);
//       expect(newState.editDoc).to.eql(initialState.editDoc);
//       done();
//     });
//   });
//   describe('DELETED_DOCUMENT', () => {
//     it('should remove a deleted document from the user\'s document in the store',
//     (done) => {
//       initialState.documents = docPayload;
//       const payload = { id: 40, userDoc: true };
//       const action = { type: 'DELETED_DOCUMENT', payload };
//       const newState = documentReducer(initialState, action);
//       expect(newState).to.not.eql(initialState);
//       expect(newState.documents.results[0]).to.not.eql(docPayload);
//       expect(newState.error).to.eql(initialState.error);
//       expect(newState.allDocuments).to.eql(initialState.allDocuments);
//       expect(newState.confirmDelete).to.eql(initialState.confirmDelete);
//       expect(newState.doc).to.eql(initialState.doc);
//       expect(newState.editDoc).to.eql(initialState.editDoc);
//       done();
//     });
//     it('should remove a deleted document all documents in the store',
//     (done) => {
//       initialState.allDocuments = docPayload;
//       const payload = { id: 40 };
//       const action = { type: 'DELETED_DOCUMENT', payload };
//       const newState = documentReducer(initialState, action);
//       expect(newState).to.not.eql(initialState);
//       expect(newState.allDocuments.results[0]).to.not.eql(docPayload);
//       expect(newState.error).to.eql(initialState.error);
//       expect(newState.documents).to.eql(initialState.documents);
//       expect(newState.confirmDelete).to.eql(initialState.confirmDelete);
//       expect(newState.doc).to.eql(initialState.doc);
//       expect(newState.editDoc).to.eql(initialState.editDoc);
//       done();
//     });
//   });
//   describe('GOT_DOCUMENT', () => {
//     it('should set the state of doc to a single document',
//     (done) => {
//       const payload = {
//         id: 21,
//         title: 'single',
//         content: 'single doc'
//       };
//       const action = { type: 'GOT_DOCUMENT', payload };
//       const newState = documentReducer(initialState, action);
//       expect(newState).to.not.eql(initialState);
//       expect(newState.doc).to.be.an('object');
//       expect(newState.doc.id).to.eql(21);
//       expect(newState.doc.title).to.eql('single');
//       expect(newState.doc.content).to.eql('single doc');
//       expect(newState.error).to.eql(initialState.error);
//       expect(newState.allDocuments).to.eql(initialState.allDocuments);
//       expect(newState.confirmDelete).to.eql(initialState.confirmDelete);
//       expect(newState.documents).to.eql(initialState.documents);
//       expect(newState.editDoc).to.eql(initialState.editDoc);
//       done();
//     });
//   });
//   describe('GOT_ALL_DOCUMENTS', () => {
//     it('should add all documents to the state of allDocuments',
//     (done) => {
//       const action = { type: 'GOT_ALL_DOCUMENTS', payload: docPayload };
//       const newState = documentReducer(initialState, action);
//       expect(newState).to.not.eql(initialState);
//       expect(newState.allDocuments).to.not.eql(null);
//       expect(Object.keys(newState.allDocuments.paginationMeta)).to.have.lengthOf(4);
//       expect(newState.allDocuments.paginationMeta.page_count).to.eql(3);
//       expect(newState.allDocuments.results).to.be.an('array');
//       expect(newState.allDocuments.results[0].id).to.eql(40);
//       expect(newState.error).to.eql(initialState.error);
//       expect(newState.documents).to.eql(initialState.documents);
//       expect(newState.confirmDelete).to.eql(initialState.confirmDelete);
//       expect(newState.doc).to.eql(initialState.doc);
//       expect(newState.editDoc).to.eql(initialState.editDoc);
//       done();
//     });
//   });
//   describe('CONFIRM_DELETE_DOCUMENT', () => {
//     it('should set delete state of documents to an object with id and title',
//     (done) => {
//       const payload = {
//         id: 21,
//         title: 'single'
//       };
//       const action = { type: 'CONFIRM_DELETE_DOCUMENT', payload };
//       const newState = documentReducer(initialState, action);
//       expect(newState).to.not.eql(initialState);
//       expect(newState.confirmDelete).to.be.an('object');
//       expect(newState.confirmDelete.id).to.eql(21);
//       expect(newState.confirmDelete.title).to.eql('single');
//       expect(newState.error).to.eql(initialState.error);
//       expect(newState.allDocuments).to.eql(initialState.allDocuments);
//       expect(newState.doc).to.eql(initialState.doc);
//       expect(newState.documents).to.eql(initialState.documents);
//       expect(newState.editDoc).to.eql(initialState.editDoc);
//       done();
//     });
//   });
//   describe('CLEAR_CONFIRM_DELETE_DOCUMENT', () => {
//     it('should clear the delete document state of the store', (done) => {
//       const payload = undefined;
//       const action = { type: 'CLEAR_CONFIRM_DELETE_DOCUMENT', payload };
//       const newState = documentReducer(initialState, action);
//       expect(newState.confirmDelete).to.eql(null);
//       expect(newState.error).to.eql(initialState.error);
//       expect(newState.allDocuments).to.eql(initialState.allDocuments);
//       expect(newState.editDoc).to.eql(initialState.editDoc);
//       expect(newState.doc).to.eql(initialState.doc);
//       expect(newState.documents).to.eql(initialState.documents);
//       done();
//     });
//   });
// });
