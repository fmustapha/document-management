const InitialState = {
  isAuthenticated: false,
  loggedInUser: null,
  users: {
    rows: [],
    totalUsers: 0,
    pagination: {}
  },
  isListing: false,
  userDocuments: [],
  documents: {
    documents: [],
    isCreated: false,
    isCreating: false,
    isDeleting: false,
    status: false
  },
  currentDocument: null
};

export default InitialState;

