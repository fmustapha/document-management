import { jsdom } from 'jsdom'; //eslint-disable-line
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock'; //eslint-disable-line
import faker from 'faker';
import * as chai from 'chai';
import spies from 'chai-spies'; //eslint-disable-line
import sinon from 'sinon';
import moxios from 'moxios'; //eslint-disable-line
import { mount, shallow, render } from 'enzyme'; //eslint-disable-line

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
global.localStorage = {
  setItem: () => null,
  removeItem: () => null
};
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

chai.use(spies);

global.window.localStorage = {
  getItem: () => 'abc'
};

global.sinon = sinon;
global.expect = chai.expect;
global.thunk = thunk;
global.configureMockStore = configureMockStore;
global.nock = nock;
global.mount = mount;
global.shallow = shallow;
global.render = render;
global.spy = spies;
global.faker = faker;
global.moxios = moxios;
global.navigator = {
  userAgent: 'node.js'
};
