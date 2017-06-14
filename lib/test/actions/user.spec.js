'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

describe('Our first test', function () {
  it('should pass', function () {
    expect(true).toBeTruthy();
  });
});