const express = require('express');
const debug = require('debug') ('app:sessionRouter');
const {MongoClient,ObjectId} = require('mongodb');
const speakerService = require('../services/speakerService');
const sessions = require('../data/sessions.json');

const sessionRouter = express.Router();
debug('I reached here');
sessionRouter.use((req,res,next)=> {
    if(req.user) {
        next();
    }    else {
            res.render('signin');
        }
});
sessionRouter.route('/').get((req,res)=>{
    const url = 'mongodb+srv://admin:admin@cluster0.ubeus3e.mongodb.net/'
    debug('I reached here');
const dbName = 'globomantics';

(async function mongo(){
   let client;
   try{
     client = await MongoClient.connect(url);
     debug('connected to the mongo DB');

     const db = client.db(dbName);

    
     const sessions = await db
     .collection('sessions')
     .findOne({_id: new ObjectId(id) });
     
     const speaker = await speakerService.getSpeakerById(session.speakers[0].id);

     session.speaker = speaker.data;
     res.render ('sessions', {
        session});
   } catch (error){
       debug(error.stack);
   }
}());
    res.render('sessions',{
        sessions,
    });
});

sessionRouter.route('/;id').get((req,res )=>{
    const id = req.params.id;
  
});


module.exports = sessionRouter;