export function createDocument(document) {
  return { type: 'ADD_DOCUMENT', document };
}

export function listDocument(documentList) {
  return { type: 'LIST_DOCUMENT', documentList };
}

export function viewDocument(viewDocument) {
  return { type: 'VIEW_DOCUMENT', viewDocument };
}

export function updateDocument(documentUpdate) {
  return { type: 'UPDATE_DOCUMENT', documentUpdate };
}

export function deleteDocument(deleteDocument) {
  return { type: 'DELETE_DOCUMENT', deleteDocument };
}
