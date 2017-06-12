
import faker from 'faker';
import config from './config';

const username = faker.internet.userName();
const password = faker.internet.password();
const firstname = faker.name.firstName();
const email = faker.internet.email();
// const newAbout = faker.lorem.sentence();

export default {
  'Sign Up a user': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('a.brand-logo')
      .click('li a[href="/dms/signup"]')
      .waitForElementVisible('input[name=username]')
      .setValue('input[name=username]', username)
      .setValue('input[name=firstname]', firstname)
      .setValue('input[name=lastname]', faker.name.lastName())
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .setValue('input[name=confirmPassword]', password)
      .click('input.waves-effect')
      .waitForElementVisible('div.header div.col.s6 p')
      .assert.containsText('div.header div.col.s6 p', `Welcome, ${firstname}`)
      .end(),

  'Login a user': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('a.brand-logo')
      .click('li a[href="/dms/login"]')
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('input.waves-effect')
      .waitForElementVisible('div.header div.col.s6 p')
      .assert.containsText('div.header div.col.s6 p', 'Welcome,')
      .end(),

  "Admin can change a user's role'": browser =>
    browser
      .url(config.url)
      .waitForElementVisible('a.brand-logo')
      .click('li a[href="/dms/login"]')
      .setValue('input[name=email]', 'admin@gmail.com')
      .setValue('input[name=password]', 'password')
      .click('input.waves-effect')
      .waitForElementVisible('div.header div.col.s6 p')
      .assert.containsText('div.header div.col.s6 p', 'Welcome,')
      .click('li a[href="/dms/users"]')
      .waitForElementVisible('div.welcome-message h4')
      .assert.containsText('div.welcome-message h4', 'Welcome Admin')
      .waitForElementVisible('table#page-padding.striped.table tbody')
      .assert.containsText('tbody tr:last-child td:nth-child(5)', 'Regular')
      .waitForElementVisible('tbody tr:last-child td:nth-child(8) select')
      .click('tbody tr:last-child td:nth-child(8) select:last-child option[value="1"]')
      .waitForElementVisible('.toast')
      .assert.containsText('tbody tr:last-child td:nth-child(5)', 'Admin')
      .end(),
};
