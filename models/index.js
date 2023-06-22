const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

Comment.belongsTo(Post);
Comment.belongsTo(User);

Post.belongsTo(User);
Post.hasMany(Comment);

User.hasMany(Post);
User.hasMany(Comment);

module.exports = { Post, User, Comment };