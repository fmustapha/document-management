import types from '../actions/actionTypes';
import initialState from '../reducers/InitialState';


/**
 *
 *
 * @export
 * @param {Object} state
 * @param {Object} action
 * @returns {Object} containing the new state for the store
 */
export default function documentReducer(state = initialState.documents, action) {
  switch (action.type) {
    case types.ADD_DOCUMENT:
      console.log('former', state);
      return Object.assign({}, state, {
        documents: [...state.documents, action.document],
        isCreating: false,
        isCreated: true
      });

    case types.DELETE_DOCUMENT:
      return Object.assign({}, state, {
        documents: {
          ...state.documents,
          rows: [...state.documents.rows].filter((document) => {
            if (document.id !== action.id) {
              return document;
            }
          }),
        },
        userDocuments:
          [...state.userDocuments].filter((document) => {
            if (document.id !== action.id) {
              return document;
            }
          }),
        deleteComplete: true,
        isCreating: false
      });

    case types.DELETING_DOCUMENT:
      return Object.assign({}, state, { isDeleting: true });

    case types.ADDING_DOCUMENT:
      return Object.assign({}, state, { isCreating: true });

    case types.ADD_DOCUMENT_ERROR:
      return Object.assign({}, state,
        { isCreating: false,
          isCreated: false,
          error: action.error
        });

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
