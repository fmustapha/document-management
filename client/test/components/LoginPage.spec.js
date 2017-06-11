import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/login/LoginPage';

/**
 *
 *
 * @returns {void}
 */
function setup() {
  const props = {
    userDetails: { email: '', errors: {}, password: '' },
    onSubmit: () => {},
    onChange: () => {},
  };

  return shallow(<LoginPage {...props} />);
}

describe('LoginPage', () => {
  it('renders form and h3', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h3').text()).toEqual('Log In');
  });
  it('renders text inputs for both email and password', () => {
    const wrapper = setup();
    expect(wrapper.find('input').length).toEqual(3);
    expect(wrapper.find('input[name="email"]').prop('name')).toBe('email');
    expect(wrapper.find('input[name="password"]').prop('name')).toBe('password');
  });
  it('renders the login button', () => {
    const wrapper = setup();
    expect(wrapper.find('input').last().prop('value')).toBe('Log in');
  });
});

