const mongoose = require('mongoose');

const AppCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tag: { type: String, required: true },
  iconName: { type: String, required: true }, // Jaise: 'FiShoppingBag'
  glowColor: { type: String, required: true }, // Jaise: '#00ffcc'
  imageUrl: { type: String, required: true },
  route: {type: String, required: true},
  repolink:{type: String, required: true},
});

module.exports = mongoose.model('AppCard', AppCardSchema);
