import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Users, MessageSquare, Mail, 
  Trash2, Plus, LogOut, Upload, Home
} from 'lucide-react';
import { 
  Project, Client, ContactSubmission, Subscriber, ViewMode 
} from '../types';
import { 
  getProjects, addProject, deleteProject,
  getClients, addClient, deleteClient,
  getContactSubmissions, getSubscribers,
  fileToBase64
} from '../services/api';

interface AdminPanelProps {
  onNavigateToHome: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigateToHome }) => {
  const [activeView, setActiveView] = useState<ViewMode>('projects');
  
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-[#1a1a1a] text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold">A</div>
          <span className="font-bold text-xl">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem 
            icon={<Briefcase size={20} />} 
            label="Projects" 
            active={activeView === 'projects'} 
            onClick={() => setActiveView('projects')} 
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            label="Clients" 
            active={activeView === 'clients'} 
            onClick={() => setActiveView('clients')} 
          />
          <SidebarItem 
            icon={<MessageSquare size={20} />} 
            label="Contact Forms" 
            active={activeView === 'contacts'} 
            onClick={() => setActiveView('contacts')} 
          />
          <SidebarItem 
            icon={<Mail size={20} />} 
            label="Subscribers" 
            active={activeView === 'subscribers'} 
            onClick={() => setActiveView('subscribers')} 
          />
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={onNavigateToHome}
            className="flex items-center gap-3 text-gray-400 text-sm px-4 py-2 hover:text-white w-full rounded hover:bg-white/10 transition-colors"
          >
            <Home size={16} />
            <span>Back to Home</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-gray-50">
        <header className="bg-white p-6 shadow-sm flex md:hidden justify-between items-center sticky top-0 z-10">
          <span className="font-bold text-lg text-brand-dark">Admin Panel</span>
          <div className="flex gap-2">
             <button onClick={() => setActiveView('projects')} className={`p-2 rounded ${activeView === 'projects' ? 'bg-blue-50 text-brand-blue' : ''}`}><Briefcase size={20}/></button>
             <button onClick={() => setActiveView('clients')} className={`p-2 rounded ${activeView === 'clients' ? 'bg-blue-50 text-brand-blue' : ''}`}><Users size={20}/></button>
             <button onClick={() => setActiveView('contacts')} className={`p-2 rounded ${activeView === 'contacts' ? 'bg-blue-50 text-brand-blue' : ''}`}><MessageSquare size={20}/></button>
             <button onClick={() => setActiveView('subscribers')} className={`p-2 rounded ${activeView === 'subscribers' ? 'bg-blue-50 text-brand-blue' : ''}`}><Mail size={20}/></button>
             <button onClick={onNavigateToHome} className="p-2 text-gray-500"><Home size={20}/></button>
          </div>
        </header>

        <div className="p-8">
          {activeView === 'projects' && <ProjectManager />}
          {activeView === 'clients' && <ClientManager />}
          {activeView === 'contacts' && <ContactList />}
          {activeView === 'subscribers' && <SubscriberList />}
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
      active ? 'bg-brand-blue text-white font-medium' : 'text-gray-400 hover:bg-white/10 hover:text-white'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '', imageUrl: '' });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      setNewProject({ ...newProject, imageUrl: base64 });
      setImagePreview(base64);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.imageUrl) {
      alert("Please upload an image");
      return;
    }
    const added = await addProject(newProject as any);
    setProjects([...projects, added]);
    setIsAdding(false);
    setNewProject({ name: '', description: '', imageUrl: '' });
    setImagePreview(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Project Management</h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-brand-blue text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 shadow-sm"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add Project</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4">Add New Project</h3>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input required type="text" className="w-full border border-gray-300 rounded-md p-2" 
                value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea required className="w-full border border-gray-300 rounded-md p-2" rows={3}
                value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
              <div className="flex items-center gap-4">
                 <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300 flex items-center gap-2">
                   <Upload size={16} /> Upload Image
                   <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                 </label>
                 {imagePreview && <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded border" />}
              </div>
            </div>
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Save Project</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden group">
             <div className="h-48 overflow-hidden relative">
               <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
             </div>
             <div className="p-5">
               <h3 className="font-bold text-lg text-gray-800">{project.name}</h3>
               <p className="text-sm text-gray-500 mb-4 line-clamp-2 mt-2">{project.description}</p>
               <button onClick={() => handleDelete(project.id)} className="text-red-500 text-sm flex items-center gap-1 hover:text-red-700 border border-red-100 px-3 py-1 rounded-full hover:bg-red-50 transition-colors">
                 <Trash2 size={14} /> Delete
               </button>
             </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-gray-500 italic">No projects found. Add one to get started.</p>}
      </div>
    </div>
  );
};

