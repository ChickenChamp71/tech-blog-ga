const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const commentSeedData = require('./commentSeedData.json');
const postSeedData = require('./postSeedData.json');
const userSeedData = require('./userSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeedData);
    const posts = await Post.bulkCreate(postSeedData);
    const comments = await Comment.bulkCreate(commentSeedData);

    process.exit(0);
};

seedDatabase();