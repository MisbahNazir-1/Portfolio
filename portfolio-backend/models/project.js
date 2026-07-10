const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: [{ type: String }], 
  imgURL: { type: String, required: true },
  liveLink: { type: String, default: '#' },
  githubLink: { type: String, default: '#' }
});

module.exports = mongoose.model('Project', ProjectSchema);
