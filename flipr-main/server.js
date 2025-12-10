const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://varun:varun1207@cluster0.yf4q9un.mongodb.net/realtrust?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Schemas
const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
});

const ClientSchema = new mongoose.Schema({
  name: String,
  designation: String,
  description: String,
  imageUrl: String,
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

// ------------------ API ROUTES ------------------

// Projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects.map(p => ({
      id: p._id,
      name: p.name,
      description: p.description,
      imageUrl: p.imageUrl
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const saved = await new Project(req.body).save();
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
    res.json(clients.map(c => ({
      id: c._id,
      name: c.name,
      designation: c.designation,
      description: c.description,
      imageUrl: c.imageUrl
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/clients', async (req, res) => {
  try {
    const saved = await new Client(req.body).save();
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

// Contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.json(contacts.map(c => ({
      id: c._id,
      fullName: c.fullName,
      email: c.email,
      mobile: c.mobile,
      city: c.city,
      date: c.date
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    await new Contact(req.body).save();
    res.json({ message: 'Contact saved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Subscribers
app.get('/api/subscribers', async (req, res) => {
  try {
    const subs = await Subscriber.find().sort({ date: -1 });
    res.json(subs.map(s => ({
      id: s._id,
      email: s.email,
      date: s.date
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/subscribers', async (req, res) => {
  try {
    const { email } = req.body;
    const exists = await Subscriber.findOne({ email });
    if (exists) return res.json({ message: "Already subscribed" });

    await new Subscriber({ email }).save();
    res.json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ------------------ FRONTEND SERVE ------------------

const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname1, "dist", "index.html"));
});

// ------------------ START ------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
