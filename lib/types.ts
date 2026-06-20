export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
};

export type PortfolioItem = {
  id: string;
  slug: string | null;
  title: string;
  category: string;
  description: string;
  long_description: string | null;
  features: string[] | null;
  image_url: string | null;
  link: string | null;
  website_url: string | null;
  google_play_url: string | null;
  apple_store_url: string | null;
  created_at?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar_url: string | null;
  rating: number;
};

export type CourseOutline = {
  period: string;
  title: string;
  topics: string[];
};

export type Course = {
  slug: string;
  title: string;
  description: string;
  long_description: string;
  duration: string;
  level: string;
  highlights: string[];
  outline: CourseOutline[];
  prerequisites: string[];
  tools: string[];
};

export type CourseApplication = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  course_slug: string;
  course_title: string;
  message: string | null;
  status: string;
  created_at: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar_url: string | null;
};

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  service?: string;
};

export type SiteSettings = {
  logo_url: string;
  site_name: string;
  hero_badge: string;
  hero_title: string;
  hero_subtitle: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  website_url: string;
  stat_projects: string;
  stat_clients: string;
  stat_rating: string;
};

export type ContactSubmissionRecord = ContactSubmission & {
  id: string;
  created_at: string;
};

export type FiverrPortfolioItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  fiverr_url: string | null;
  sort_order: number;
};
