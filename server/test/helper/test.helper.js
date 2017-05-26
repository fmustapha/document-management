import faker from 'faker';

const helper = {
  adminRole: {
    id: 1,
    title: 'admin',
    description: 'Super user who can access all documents and assign roles'
  },
  regularRole: {
    id: 2,
    title: 'regular',
    description: 'Ordinary user who can access only docs they created'
  },
  guestRole1: {
    id: 3,
    title: 'guest',
    description: 'guest'
  },
  guestRole2: {
    id: 4,
    title: 'guest111',
    description: 'guest'
  },
  guestRole3: {
    id: 5,
    title: 'guest2',
    description: 'guest'
  },
  sampleRole: {
    id: 6,
    title: 'guestSample',
    description: 'guest'
  },
  adminUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  adminUser1: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  regularUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  regularUser2: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  firstUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  secondUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  thirdUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  usersArray() {
    const users = [];
    for (let i = 0; i <= 10; i += 1) {
      users.push({
        username: faker.internet.userName(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      });
    }
    return users;
  },
  invalidEmailUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: 'kkkkk',
    password: faker.internet.password()
  },
  invalidPasswordUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'ola'
  },
  publicDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public'
  },
  privateDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'private'
  },
  roleDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'role'
  },
  testDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
  }
};
export default helper;
