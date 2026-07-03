// types/index.ts

export type UserRole = "admin" | "editor" | "client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  email?: string;
}

export interface Attorney {
  id: string;
  slug: string;
  name: string;
  position: string;
  photoUrl: string;
  bio: string;
  shortBio: string;
  experienceYears: number;
  education: string[];
  practiceAreas: string[]; // PracticeArea slugs
  social: SocialLinks;
  featured?: boolean;
}

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  practiceArea: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface Author {
  name: string;
  avatarUrl: string;
  role: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  author: Author;
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
}

export interface PracticeArea {
  id: string;
  slug: string;
  title: string;
  icon: string; // lucide icon name
  shortDescription: string;
  description: string;
  image?: string;
  relatedAttorneys?: string[];
}

export type EmploymentType = "Full-time" | "Part-time" | "Internship" | "Contract";

export interface Career {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: EmploymentType;
  description: string;
  requirements: string[];
  postedAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole?: string;
  avatarUrl?: string;
  rating: number; // 1-5
  quote: string;
  practiceArea?: string;
}

export type MessageStatus = "unread" | "read" | "archived";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

export interface Settings {
  firmName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  officeHours: string;
  socials: SocialLinks;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}
