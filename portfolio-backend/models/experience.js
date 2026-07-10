const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  desc: { type: String, required: true }
});

module.exports = mongoose.model('Experience', ExperienceSchema);
