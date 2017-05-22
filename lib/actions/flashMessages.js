'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFlashMessage = addFlashMessage;
exports.deleteFlashMessage = deleteFlashMessage;

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 *
 * @export
 * @param {any} message
 * @returns {any} message
 */
function addFlashMessage(message) {
  return {
    type: _actionTypes2.default.ADD_FLASH_MESSAGE,
    message: message
  };
}

/**
 *
 *
 * @export
 * @param {any} id
 * @returns {any} id
 */
function deleteFlashMessage(id) {
  return {
    type: _actionTypes2.default.DELETE_FLASH_MESSAGE,
    id: id
  };
}