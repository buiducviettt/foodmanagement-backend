const prisma = require('./lib/prisma');
async function main() {
  await prisma.product.deleteMany(); // reset bảng (tuỳ chọn)

  const products = [
    {
      title: 'Noodles',
      image: 'https://i.postimg.cc/sDcM8qX7/img1.png',
      description: 'This is a Korean Chinese dish...',
      rating: 29,
      price: 122,
      stock: 52,
      cate: 'hot-dishes',
      comments: 'comments 1',
    },
    {
      title: 'Salted Pasta with mushroom sauce',
      image: 'https://i.postimg.cc/9QQDjbRS/img2.png',
      description: 'I insist on using a generous volume of mushrooms...',
      rating: 66,
      price: 89,
      stock: 100,
      cate: 'cold-dishes',
      comments: 'comments 2',
    },
    {
      title: 'Beef dumpling in hot and sour soup',
      image: 'https://i.postimg.cc/2S9VjWn5/img3.png',
      description:
        'Chinese dumplings (Jiaozi, 饺子) can be cooked in several ways: water-boiled, pan-fried, steamed or deep-fried. Although they are all tasty in their own ways, my personal favourite has to be the boiled ones. To make it even better for cold winter days, I love serving them in a tasty soup.',
      rating: 84,
      stock: 0,
      cate: 'soup',
      price: 23,
      comments: 'comments 3',
    },
    {
      title: 'Healthy noodle with spinach leaf',
      image: 'https://i.postimg.cc/c1cYyrkv/Image-5.png',
      description:
        'A wonderful side dish to ramp up plain buttered egg noodles. We love it with Salisbury steak, chicken, or pork.',
      rating: 3,
      price: 17,
      cate: 'grill',
      stock: 83,
      comments: 'comments 4',
    },
    {
      title: 'Spicy instant noodle with special omelette',
      image: 'https://i.postimg.cc/jddfstBZ/Images.png',
      description:
        'A wonderful side dish to ramp up plain buttered egg noodles. We love it with Salisbury steak, chicken, or pork.',
      rating: 74,
      stock: 44,
      cate: 'grill',
      price: 75,
      comments: 'comments 5',
    },
  ];

  await prisma.product.createMany({ data: products });
  console.log('✅ Imported seed products successfully!');
  const users = [
    {
      createdAt: '2025-04-24T04:49:42.971Z',
      name: 'name 1',
      avatar: 'https://avatars.githubusercontent.com/u/8194124',
      username: 'username 1',
      email: 'demo1@gmail.com',
      password: 'password 1',
      passwordHash: 'password 1',
    },
    {
      createdAt: '2025-04-23T19:34:40.961Z',
      name: 'name 2',
      email: 'demo2@gmail.com',
      avatar:
        'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/78.jpg',
      username: 'username 2',
      password: 'password 2',
      passwordHash: 'password 1',
    },
    {
      createdAt: '2025-04-24T06:33:13.409Z',
      name: 'name 3',
      email: 'demo3@gmail.com',
      avatar:
        'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/58.jpg',
      username: 'username 3',
      password: 'password 3',
      passwordHash: 'password 1',
    },
  ];
  await prisma.user.createMany({ data: users });
  console.log('✅ Imported seed users successfully!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
