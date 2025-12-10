import React, { useState, useEffect } from 'react';
import { 
  Menu, X, TrendingUp, PenTool, BarChart3, 
  Facebook, Twitter, Instagram, Linkedin, ShieldCheck
} from 'lucide-react';
import { getProjects, getClients, submitContactForm, subscribeNewsletter } from '../services/api';
import { Project, Client } from '../types';

interface LandingPageProps {
  onNavigateToAdmin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: ''
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  useEffect(() => {
    getProjects().then(setProjects);
    getClients().then(setClients);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitContactForm(contactForm);
    setContactSuccess(true);
    setContactForm({ fullName: '', email: '', mobile: '', city: '' });
    setTimeout(() => setContactSuccess(false), 3000);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      await subscribeNewsletter(newsletterEmail);
      setSubscribeSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribeSuccess(false), 3000);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="font-sans text-gray-800">
      <nav className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold">R</div>
              <span className="font-bold text-xl text-brand-dark">RealTrust</span>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-gray-600 hover:text-brand-blue font-medium cursor-pointer">Home</a>
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-gray-600 hover:text-brand-blue font-medium cursor-pointer">Services</a>
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-gray-600 hover:text-brand-blue font-medium cursor-pointer">About Us</a>
              <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="text-gray-600 hover:text-brand-blue font-medium cursor-pointer">Projects</a>
              <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="text-gray-600 hover:text-brand-blue font-medium cursor-pointer">Testimonials</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="bg-brand-orange text-white px-5 py-2 rounded-md hover:bg-orange-600 transition-colors font-medium cursor-pointer">Contact</a>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 cursor-pointer">Home</a>
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 cursor-pointer">Services</a>
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 cursor-pointer">About Us</a>
              <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 cursor-pointer">Projects</a>
              <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 cursor-pointer">Testimonials</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="block px-3 py-2 rounded-md text-base font-medium text-brand-orange hover:bg-gray-50 cursor-pointer">Contact</a>
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative bg-gray-50 overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
            <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Consultation,</span>{' '}
                  <span className="block text-brand-blue xl:inline">Design,</span>{' '}
                  <span className="block xl:inline">& Marketing</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Transforming real estate experiences with data-driven strategies and world-class design. We build trust through results.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-orange hover:bg-orange-600 md:py-4 md:text-lg cursor-pointer">
                      Get a Free Quote
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-blue bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg cursor-pointer">
                      View Projects
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Real estate team meeting"
          />
          <div className="hidden xl:block absolute top-20 right-20 bg-brand-blue/90 p-8 rounded-lg shadow-xl w-80 backdrop-blur-sm">
             <h3 className="text-white text-xl font-bold mb-4">Get a Free Consultation</h3>
             <div className="space-y-3">
               <input disabled placeholder="Full Name" className="w-full bg-white/10 border border-white/30 rounded p-2 text-white placeholder-gray-300 text-sm" />
               <input disabled placeholder="Email Address" className="w-full bg-white/10 border border-white/30 rounded p-2 text-white placeholder-gray-300 text-sm" />
               <input disabled placeholder="Mobile Number" className="w-full bg-white/10 border border-white/30 rounded p-2 text-white placeholder-gray-300 text-sm" />
               <button className="w-full bg-brand-orange text-white py-2 rounded font-medium hover:bg-orange-600">Get Quick Quote</button>
             </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-10 lg:mb-0">
               <h2 className="text-3xl font-extrabold text-brand-blue mb-4">Not Your Average Realtor</h2>
               <p className="text-gray-600 text-lg leading-relaxed mb-6">
                 We are a team of dedicated professionals who believe in transparency, integrity, and results. We don't just sell houses; we build relationships and ensure your investment grows.
               </p>
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-blue-50 p-4 rounded-lg">
                   <h4 className="font-bold text-brand-blue">300+</h4>
                   <p className="text-sm text-gray-600">Happy Clients</p>
                 </div>
                 <div className="bg-blue-50 p-4 rounded-lg">
                   <h4 className="font-bold text-brand-blue">150+</h4>
                   <p className="text-sm text-gray-600">Projects Done</p>
                 </div>
               </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                 <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80" className="rounded-2xl shadow-lg w-full h-48 object-cover translate-y-8" alt="Team member" />
                 <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" className="rounded-full shadow-lg w-48 h-48 object-cover border-4 border-white mx-auto" alt="Happy client" />
                 <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" className="rounded-2xl shadow-lg w-full h-48 object-cover -translate-y-8" alt="Handshake" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-blue-50/50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Choose Us?</h2>
            <div className="w-16 h-1 bg-brand-blue mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-blue">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-3">Potential ROI</h3>
              <p className="text-gray-600 text-sm">
                We analyze market trends to ensure your property yields the highest possible return on investment.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-blue">
                <PenTool size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-3">Design</h3>
              <p className="text-gray-600 text-sm">
                Our in-house design team stages your property to look its absolute best for potential buyers.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-blue">
                <BarChart3 size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-3">Marketing</h3>
              <p className="text-gray-600 text-sm">
                Strategic marketing campaigns that target the right audience at the right time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96">
               <div className="absolute top-0 left-0 w-2/3 h-2/3">
                 <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80" alt="Meeting" className="w-full h-full object-cover rounded-lg shadow-md" />
               </div>
               <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-white p-2">
                 <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80" alt="Discussion" className="w-full h-full object-cover rounded-lg shadow-md" />
               </div>
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 border-4 border-brand-orange z-10"></div>
            </div>
            
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-brand-blue mb-6">About Us</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Fifteen years of experience in real estate, excellent customer service and a commitment to work hard, listen and follow through. We provide quality service to build relationships with clients and more importantly, maintain those relationships by communicating effectively.
              </p>
              <button className="px-8 py-3 border border-brand-blue text-brand-blue font-medium rounded hover:bg-brand-blue hover:text-white transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-brand-blue">Our Projects</h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              We know what buyers are looking for and suggest projects that will bring top dollar for the sale of their homes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-brand-blue mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">{project.description}</p>
                  <button className="w-full bg-brand-orange text-white text-xs font-bold uppercase py-2 rounded shadow hover:bg-orange-600 transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
          {projects.length === 0 && (
            <div className="text-center text-gray-500 italic">No projects added yet. Visit Admin Panel.</div>
          )}
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-brand-blue">Happy Clients</h2>
            <div className="w-16 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {clients.map((client) => (
              <div key={client.id} className="w-full md:w-[30%] bg-white border border-gray-100 p-8 rounded-2xl shadow-sm text-center">
                <div className="w-20 h-20 mx-auto mb-6">
                  <img src={client.imageUrl} alt={client.name} className="w-full h-full rounded-full object-cover border-2 border-brand-orange p-1" />
                </div>
                <p className="text-gray-600 text-sm italic mb-6">"{client.description}"</p>
                <h4 className="font-bold text-brand-blue">{client.name}</h4>
                <p className="text-xs text-brand-orange uppercase font-semibold mt-1">{client.designation}</p>
              </div>
            ))}
          </div>
          {clients.length === 0 && (
            <div className="text-center text-gray-500 italic">No clients added yet. Visit Admin Panel.</div>
          )}
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-[#4d5e80] rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8 text-center border-b border-gray-600">
              <h2 className="text-2xl font-bold text-white">Get a Free<br/>Consultation</h2>
            </div>
            <div className="p-8">
              {contactSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 text-center">
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline"> We'll be in touch soon.</span>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <input 
                      required
                      type="text" 
                      placeholder="Full Name"
                      value={contactForm.fullName}
                      onChange={e => setContactForm({...contactForm, fullName: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-3 text-white placeholder-gray-300 focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      required
                      type="email" 
                      placeholder="Enter Email Address"
                      value={contactForm.email}
                      onChange={e => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-3 text-white placeholder-gray-300 focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      required
                      type="tel" 
                      placeholder="Mobile Number"
                      value={contactForm.mobile}
                      onChange={e => setContactForm({...contactForm, mobile: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-3 text-white placeholder-gray-300 focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      required
                      type="text" 
                      placeholder="Area, City"
                      value={contactForm.city}
                      onChange={e => setContactForm({...contactForm, city: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-3 text-white placeholder-gray-300 focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-brand-orange text-white font-bold py-3 rounded hover:bg-orange-600 transition-colors mt-4"
                  >
                    Get Quick Quote
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-white">
             <div className="md:w-1/2 text-left">
                <h2 className="text-2xl font-bold mb-2">Subscribe to our Newsletter</h2>
                <p className="text-blue-100">Get the latest updates and offers directly in your inbox.</p>
             </div>
             <div className="md:w-1/2 w-full">
               <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                 <input 
                   required
                   type="email" 
                   placeholder="Enter Email Address" 
                   value={newsletterEmail}
                   onChange={e => setNewsletterEmail(e.target.value)}
                   className="flex-1 px-4 py-3 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                 />
                 <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded hover:bg-gray-100 transition-colors">
                   Subscribe
                 </button>
               </form>
               {subscribeSuccess && <p className="text-white mt-2 text-sm text-left">Subscribed successfully!</p>}
             </div>
           </div>
         </div>
      </section>

      <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center font-bold">R</div>
                 <span className="font-bold text-xl">RealTrust</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted partner in real estate. We help you find your dream home with ease.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-brand-orange cursor-pointer">Home</a></li>
                <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-brand-orange cursor-pointer">About Us</a></li>
                <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-brand-orange cursor-pointer">Services</a></li>
                <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-brand-orange cursor-pointer">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-orange cursor-pointer">Privacy Policy</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-orange cursor-pointer">Terms of Service</a></li>
                <li><button onClick={onNavigateToAdmin} className="hover:text-brand-orange cursor-pointer text-left">Admin Panel</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-white cursor-pointer"><Facebook size={20} /></a>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-white cursor-pointer"><Twitter size={20} /></a>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-white cursor-pointer"><Instagram size={20} /></a>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-white cursor-pointer"><Linkedin size={20} /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} RealTrust Realty. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;