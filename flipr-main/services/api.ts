import { Project, Client, ContactSubmission, Subscriber } from '../types';

// ============================================================================
// CONFIGURATION
// ============================================================================
// Set this to TRUE when you deploy the backend to Render/Heroku
const USE_REAL_BACKEND = false; 

// Replace with your actual backend URL after deployment
// e.g., 'https://realtrust-backend.onrender.com/api'
const API_BASE_URL = 'http://localhost:5000/api'; 
// ============================================================================

const STORAGE_KEYS = {
  PROJECTS: 'realtrust_projects',
  CLIENTS: 'realtrust_clients',
  CONTACTS: 'realtrust_contacts',
  SUBSCRIBERS: 'realtrust_subscribers',
};

const generateId = () => Math.random().toString(36).substr(2, 9);
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 300));

// --- Mock Data ---
const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Luxury Villa Consultation',
    description: 'Expert consultation for a high-end villa project in Beverly Hills, focusing on maximizing value.',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Modern Apartment Design',
    description: 'Full interior design renovation for a downtown penthouse suite with minimalist aesthetics.',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Commercial Marketing',
    description: 'Strategic marketing campaign for a new office complex, resulting in 100% occupancy pre-launch.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Estate Planning & Sales',
    description: 'Comprehensive estate planning and successful sale of a historic countryside manor.',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  }
];

const initialClients: Client[] = [
  {
    id: '1',
    name: 'Rowhan Smith',
    designation: 'CEO, Foreclosure',
    description: 'RealTrust helped us find the perfect office space. Their team is professional and dedicated.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '2',
    name: 'Shipra Kayak',
    designation: 'Brand Designer',
    description: 'Amazing experience! They understood my needs perfectly and delivered beyond expectations.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '3',
    name: 'John Lepore',
    designation: 'Architect',
    description: 'The consultation provided was top-notch. I highly recommend their services to everyone.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '4',
    name: 'Marry Freeman',
    designation: 'Marketing Manager',
    description: 'Their marketing strategies are brilliant. We saw a huge uptake in inquiries immediately.',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '5',
    name: 'Lucy',
    designation: 'Sales Rep',
    description: 'Professional, reliable, and results-oriented. The best real estate team I have worked with.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
];

export const initMockData = () => {
  if (USE_REAL_BACKEND) return; 

  try {
    if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CLIENTS)) {
      localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(initialClients));
    }
  } catch (error) {
    console.error('Error initializing data', error);
  }
};

// --- Projects ---
export const getProjects = async (): Promise<Project[]> => {
  if (USE_REAL_BACKEND) {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`);
      return await res.json();
    } catch (e) { console.error(e); return []; }
  } else {
    await simulateDelay();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return data ? JSON.parse(data) : [];
    } catch (error) { return []; }
  }
};

export const addProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  if (USE_REAL_BACKEND) {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    return await res.json();
  } else {
    await simulateDelay();
    const projects = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || '[]');
    const newProject = { ...project, id: generateId() };
    projects.push(newProject);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    return newProject;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  if (USE_REAL_BACKEND) {
    await fetch(`${API_BASE_URL}/projects/${id}`, { method: 'DELETE' });
  } else {
    await simulateDelay();
    const projects = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || '[]');
    const filtered = projects.filter((p: Project) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filtered));
  }
};

// --- Clients ---
export const getClients = async (): Promise<Client[]> => {
  if (USE_REAL_BACKEND) {
    try {
      const res = await fetch(`${API_BASE_URL}/clients`);
      return await res.json();
    } catch (e) { console.error(e); return []; }
  } else {
    await simulateDelay();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CLIENTS);
      return data ? JSON.parse(data) : [];
    } catch (error) { return []; }
  }
};

export const addClient = async (client: Omit<Client, 'id'>): Promise<Client> => {
  if (USE_REAL_BACKEND) {
    const res = await fetch(`${API_BASE_URL}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    });
    return await res.json();
  } else {
    await simulateDelay();
    const clients = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS) || '[]');
    const newClient = { ...client, id: generateId() };
    clients.push(newClient);
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
    return newClient;
  }
};

export const deleteClient = async (id: string): Promise<void> => {
  if (USE_REAL_BACKEND) {
    await fetch(`${API_BASE_URL}/clients/${id}`, { method: 'DELETE' });
  } else {
    await simulateDelay();
    const clients = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS) || '[]');
    const filtered = clients.filter((c: Client) => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(filtered));
  }
};

// --- Contact Forms ---
export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
  if (USE_REAL_BACKEND) {
    try {
      const res = await fetch(`${API_BASE_URL}/contacts`);
      return await res.json();
    } catch (e) { return []; }
  } else {
    await simulateDelay();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      return data ? JSON.parse(data) : [];
    } catch (error) { return []; }
  }
};

export const submitContactForm = async (submission: Omit<ContactSubmission, 'id' | 'date'>): Promise<void> => {
  if (USE_REAL_BACKEND) {
    await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
  } else {
    await simulateDelay();
    const submissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACTS) || '[]');
    const newSubmission = { 
      ...submission, 
      id: generateId(), 
      date: new Date().toISOString() 
    };
    submissions.push(newSubmission);
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(submissions));
  }
};

// --- Subscribers ---
export const getSubscribers = async (): Promise<Subscriber[]> => {
  if (USE_REAL_BACKEND) {
    try {
      const res = await fetch(`${API_BASE_URL}/subscribers`);
      return await res.json();
    } catch (e) { return []; }
  } else {
    await simulateDelay();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS);
      return data ? JSON.parse(data) : [];
    } catch (error) { return []; }
  }
};

export const subscribeNewsletter = async (email: string): Promise<void> => {
  if (USE_REAL_BACKEND) {
    await fetch(`${API_BASE_URL}/subscribers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
  } else {
    await simulateDelay();
    const subscribers = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS) || '[]');
    if (subscribers.some((s: Subscriber) => s.email === email)) return;
    
    const newSubscriber = { 
      id: generateId(), 
      email, 
      date: new Date().toISOString() 
    };
    subscribers.push(newSubscriber);
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(subscribers));
  }
};

// Utility (Client-side only)
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};