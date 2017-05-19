import types from '../actions/actionTypes';

const initialState = {
  documents: [],
  isCreating: false,
  currentDocument: null,
  userDocuments: []
};

export default function documentReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_DOCUMENT: {
      return Object.assign({}, state, {
        documents: [...state.documents, action.document],
        isCreating: false
      });
    }
    case types.ADDING_DOCUMENT:
      return Object.assign({}, state, { isCreating: true });

    case types.VIEW_DOCUMENT:
      return Object.assign({}, state, { currentDocument: action.document });

    case types.LIST_DOCUMENT:
      console.log(Object.assign({}, state, { documents: action.documents }));
      return Object.assign({}, state, { documents: action.documents });

    case types.LIST_USER_DOCUMENT:
      console.log(Object.assign({}, state, { userDocuments: action.documents }));
      return Object.assign({}, state, { userDocuments: action.documents });
    default:
      return { ...state };
  }
}
