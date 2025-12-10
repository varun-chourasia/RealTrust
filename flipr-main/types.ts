export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Client {
  id: string;
  name: string;
  designation: string;
  description: string;
  imageUrl: string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  date: string;
}

export interface Subscriber {
  id: string;
  email: string;
  date: string;
}

export type ViewMode = 'projects' | 'clients' | 'contacts' | 'subscribers';
