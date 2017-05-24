import types from './actionTypes';

/**
 *
 *
 * @export
 * @param {any} message
 * @returns {any} message
 */
export function addFlashMessage(message) {
  return {
    type: types.ADD_FLASH_MESSAGE,
    message
  };
}

/**
 *
 *
 * @export
 * @param {any} id
 * @returns {any} id
 */
export function deleteFlashMessage(id) {
  return {
    type: types.DELETE_FLASH_MESSAGE,
    id
  };
}
