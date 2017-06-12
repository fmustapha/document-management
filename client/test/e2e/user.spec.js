
import faker from 'faker';
import config from './config';

const username = faker.internet.userName();
const password = faker.internet.password();
const firstname = faker.name.firstName();
// const newAbout = faker.lorem.sentence();

export default {
  'Register a user': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('a.brand-logo')
      .click('li a[href="/dms/signup"]')
      .waitForElementVisible('input[name=username]')
      .setValue('input[name=username]', username)
      .setValue('input[name=firstname]', firstname)
      .setValue('input[name=lastname]', faker.name.lastName())
      .setValue('input[name=email]', faker.internet.email())
      .setValue('input[name=password]', password)
      .setValue('input[name=confirmPassword]', password)
      .click('input.waves-effect')
      .waitForElementVisible('div.header div.col.s6 p')
      .assert.containsText('div.header div.col.s6 p', `Welcome, ${firstname}`)
      .end(),
};
