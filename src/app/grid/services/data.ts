import * as faker from 'faker';

export let randomData = [];

for (let i = 1; i <= 1000; i++) {
  randomData.push({
    Id: i,
    Name: faker.name.findName(),
    Number: faker.random.number()
  });
}
