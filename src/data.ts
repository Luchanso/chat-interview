import faker from "@faker-js/faker";

export const users = [
  {
    name: "Joyse",
    id: "Joyse",
    avatar: faker.image.avatar(),
  },
  {
    name: "Russell",
    id: "Russell",
    avatar: faker.image.avatar(),
  },
  {
    name: "Sam",
    id: "Sam",
    avatar: faker.image.avatar(),
  },
];

export const userMap = users.reduce<Record<string, typeof users[0] | undefined>>(
  (result, user) => {
    result[user.id] = user;
    return result;
  },
  {}
);

export const channels = [
  {
    name: "General",
    id: "1",
  },
  {
    name: "Technology",
    id: "2",
  },
  {
    name: "LGTM",
    id: "3",
  },
];
