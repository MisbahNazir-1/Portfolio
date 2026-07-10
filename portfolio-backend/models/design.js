const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  title: { type: String, required: true },       // e.g., "Keithston"
  description: { type: String, required: true }, // e.g., "Bakery & Cafe UI Layout"
  image: { type: String, required: true },       // Project card background image URL
  liveLink: { type: String, required: true },    // Vercel deployment link
  githubLink: { type: String, required: true },  // GitHub repository link
  category: { type: String, default: "Frontend Design" } // Identify separate tabs if needed
}, { timestamps: true });

module.exports = mongoose.model('Design', designSchema);
