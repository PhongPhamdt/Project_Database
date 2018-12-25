const express = require('express');
const ApiRouter = express.Router();
const UserRouter = require('./UserRouter');
const AuthRouter = require('./AuthRouter');
const ImageRouter = require('./ImageRouter');
const CommentRouter = require('./CommentRouter');
// const LikeRouter = require('./LikeRouter');

ApiRouter.use('/auth', AuthRouter);
ApiRouter.use('/user', UserRouter);
ApiRouter.use('/image', ImageRouter);
ApiRouter.use('/comment', CommentRouter);
// ApiRouter.use('/like', LikeRouter);

module.exports = ApiRouter;