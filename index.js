const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const {FitnessProgram} = require('./models/program.model');
const {Exercise} = require('./models/exercise.model');
const { PORT } = require('./configs/server.config');
const { DB_URL, DB_PROD_URL } = require('./configs/db.config');

let connectionString = DB_PROD_URL;

if(process.env.NODE_ENV !== 'production'){
    connectionString = DB_URL;
}
//Using the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//IIFE
(async ()=> {
    try{    
        await mongoose.connect(connectionString);
        console.log('db connected');
        await init();
    }
    catch(err){
        console.error('error getting while connecting mongoDB', err);
    }

})();
// Inserting default enteries in DB
async function init(){
    try{
      await Exercise.collection.drop();
     const exercise1 = await Exercise.create({
        name: 'Bicep Curls',
        length: 30 
    }); 
    
    const exercise2 = await Exercise.create({
      name: 'Squats',
      length: 60
  });

  const exercise3 = await Exercise.create({
    name: 'Pull ups',
    length: 90
});
    
    console.log('Exercise added in db successfully!!!');

    await FitnessProgram.collection.drop();
    await FitnessProgram.create({
      name: 'Beginner Program',
      exercises: exercise1._id
    });

    await FitnessProgram.create({
      name: 'Intermediate Program',
      exercises: exercise2._id
    });

    await FitnessProgram.create({
      name: 'Advanced Program',
      exercises: exercise3._id
    });

    console.log('FitnessProgram added in db successfully!!!');
}
catch(err){
    console.log('error while inserting default entries in DB', err);
}
}


// call the routes
require('./routes/program.routes')(app);
require('./routes/exercise.routes')(app);

app.listen(PORT, ()=> {
    console.log(`server is running on port: ${PORT}, please access it on http://localhost:${PORT}`)
})