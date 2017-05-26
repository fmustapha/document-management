const InitialState = {
  isAuthenticated: false,
  loggedInUser: null,
  users: {},
  isListing: false,
  userDocuments: [],
  documents: [],
  isCreating: false,
  search: { user: null, document: null },
  currentDocument: null
};

export default InitialState;
