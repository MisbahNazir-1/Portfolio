const mongoose = require('mongoose');

const internProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    githubLink: { type: String, required: true },
    imageLink: { type: String, required: true },
    status: { type: String, default: 'Completed' }
});

module.exports = mongoose.model('InternProject', internProjectSchema);