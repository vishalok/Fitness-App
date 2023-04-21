const { Exercise } = require('../models/exercise.model');



const createExercise = async (req, res) => {
  try {
    const { name, length } = req.body;
    const exercise = new Exercise({ name, length });
    const savedExercise = await exercise.save();
    res.status(201).json(savedExercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await Exercise.findByIdAndDelete(id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json({ message: 'Exercise deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createExercise,
  deleteExerciseById
};
