const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Post = require('../models/Post');

/**
 * GET /post
 * Single post page.
 */
exports.getPost = (req, res) => {
  res.render('post/profile', {
    title: 'View Post',
    post: post
  });
};

/**
 * GET /posts
 * All posts.
 */
exports.getPosts = (req, res) => {
    Post.find((err, docs) => {
      res.render('posts/all', { posts: docs });
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
    req.checkBody('text', 'Content is required').notEmpty(); 
    req.sanitize('text').escape();
    req.sanitize('text').trim();
    

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/posts');
  }
  else{
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
        res.redirect('posts/')
      });
    });
  }

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
 
  Post.findByIdAndUpdate(req.post.id, (err, post) => {
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
 * POST /posts/
 * Delete post.
 */
exports.postDelete = (req, res, next) => {
  Post.findByIdAndRemove({ _id: req.post.id }, (err) => {
    if (err) { return next(err); }
    req.logout();
    res.redirect('/posts');
  });
};