
const {
  createExercise,
  deleteExerciseById
} = require('../controllers/exercise.controller');

// Exercise endpoints

module.exports = (app) =>{
app.post('/exercises', createExercise);
app.delete('/exercises/:id', deleteExerciseById);
}
