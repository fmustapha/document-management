const InitialState = {
  isAuthenticated: false,
  loggedInUser: null,
  users: {
    userProfile: {}
  },
  isListing: false,
  userDocuments: [],
  documents: {
    documents: [],
    isCreated: false,
    isCreating: false,
    isDeleting: false,
  },
  search: { user: null, document: null },
  currentDocument: null
};

export default InitialState;

