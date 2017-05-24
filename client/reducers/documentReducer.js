import types from '../actions/actionTypes';

const initialState = {
  documents: [],
  isCreating: false,
  currentDocument: null,
  userDocuments: []
};


/**
 *
 *
 * @export
 * @param {Object} state
 * @param {Object} action
 * @returns {Object} containing the new state for the store
 */
export default function documentReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_DOCUMENT:
      return Object.assign({}, state, {
        documents: [...state.documents, action.document],
        isCreating: false
      });

    // case types.DELETE_DOCUMENT:
    //   console.log(action);
    //   // return Object.assign({}, state, {
    //   //   documents: [...state.documents, action.document],
    //   //   isCreating: false
    //   // });

    case types.ADDING_DOCUMENT:
      return Object.assign({}, state, { isCreating: true });

    case types.VIEW_DOCUMENT:
      return Object.assign({}, state, { currentDocument: action.document });

    case types.LIST_DOCUMENT:
      return Object.assign({}, state, { documents: action.documents });

    case types.LIST_USER_DOCUMENT:
      return Object.assign({}, state, { userDocuments:
         action.documents });

    case types.UPDATE_DOCUMENT:
      return Object.assign({}, state, { currentDocument:
        action.updatedDocument });

    default:
      return { ...state };
  }
}
