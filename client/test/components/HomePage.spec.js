import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../../components/home/HomePage';

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

  return shallow(<HomePage {...props} />);
}

describe('HomePage', () => {
  it('renders h1 and h3', () => {
    const wrapper = setup();
    expect(wrapper.find('h1').text()).toEqual('ODAHI DMS');
    expect(wrapper.find('h3').text())
    .toEqual('Create and edit your documents in a click...');
  });
});

