const express = require('express');
const debug = require('debug') ('app:sessionRouter');
const {MongoClient,ObjectId} = require('mongodb');
const passport = require('passport');
const authoRouter = express.Router();

authoRouter.route('/signUp').post((req,res)=>{
  const {username,password} = req.body;
  const url = 'mongodb+srv://admin:admin@cluster0.ubeus3e.mongodb.net/';

  const dbName = 'globomantics';

  (async function addUser(){
    let client;
    try {
        client = await MongoClient.connect(url);

        const db = client.db(dbName);
        const user = {username,password};
        const results = await db.collection('users').insertOne(user);
        debug(results);
        req.login(results.ops[0], () =>{
            res.redirect('/auth/profile');
           });
    } catch (error) {
        debug(error);
    }
    client.close();
  }());
 });

authoRouter
.route('/signin')
.get((req,res)=>{
    res.render('signin');
})
.post(passport.authenticate('local', {
    successRedirect: '/auth/profile',
    failureMessage: '/',

}));
authoRouter.route('/profile').get((req,res)=>{
    res.json(req.user);
});

module.exports = authoRouter;
