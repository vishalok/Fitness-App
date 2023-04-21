const { FitnessProgram } = require('../models/program.model');

const createFitnessProgram = async (req, res) => {
  try {
    const { name, exercises } = req.body;
    const fitnessProgram = new FitnessProgram({ name, exercises });
    const savedFitnessProgram = await fitnessProgram.save();
    res.status(201).json(savedFitnessProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFitnessPrograms = async (req, res) => {
  try {
    const fitnessPrograms = await FitnessProgram.find();
    res.json(fitnessPrograms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFitnessProgramById = async (req, res) => {
  try {
    const { id } = req.params;
    const fitnessProgram = await FitnessProgram.findById(id);
    if (!fitnessProgram) {
      return res.status(404).json({ message: 'Fitness program not found' });
    }
    res.json(fitnessProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFitnessProgramById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, exercises } = req.body;
    const fitnessProgram = await FitnessProgram.findById(id);
    if (!fitnessProgram) {
      return res.status(404).json({ message: 'Fitness program not found' });
    }
    fitnessProgram.name = name;
    fitnessProgram.exercises = exercises;
    const updatedFitnessProgram = await fitnessProgram.save();
    res.json(updatedFitnessProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFitnessProgramById = async (req, res) => {
  try {
    const { id } = req.params;
    const fitnessProgram = await FitnessProgram.findByIdAndDelete(id);
    if (!fitnessProgram) {
      return res.status(404).json({ message: 'Fitness program not found' });
    }
    res.json({ message: 'Fitness program deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createFitnessProgram,
  getFitnessPrograms,
  getFitnessProgramById,
  updateFitnessProgramById,
  deleteFitnessProgramById

};
