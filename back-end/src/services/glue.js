const { BlogPost, User, Category, sequelize, PostCategory } = require('../database/models');

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return posts;
};

const getById = async (id) => {
  const postsById = await BlogPost.findOne({
     where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  if (!postsById) return { code: 404, message: 'Post does not exist' };
 return { code: 200, data: postsById };
};

const add = async ({ userId, title, content, categoryIds }) => {
  const exist = await Category.findOne({ where: { id: categoryIds } });
  if (!exist) return { code: 400, message: '"categoryIds" not found' };
  const result = await sequelize.transaction(async (t) => {
    const blogPost = await BlogPost.create({
      title, content, userId,
    }, { transaction: t });
    const categories = categoryIds.map((category) => ({
      postId: blogPost.dataValues.id, categoryId: category,
    }));
    await PostCategory.bulkCreate(categories, { transaction: t });
    return blogPost;
  });
  return { code: 201, data: result };
};

const edit = async (idPost, { title, content, id }) => {
  const userExist = await User.findByPk(id);
  console.log('>>>>>>>>>>>>', userExist);
  const postExist = await BlogPost.findByPk(idPost);
  console.log(postExist);
  if (userExist.dataValues.id !== postExist.dataValues.id) {
    return { code: 401, message: 'Unauthorized user' };
  }
  await BlogPost.update({ title, content }, { where: { id: idPost } });
  const { data: { dataValues } } = await getById(idPost);
  return { code: 200, data: dataValues };
};

module.exports = {
  getAll,
  add,
  getById,
  edit,
};