const ClientManager: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', designation: '', description: '', imageUrl: '' });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    getClients().then(setClients);
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      setNewClient({ ...newClient, imageUrl: base64 });
      setImagePreview(base64);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.imageUrl) {
      alert("Please upload a client photo");
      return;
    }
    const added = await addClient(newClient as any);
    setClients([...clients, added]);
    setIsAdding(false);
    setNewClient({ name: '', designation: '', description: '', imageUrl: '' });
    setImagePreview(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete client?')) {
      await deleteClient(id);
      setClients(clients.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Client Management</h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-brand-blue text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 shadow-sm"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add Client</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Add New Client</h3>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input required type="text" className="w-full border border-gray-300 rounded-md p-2" 
                  value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                <input required type="text" placeholder="e.g. CEO" className="w-full border border-gray-300 rounded-md p-2" 
                  value={newClient.designation} onChange={e => setNewClient({...newClient, designation: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial</label>
              <textarea required className="w-full border border-gray-300 rounded-md p-2" rows={3}
                value={newClient.description} onChange={e => setNewClient({...newClient, description: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
              <div className="flex items-center gap-4">
                 <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300 flex items-center gap-2">
                   <Upload size={16} /> Upload Photo
                   <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                 </label>
                 {imagePreview && <img src={imagePreview} alt="Preview" className="w-12 h-12 object-cover rounded-full border" />}
              </div>
            </div>
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Save Client</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map(client => (
          <div key={client.id} className="bg-white rounded-lg shadow p-6 flex items-start gap-4 border border-gray-100 hover:shadow-md transition-shadow">
             <img src={client.imageUrl} alt={client.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" />
             <div className="flex-1">
               <h3 className="font-bold text-gray-800">{client.name}</h3>
               <p className="text-xs text-brand-orange uppercase font-semibold">{client.designation}</p>
               <p className="text-sm text-gray-500 mt-2 italic">"{client.description}"</p>
               <button onClick={() => handleDelete(client.id)} className="text-red-500 text-xs mt-4 flex items-center gap-1 hover:text-red-700 border border-red-100 px-2 py-1 rounded inline-flex">
                 <Trash2 size={12} /> Remove
               </button>
             </div>
          </div>
        ))}
        {clients.length === 0 && <p className="text-gray-500 italic">No clients found.</p>}
      </div>
    </div>
  );
};

const ContactList: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    getContactSubmissions().then(setSubmissions);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Contact Form Submissions</h2>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-bold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Full Name</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Mobile Number</th>
                <th className="px-6 py-4">City</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {submissions.map(sub => (
                <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{sub.fullName}</td>
                  <td className="px-6 py-4">{sub.email}</td>
                  <td className="px-6 py-4">{sub.mobile}</td>
                  <td className="px-6 py-4">{sub.city}</td>
                  <td className="px-6 py-4 text-gray-400">{new Date(sub.date).toLocaleDateString()}</td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500 italic">No submissions yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SubscriberList: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    getSubscribers().then(setSubscribers);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Newsletter Subscribers</h2>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 max-w-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-bold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Subscribed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.map(sub => (
                <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{sub.email}</td>
                  <td className="px-6 py-4 text-gray-400">{new Date(sub.date).toLocaleDateString()}</td>
                </tr>
              ))}
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-6 py-8 text-center text-gray-500 italic">No subscribers yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;