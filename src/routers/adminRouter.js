const express = require('express');
const debug = require('debug') ('app:adminRouter');
const {MongoClient} = require('mongodb');
const sessions = require('../data/sessions.json');

const adminRouter = express.Router();

adminRouter.route('/').get((req,res)=>{
const url = 'mongodb+srv://admin:admin@cluster0.ubeus3e.mongodb.net/'

 const dbName = 'globomantics';

 (async function mongo(){
    let client;
    try{
      client = await MongoClient.connect(url);
      debug('connected to the mongo DB');

      const db = client.db(dbName);

     
      const response = await db.collection('sessions').insertMany(sessions);
      res.json (response);
    } catch (error){
        debug(error.stack);
    }
 }());
});

module.exports = adminRouter;
