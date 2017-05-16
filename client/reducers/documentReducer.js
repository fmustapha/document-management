export default function documentReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_DOCUMENT':
      // state.push(action.course);
      return [...state,
        Object.assign({}, action.document)
      ];
    default:
      return state;
  }
}
