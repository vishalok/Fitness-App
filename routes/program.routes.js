
const {
  createFitnessProgram,
  getFitnessPrograms,
  getFitnessProgramById,
  updateFitnessProgramById,
  deleteFitnessProgramById
} = require('../controllers/program.controller');

// FitnessProgram endpoints
module.exports = (app) =>{
app.post('/fitness-programs', createFitnessProgram);
app.get('/fitness-programs', getFitnessPrograms);
app.get('/fitness-programs/:id', getFitnessProgramById);
app.put('/fitness-programs/:id', updateFitnessProgramById);
app.delete('/fitness-programs/:id', deleteFitnessProgramById);
}

