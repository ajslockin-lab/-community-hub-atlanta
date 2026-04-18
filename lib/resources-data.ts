export type ResourceCategory =
  | "food"
  | "housing"
  | "health"
  | "education"
  | "employment"
  | "youth"
  | "seniors"
  | "legal"
  | "community";

export interface Resource {
  id: string;
  name: string;
  description: string;
  category: ResourceCategory;
  address: string;
  phone: string;
  website: string;
  hours: string;
  featured: boolean;
  lat: number;
  lng: number;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: ResourceCategory;
}

export const categoryLabels: Record<ResourceCategory, string> = {
  food: "Food Assistance",
  housing: "Housing & Shelter",
  health: "Health Services",
  education: "Education & Training",
  employment: "Employment Services",
  youth: "Youth Programs",
  seniors: "Senior Services",
  legal: "Legal Aid",
  community: "Community Centers",
};

export const categoryColors: Record<ResourceCategory, string> = {
  food: "bg-amber-500/20 text-amber-200 border-amber-500/30",
  housing: "bg-blue-500/20 text-blue-200 border-blue-500/30",
  health: "bg-rose-500/20 text-rose-200 border-rose-500/30",
  education: "bg-violet-500/20 text-violet-200 border-violet-500/30",
  employment: "bg-emerald-500/20 text-emerald-200 border-emerald-500/30",
  youth: "bg-orange-500/20 text-orange-200 border-orange-500/30",
  seniors: "bg-teal-500/20 text-teal-200 border-teal-500/30",
  legal: "bg-slate-500/20 text-slate-200 border-slate-500/30",
  community: "bg-pink-500/20 text-pink-200 border-pink-500/30",
};

export const resources: Resource[] = [
  {
    id: "1",
    name: "Atlanta Community Food Bank",
    description:
      "Providing food assistance to families across metro Atlanta through a network of 700+ nonprofit partners. Offers emergency food boxes, SNAP assistance, and nutrition education programs.",
    category: "food",
    address: "3400 North Desert Drive, Atlanta, GA 30344",
    phone: "(404) 892-9822",
    website: "https://acfb.org",
    hours: "Mon-Fri: 8AM-5PM",
    featured: true,
    lat: 33.6894,
    lng: -84.4503,
  },
  {
    id: "2",
    name: "Gateway Center",
    description:
      "Comprehensive homeless services including emergency shelter, transitional housing, job training, and mental health support. Serving Atlanta's homeless population since 1997.",
    category: "housing",
    address: "275 Pryor Street SW, Atlanta, GA 30303",
    phone: "(404) 215-6600",
    website: "https://gatewayctr.org",
    hours: "24/7 Services Available",
    featured: true,
    lat: 33.7490,
    lng: -84.3936,
  },
  {
    id: "3",
    name: "Grady Health System",
    description:
      "Atlanta's premier public hospital providing comprehensive healthcare services regardless of ability to pay. Includes primary care, specialty clinics, and emergency services.",
    category: "health",
    address: "80 Jesse Hill Jr Drive SE, Atlanta, GA 30303",
    phone: "(404) 616-1000",
    website: "https://gradyhealth.org",
    hours: "Emergency: 24/7, Clinics: Mon-Fri 8AM-5PM",
    featured: true,
    lat: 33.7545,
    lng: -84.3827,
  },
  {
    id: "4",
    name: "Atlanta Workforce Development Agency",
    description:
      "Free career services including job placement assistance, resume workshops, interview preparation, and skills training programs for Atlanta residents.",
    category: "employment",
    address: "818 Pollard Blvd SW, Atlanta, GA 30315",
    phone: "(404) 546-3000",
    website: "https://atlantaga.gov/workforce",
    hours: "Mon-Fri: 8:30AM-5PM",
    featured: false,
    lat: 33.7219,
    lng: -84.4119,
  },
  {
    id: "5",
    name: "Boys & Girls Clubs of Metro Atlanta",
    description:
      "After-school and summer programs for youth ages 6-18. Offers academic support, leadership development, arts programs, and athletics across multiple locations.",
    category: "youth",
    address: "Multiple Locations Across Metro Atlanta",
    phone: "(404) 527-7100",
    website: "https://bgcma.org",
    hours: "After School: 3PM-8PM, Summer: 7AM-6PM",
    featured: false,
    lat: 33.7627,
    lng: -84.3963,
  },
  {
    id: "6",
    name: "Atlanta Legal Aid Society",
    description:
      "Free civil legal services for low-income individuals and families. Assistance with housing, family law, consumer issues, public benefits, and immigration matters.",
    category: "legal",
    address: "54 Ellis Street NE, Atlanta, GA 30303",
    phone: "(404) 524-5811",
    website: "https://atlantalegalaid.org",
    hours: "Mon-Fri: 9AM-5PM",
    featured: false,
    lat: 33.7570,
    lng: -84.3859,
  },
  {
    id: "7",
    name: "Atlanta Senior Centers",
    description:
      "Network of senior centers offering meals, social activities, health screenings, fitness classes, and transportation services for adults 60 and older.",
    category: "seniors",
    address: "Multiple Locations",
    phone: "(404) 330-6000",
    website: "https://atlantaga.gov/seniors",
    hours: "Mon-Fri: 9AM-4PM",
    featured: false,
    lat: 33.7488,
    lng: -84.4208,
  },
  {
    id: "8",
    name: "Atlanta Technical College",
    description:
      "Affordable career and technical education programs. GED preparation, workforce training, associate degrees, and certificate programs in high-demand fields.",
    category: "education",
    address: "1560 Metropolitan Pkwy SW, Atlanta, GA 30310",
    phone: "(404) 225-4400",
    website: "https://atlantatech.edu",
    hours: "Mon-Thu: 8AM-7PM, Fri: 8AM-3PM",
    featured: false,
    lat: 33.7145,
    lng: -84.4282,
  },
  {
    id: "9",
    name: "Westside Future Fund",
    description:
      "Community development organization focused on revitalization of Atlanta's Westside neighborhoods. Offers homeowner grants, workforce programs, and community engagement.",
    category: "community",
    address: "965 Joseph E. Boone Blvd NW, Atlanta, GA 30314",
    phone: "(404) 793-2670",
    website: "https://westsidefuturefund.org",
    hours: "Mon-Fri: 9AM-5PM",
    featured: false,
    lat: 33.7668,
    lng: -84.4305,
  },
  {
    id: "10",
    name: "Good Samaritan Health Center",
    description:
      "Nonprofit clinic providing affordable primary care, dental services, mental health counseling, and prescription assistance to uninsured and underinsured patients.",
    category: "health",
    address: "1015 Donald Lee Hollowell Pkwy NW, Atlanta, GA 30318",
    phone: "(404) 523-6571",
    website: "https://goodsamatlanta.org",
    hours: "Mon-Fri: 8AM-5PM",
    featured: false,
    lat: 33.7726,
    lng: -84.4371,
  },
  {
    id: "11",
    name: "Hosea Helps",
    description:
      "Emergency assistance including food distribution, utility assistance, housing support, and annual community events serving thousands of Atlanta families.",
    category: "food",
    address: "1859 Highfield Road SE, Atlanta, GA 30315",
    phone: "(404) 755-3353",
    website: "https://hoseahelps.org",
    hours: "Mon-Fri: 9AM-4PM",
    featured: false,
    lat: 33.7089,
    lng: -84.3715,
  },
  {
    id: "12",
    name: "Atlanta Housing Authority",
    description:
      "Affordable housing programs including public housing, Housing Choice Vouchers (Section 8), and mixed-income communities for eligible Atlanta residents.",
    category: "housing",
    address: "230 John Wesley Dobbs Ave NE, Atlanta, GA 30303",
    phone: "(404) 892-4700",
    website: "https://atlantahousing.org",
    hours: "Mon-Fri: 8:30AM-5PM",
    featured: false,
    lat: 33.7570,
    lng: -84.3794,
  },
];

