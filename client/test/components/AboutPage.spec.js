import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import AboutPage from '../../components/about/AboutPage';

/**
 *
 *
 * @returns {void}
 */
function setup() {
  const props = {
    users: {
      id: '',
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      role: '',
      createdAt: '',
      updatedAt: '',
    },
    onSubmit: () => {},
    onChange: () => {},
  };

  return shallow(<AboutPage {...props} />);
}

describe('AboutPage', () => {
  it('renders h1 and h5', () => {
    const wrapper = setup();
    expect(wrapper.find('h5').length).toBe(4);
    expect(wrapper.find('h1').text()).toEqual('About');
    expect(wrapper.find('p').text())
    .toEqual('This application enables you create and edit documents online');
  });
});

