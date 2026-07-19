const dns = require('node:dns');
if (dns.setServers) {
  dns.setServers(['1.1.1.1', '8.8.8.8']);
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const Experience = require('./models/experience');
const Project = require('./models/project');
const Skill = require('./models/skill');
const AppCard = require('./models/appcard');
const Resume = require('./models/resume');
const Design = require('./models/design')
const InternProject = require('./models/internProject');


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is missing in environment variables.');
  process.exit(1);
}

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log('🚀 MongoDB Connected Successfully!');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('💡 Tip: Please check if your internet or firewall is blocking Atlas.');
    throw err;
  }
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Portfolio Backend is running perfectly!');
});

// ==================== 1. APPS GATEWAY APIs ====================
app.get('/api/apps', async (req, res) => {
  try { res.json(await AppCard.find()); } catch (err) { res.status(500).json({ error: err.message }); }
});
app.post('/api/apps', async (req, res) => {
  try { res.status(201).json(await new AppCard(req.body).save()); } catch (err) { res.status(400).json({ error: err.message }); }
});
app.delete('/api/apps/:id', async (req, res) => {
  try { 
    const deletedApp = await AppCard.findByIdAndDelete(req.params.id);
    if (!deletedApp) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted successfully!" }); 
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

// ==================== 2. Designs APIs ====================
app.get('/api/designs', async (req, res) => {
  try {
    const designs = await Design.find().sort({ createdAt: -1 });
    res.json(designs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/designs', async (req, res) => {
  try {
    const newDesign = new Design(req.body);
    const savedDesign = await newDesign.save();
    res.status(201).json(savedDesign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/designs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDesign = await Design.findByIdAndDelete(id);
    if (!deletedDesign) {
      return res.status(404).json({ message: "Design not found" });
    }

    res.json({ message: "Design deleted successfully", deletedDesign });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== 3. EXPERIENCE APIs ====================
app.get('/api/experience', async (req, res) => {
  try { res.json(await Experience.find()); } catch (err) { res.status(500).json({ error: err.message }); }
});
app.post('/api/experience', async (req, res) => {
  try { res.status(201).json(await new Experience(req.body).save()); } catch (err) { res.status(400).json({ error: err.message }); }
});
app.delete('/api/experience/:id', async (req, res) => {
  try { 
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
    if (!deletedExperience) {
      return res.status(404).json({ error: "Experience record not found in database." });
    }
    res.json({ message: "Experience record successfully deleted from production cluster!" }); 
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});
 
// ==================== 4. PROJECT APIs ====================
app.get('/api/projects', async (req, res) => {
  try { res.json(await Project.find()); } catch (err) { res.status(500).json({ error: err.message }); }
});
app.post('/api/projects', async (req, res) => {
  try { res.status(201).json(await new Project(req.body).save()); } catch (err) { res.status(400).json({ error: err.message }); }
});
app.delete('/api/projects/:id', async (req, res) => {
  try { 
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: "Project record not found in cluster data." });
    }
    res.json({ message: "Project system node successfully deleted from repository!" }); 
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});


// ==================== 5. TECH STACK (SKILL) APIs ====================
app.get('/api/skills', async (req, res) => {
  try { res.json(await Skill.find()); } catch (err) { res.status(500).json({ error: err.message }); }
});
app.post('/api/skills', async (req, res) => {
  try { res.status(201).json(await new Skill(req.body).save()); } catch (err) { res.status(400).json({ error: err.message }); }
});
app.delete('/api/skills/:id', async (req, res) => {
  try { 
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      return res.status(404).json({ error: "Skill indicator not found in cluster database." });
    }
    res.json({ message: "Skill successfully flushed from system core repository!" }); 
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

// ==================== 6. EXECUTIVE CV APIs ====================
app.get('/api/resume', async (req, res) => {
  try { 
    const resumeData = await Resume.findOne().sort({ updatedAt: -1 }); 
    res.json(resumeData || { resumeUrl: "#" }); 
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});
app.post('/api/resume', async (req, res) => {
  try { 
    res.status(201).json(await new Resume(req.body).save()); 
  } catch (err) { 
    res.status(400).json({ error: err.message }); 
  }
});


// ==================== 3. INTERNPROJECT APIs ====================
app.route('/api/intern-projects')
  .get(async (req, res) => {
    try {
      const projects = await InternProject.find();
      res.status(200).json(projects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const newProject = new InternProject(req.body);
      const savedProject = await newProject.save();
      res.status(201).json(savedProject);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
app.delete('/api/intern-projects/:id', async (req, res) => {
  try {
    const deleted = await InternProject.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Intern project not found" });
    res.status(200).json({ message: "Intern project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`📡 Server is running locally on port: ${PORT}`);
  });
}

module.exports = app;