import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { AddDocumentsPage } from '../../components/document/AddDocumentsPage';

/**
 *
 *
 * @returns {void}
 */
function setup() {
  const props = {
    document: { title: '', access: '', content: '', ownerId: 5 },
    onTitleChange: () => {},
    handleEditorChange: () => {},
    onClickSave: () => {},
    onClickBack: () => {},
    onAccessChange: () => {}
  };

  return shallow(<AddDocumentsPage {...props} />);
}

describe('AddDocumentsPage', () => {
  it('renders h3', () => {
    const wrapper = setup();
    expect(wrapper.find('h3').text()).toEqual('Add Document');
  });
  it('renders title', () => {
    const wrapper = setup();
    expect(wrapper.find('input[name="title"]').prop('name')).toBe('title');
  });

  it('renders TinyMCE', () => {
    const wrapper = setup();
    expect(wrapper.find('TinyMCE').length).toEqual(1);
  });

  it('renders the back button', () => {
    const wrapper = setup();
    expect(wrapper.find('input').last().prop('value')).toBe('Back');
  });
});

