const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');
const User = require('./models/User');
const Cocktail = require('./models/Cocktail');

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [User1, Admin] = await User.create(
    {
      email: 'user@user',
      password: '123',
      displayName: 'John Doe',
      avatar: 'avatars/user1.png',
      role: 'user',
      token: nanoid(),
    },
    {
      email: 'admin@admin',
      password: '123',
      displayName: 'Admin',
      avatar: 'avatars/user2.jpg',
      role: 'admin',
      token: nanoid(),
    },
  );

  await Cocktail.create(
    {
      user: User1,
      title: 'Cocktail1',
      image: 'fixtures/cocktail1.jpg',
      recipe: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolor dolorum error nemo quos ratione recusandae reprehenderit tenetur. Molestias, temporibus?',
      is_published: false,
      ingredients: [{ingTitle: 'Ing1', ingAmount: 'Amount1'}, {ingTitle: 'Ing2', ingAmount: 'Amount2'}],
    },{
      user: Admin,
      title: 'Cocktail2',
      image: 'fixtures/cocktail2.jpeg',
      recipe: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolor dolorum error nemo quos ratione recusandae reprehenderit tenetur. Molestias, temporibus?onsectetur adipisicing elit. Consectetur dolor dolorum error nemo quos ratione recusandae reprehenderit tenetur. Molestias, temporibus?',
      is_published: true,
      ingredients: [{ingTitle: 'Ing1', ingAmount: 'Amount1'}, {ingTitle: 'Ing2', ingAmount: 'Amount2'}, {ingTitle: 'Ing3', ingAmount: 'Amount3'}],
    },{
      user: Admin,
      title: 'Cocktail3',
      image: 'fixtures/cocktail3.webp',
      recipe: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolor dolorum.',
      is_published: true,
      ingredients: [{ingTitle: 'Ing1', ingAmount: 'Amount1'}, {ingTitle: 'Ing2', ingAmount: 'Amount2'}],
    },
  )

  await mongoose.connection.close();
};

run().catch(e => console.error(e));