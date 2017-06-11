import expect from 'expect';
import React from 'react';
// import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
// import sinon from 'sinon';
import { UserListPage } from '../../components/user/UserListPage';

// const onClick = sinon.spy();

/**
 *
 *
 * @returns {void}
 */
function setup() {
  const props = {
    actions: {
      listUsers: (() => {})
    },
    search: {
      user: ''
    },
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
    searching: true,
    id: 0,
    offset: 0,
    limit: 10
  };

  return shallow(<UserListPage {...props} />);
}

describe('User List Page', () => {
  it('renders table and h4 and select', () => {
    const wrapper = setup();
    expect(wrapper.find('table').length).toBe(1);
    expect(wrapper.find('thead').length).toBe(1);
    expect(wrapper.find('tbody').length).toBe(1);
    expect(wrapper.find('tr').length).toBe(1);
    expect(wrapper.find('h4').text()).toEqual('Welcome Admin');
  });

  it('renders the top container', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBeGreaterThan(1);
  });

  it('renders a table of users', () => {
    const wrapper = setup();
    expect(wrapper.find('table').length).toEqual(1);
  });

  it('renders the pagination wrapper', () => {
    const wrapper = setup();
    expect(wrapper.find('#pagination').length).toEqual(1);
  });
});

