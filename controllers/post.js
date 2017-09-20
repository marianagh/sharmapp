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
    res.render('posts/all', {
      title: 'My Posts',
      posts: Post.find()
    });
  };

/**
 * GET /create
 * Create post page.
 */
exports.getCreate = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('posts/create', {
    title: 'Create posts'
  });
};

/**
 * POST /posts
 * Create a new post.
 */
exports.postCreate = (req, res, next) => {

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/posts');
  }
  const post = new Post({
    text: req.body.text,
    user: req.body.user,
    postOn: req.body.date, 
    postTo: {
      facebook: req.body.facebook, 
      twitter: req.body.twitter, 
      instagram: req.body.instagram,
      google: req.body.google
    }
  });
  
  post.save((err)=> {
    if (err) {return next(err); }
    req.post(post, (err)=> {
      if (err) {
        return next(err);
      }
      res.redirect('/posts')
    });
  });
};

/**
 * GET /posts
 * Post page.
 */
exports.getPost = (req, res) => {
  res.render('post/profile', {
    title: 'View Post'
  });
};


/**
 * GET /posts
 * Get post by id.
 */
exports.postUpdate = (req, res, next) => {
  
   Post.findById(req.post.id, (err, post) => {
     if (err) { return next(err); }
     post.text = req.body.text || '';
     post.postOn = req.body.date;
     post.postTo.facebook = req.body.facebook;
     post.postTo.twitter = req.body.twitter; 
     post.postTo.instagram = req.body.instagram;
     post.postTo.google= req.body.google;
     post.save(err => {
       if (err){
         return res.redirect('/posts');
         return next(err);
       }
       req.flash('success', { msg: 'Post has been updated.' });
       res.redirect('/posts');
     });
   });
 };

/**
 * GET /posts/edit
 * Edit post page change when u create the view.
 */
exports.getPost = (req, res) => {
  res.send('NOT IMPLEMENTED: Edit post.');
};


/**
 * POST /posts
 * Update post information.
 */
exports.postUpdate = (req, res, next) => {
 
  Post.findById(req.post.id, (err, post) => {
    if (err) { return next(err); }
    post.text = req.body.text || '';
    post.postOn = req.body.date;
    post.postTo.facebook = req.body.facebook;
    post.postTo.twitter = req.body.twitter; 
    post.postTo.instagram = req.body.instagram;
    post.postTo.google= req.body.google;
    post.save(err => {
      if (err){
        return res.redirect('/posts');
        return next(err);
      }
      req.flash('success', { msg: 'Post has been updated.' });
      res.redirect('/posts');
    });
  });
};
