import faker from 'faker';
import config from './config';

const newTitle = faker.lorem.words(2);
const editedTitle = faker.lorem.words(2);

export default {
  'Create document': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('a.brand-logo')
      .click('li a[href="/dms/login"]')
      .setValue('input[name=email]', 'fyoiza@gmail.com')
      .setValue('input[name=password]', 'password')
      .click('input.waves-effect')
      .waitForElementVisible('div.header div.col.s6 p')
      .assert.containsText('div.header div.col.s6 p', 'Welcome,')

      .click('a.btn-floating i.material-icons')
      .waitForElementVisible('.mce-i-code')
      .setValue('Input[name=title]', newTitle)
      .click('select option[value="public"]')
      .click('.mce-i-code')
      .setValue('.mce-textbox', faker.lorem.paragraphs())
      .click('.mce-floatpanel .mce-container-body button')
      .waitForElementVisible('input[value=Save]')
      .click('input[value=Save]')

      .waitForElementVisible('.document-title')
      .assert.containsText('.document-title', newTitle)
      .end(),

  'Open document': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('a.brand-logo')
      .click('li a[href="/dms/login"]')
      .setValue('input[name=email]', 'fyoiza@gmail.com')
      .setValue('input[name=password]', 'password')
      .click('input.waves-effect')
      .waitForElementVisible('div.header div.col.s6 p')
      .assert.containsText('div.header div.col.s6 p', 'Welcome,')
      .click('li a[href="/dms/document"]')
      .waitForElementVisible('.document-title a')
      .click('.document-title a')
      .waitForElementVisible('.document-view')
      .assert.containsText('h2', newTitle)
      .end(),

  'Search for a document': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('a.brand-logo')
      .click('li a[href="/dms/login"]')
      .setValue('input[name=email]', 'fyoiza@gmail.com')
      .setValue('input[name=password]', 'password')
      .click('input.waves-effect')
      .waitForElementVisible('div.header div.col.s6 p')
      .assert.containsText('div.header div.col.s6 p', 'Welcome,')
      .waitForElementVisible('#search_type')
      .setValue('#search_type', 'guns')
      .keys(browser.Keys.ENTER)
      .waitForElementVisible('.toast')
      .assert.containsText('.document-title', 'Guns')
      .end(),

  'Edit document': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('a.brand-logo')
      .click('li a[href="/dms/login"]')
      .setValue('input[name=email]', 'fyoiza@gmail.com')
      .setValue('input[name=password]', 'password')
      .click('input.waves-effect')
      .waitForElementVisible('div.header div.col.s6 p')
      .assert.containsText('div.header div.col.s6 p', 'Welcome,')
      .click('li a[href="/dms/document"]')
      .waitForElementVisible('.document-title a')
      .click('.document-title a')
      .waitForElementVisible('.document-view')
      .click('input[value=Edit]')
      .waitForElementVisible('.mce-i-code')
      .clearValue('Input[name=title]')
      .setValue('Input[name=title]', editedTitle)
      .click('input[value=Save]')
      .waitForElementVisible('.toast')
      .assert.containsText('h2', editedTitle)
      .end();
  },

  'Delete document': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('a.brand-logo')
      .click('li a[href="/dms/login"]')
      .setValue('input[name=email]', 'fyoiza@gmail.com')
      .setValue('input[name=password]', 'password')
      .click('input.waves-effect')
      .waitForElementVisible('div.header div.col.s6 p')
      .assert.containsText('div.header div.col.s6 p', 'Welcome,')
      .click('li a[href="/dms/document"]')
      .waitForElementVisible('.document-title a')

      .click('a.my-documents')
      .waitForElementVisible('.fa.fa-trash')
      .click('.fa.fa-trash')
      .waitForElementVisible('div.sweet-alert button.confirm')
      .pause(500)
      .click('div.sweet-alert button.confirm')
      .waitForElementVisible('.toast');
    browser
      .expect.element('.document-title a').text.to.not.equal(editedTitle);
    browser.end();
  }
};
