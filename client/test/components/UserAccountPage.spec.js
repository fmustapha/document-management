import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { UserAccountPage } from '../../components/user/UserAccountPage';

/**
 *
 *
 * @returns {void}
 */
function setup() {
  const props = {
    user:
    {
      username: 'Teni',
      firstname: 'Teni',
      lastname: 'Kuti',
      email: 'kuti@gmail.com',
      password: ''
    }
  };

  return shallow(<UserAccountPage {...props} />);
}

describe('UserAccountPage', () => {
  it('renders form and h3', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h3').text()).toEqual('My Account');
  });
  it('renders text inputs for form fields', () => {
    const wrapper = setup();
    expect(wrapper.find('input').length).toEqual(7);
    expect(wrapper.find('input[name="username"]').prop('name')).toBe('username');
    expect(wrapper.find('input[name="firstname"]').prop('name')).toBe('firstname');
    expect(wrapper.find('input[name="lastname"]').prop('name')).toBe('lastname');
    expect(wrapper.find('input[name="email"]').prop('name')).toBe('email');
    expect(wrapper.find('input[name="password"]').prop('name')).toBe('password');
  });
  it('renders the Back button', () => {
    const wrapper = setup();
    expect(wrapper.find('input').last().prop('value')).toBe('Back');
  });
});
