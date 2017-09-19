const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Post = require('../models/Post');

/**
 * GET /posts
 * All posts.
 */
exports.getPosts = (req, res) => {
    if (req.post) {
      return res.redirect('/');
    }
    Post.find();
    res.render('posts/all', {
      title: 'My Posts'
    });
  };