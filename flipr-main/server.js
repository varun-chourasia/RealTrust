const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for Base64 images

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://varun:varun1207@cluster0.yf4q9un.mongodb.net/realtrust?appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('HINT: Did you replace <db_username> and <db_password> in server.js with your actual credentials?');
  });

// Schemas
const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String, // Base64 string
});

const ClientSchema = new mongoose.Schema({
  name: String,
  designation: String,
  description: String,
  imageUrl: String, // Base64 string
});

const ContactSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobile: String,
  city: String,
  date: { type: Date, default: Date.now },
});

const SubscriberSchema = new mongoose.Schema({
  email: String,
  date: { type: Date, default: Date.now },
});

// Models
const Project = mongoose.model('Project', ProjectSchema);
const Client = mongoose.model('Client', ClientSchema);
const Contact = mongoose.model('Contact', ContactSchema);
const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

// --- Routes ---

// Projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    // Map _id to id for frontend compatibility
    const formatted = projects.map(p => ({
      id: p._id,
      name: p.name,
      description: p.description,
      imageUrl: p.imageUrl
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const saved = await newProject.save();
    res.json({
      id: saved._id,
      name: saved.name,
      description: saved.description,
      imageUrl: saved.imageUrl
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clients
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await Client.find();
    const formatted = clients.map(c => ({
      id: c._id,
      name: c.name,
      designation: c.designation,
      description: c.description,
      imageUrl: c.imageUrl
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/clients', async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const saved = await newClient.save();
    res.json({
      id: saved._id,
      name: saved.name,
      designation: saved.designation,
      description: saved.description,
      imageUrl: saved.imageUrl
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/clients/:id', async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Contact Forms
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    const formatted = contacts.map(c => ({
      id: c._id,
      fullName: c.fullName,
      email: c.email,
      mobile: c.mobile,
      city: c.city,
      date: c.date
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json({ message: 'Contact saved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Subscribers
app.get('/api/subscribers', async (req, res) => {
  try {
    const subs = await Subscriber.find().sort({ date: -1 });
    const formatted = subs.map(s => ({
      id: s._id,
      email: s.email,
      date: s.date
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/subscribers', async (req, res) => {
  try {
    const { email } = req.body;
    // Check for duplicate
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.json({ message: 'Already subscribed' });
    }
    const newSub = new Subscriber({ email });
    await newSub.save();
    res.json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});