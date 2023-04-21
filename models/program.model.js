const mongoose = require('mongoose');
const Exercise = require('./exercise.model');
const fitnessProgramSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: {
    type: [mongoose.SchemaTypes.ObjectId],
        ref: "Exercise"
  }
});


const FitnessProgram = mongoose.model('FitnessProgram', fitnessProgramSchema);

module.exports = { 
    FitnessProgram 
};