export const events: Event[] = [
  {
    id: "1",
    title: "Community Job Fair",
    date: "2025-02-15",
    time: "10:00 AM - 3:00 PM",
    location: "Georgia World Congress Center",
    description:
      "Connect with over 100 employers hiring for positions across metro Atlanta. Bring your resume and dress professionally.",
    category: "employment",
  },
  {
    id: "2",
    title: "Free Health Screening Day",
    date: "2025-02-20",
    time: "9:00 AM - 2:00 PM",
    location: "Grady Health System",
    description:
      "Free blood pressure, cholesterol, and diabetes screenings. No appointment necessary. Open to all community members.",
    category: "health",
  },
  {
    id: "3",
    title: "Youth Leadership Summit",
    date: "2025-02-22",
    time: "8:30 AM - 4:00 PM",
    location: "Martin Luther King Jr. Center",
    description:
      "Empowering young leaders ages 14-21 with workshops on civic engagement, public speaking, and community organizing.",
    category: "youth",
  },
  {
    id: "4",
    title: "Senior Wellness Workshop",
    date: "2025-02-25",
    time: "11:00 AM - 1:00 PM",
    location: "Atlanta Senior Center - Buckhead",
    description:
      "Learn about nutrition, exercise, and mental wellness strategies for healthy aging. Lunch provided.",
    category: "seniors",
  },
  {
    id: "5",
    title: "Mobile Food Pantry Distribution",
    date: "2025-02-28",
    time: "10:00 AM - 12:00 PM",
    location: "Turner Field Parking Lot",
    description:
      "Free fresh produce and groceries for families in need. First come, first served. Bring your own bags.",
    category: "food",
  },
  {
    id: "6",
    title: "Know Your Rights Workshop",
    date: "2025-03-01",
    time: "6:00 PM - 8:00 PM",
    location: "Atlanta Legal Aid Society",
    description:
      "Free legal education workshop covering tenant rights, employment law, and consumer protection.",
    category: "legal",
  },
  {
    id: "7",
    title: "Housing Assistance Information Session",
    date: "2025-03-05",
    time: "2:00 PM - 4:00 PM",
    location: "Atlanta Housing Authority",
    description:
      "Learn about affordable housing programs, application processes, and eligibility requirements.",
    category: "housing",
  },
  {
    id: "8",
    title: "Community Clean-Up Day",
    date: "2025-03-08",
    time: "9:00 AM - 12:00 PM",
    location: "Piedmont Park",
    description:
      "Join neighbors in beautifying our community. Supplies provided. Great for families and community service hours.",
    category: "community",
  },
];
