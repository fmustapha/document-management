import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { SignUpPage } from '../../components/signup/SignUpPage';

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

  return shallow(<SignUpPage {...props} />, { context: { router: { push: () => {} } } });
}

describe('SignUpForm', () => {
  it('renders form and h3', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h3').text()).toEqual('Sign Up');
  });
  it('renders text inputs for form fields', () => {
    const wrapper = setup();
    expect(wrapper.find('input').length).toEqual(6);
    expect(wrapper.find('input[name="username"]').prop('name')).toBe('username');
    expect(wrapper.find('input[name="firstname"]').prop('name')).toBe('firstname');
    expect(wrapper.find('input[name="lastname"]').prop('name')).toBe('lastname');
    expect(wrapper.find('input[name="email"]').prop('name')).toBe('email');
    expect(wrapper.find('input[name="password"]').prop('name')).toBe('password');
    // expect(wrapper.find('input[name="confirmPassword"]').second().prop('name')).toBe('confirmPassword');
  });
  it('renders the SignUp button', () => {
    const wrapper = setup();
    expect(wrapper.find('input').last().prop('value')).toBe('Sign up');
  });
});

