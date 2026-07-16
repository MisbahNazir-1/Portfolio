const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  title: { type: String, required: true },       
  description: { type: String, required: true },
  image: { type: String, required: true },      
  liveLink: { type: String, required: true },   
  githubLink: { type: String, required: true }, 
  category: { type: String, default: "Frontend Design" } 
}, { timestamps: true });

module.exports = mongoose.model('Design', designSchema);
