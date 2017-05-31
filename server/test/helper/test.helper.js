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
  allRoles: [
    {
      id: 1,
      title: 'admin',
      description: 'Super user who can access all documents and assign roles'
    },
    {
      id: 2,
      title: 'regular',
      description: 'Ordinary user who can access only docs they created'
    }
  ],
  guestRole1: {
    id: 3,
    title: 'guest',
    description: 'Guest who can do what regular users do'
  },
  guestRole2: {
    id: 4,
    title: 'guest111',
    description: 'Guest who can do what regular users do'
  },
  guestRole3: {
    id: 5,
    title: 'guest2',
    description: 'Guest who can do what regular users do'
  },
  sampleRole: {
    id: 6,
    title: 'guestSample',
    description: 'Guest who can do what regular users do'
  },
  adminUser: {
    username: 'Ade',
    firstname: 'Ade',
    lastname: 'Bisola',
    email: 'ade@gmail.com',
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
    username: 'Estelle48',
    firstname: 'Paris',
    lastname: 'Bode',
    email: 'Jovani27@yahoo.com',
    password: '94vJWpS_l9V1LPV'
  },
  regularUser2: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  newUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    roleId: 2,
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
  badUser: {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: ''
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
