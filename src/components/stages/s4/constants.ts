import type { LikertQuestion } from "../s2/constants";

export interface IndustryCategory {
  id: string;
  label: string;
  icon: string; // Lucide icon name
  subfields: string[];
}

export const INDUSTRY_CATEGORIES: IndustryCategory[] = [
  {
    id: "tech_digital",
    label: "Technology & Digital",
    icon: "Monitor",
    subfields: [
      "Software Development", "Data Science", "Machine Learning", "Cybersecurity",
      "Cloud Computing", "IT Support", "Systems Analysis", "Product Management",
      "UI/UX Design", "Web3", "Blockchain Development", "Network Engineering",
    ],
  },
  {
    id: "finance_business",
    label: "Finance & Business",
    icon: "TrendingUp",
    subfields: [
      "Banking", "FinTech", "Accounting", "Auditing", "Business Analysis",
      "Consulting", "Risk Management", "Investment", "Corporate Strategy",
      "Operations Management", "Entrepreneurship", "Marketing Analytics",
    ],
  },
  {
    id: "education_training",
    label: "Education & Training",
    icon: "GraduationCap",
    subfields: [
      "Teaching", "Coaching", "Mentoring", "Curriculum Design",
      "Educational Technology (EdTech)", "E-Learning", "Instructional Design",
      "Training & Development", "Career Counseling", "Learning Experience Design",
    ],
  },
  {
    id: "health_wellbeing",
    label: "Health & Wellbeing",
    icon: "HeartPulse",
    subfields: [
      "Medicine", "Nursing", "Psychology", "Counseling", "Public Health",
      "Nutrition", "Fitness", "Physical Therapy", "Occupational Therapy",
      "Mental Health", "Healthcare Administration",
    ],
  },
  {
    id: "sustainability_environment",
    label: "Sustainability & Environment",
    icon: "Leaf",
    subfields: [
      "Environmental Science", "Renewable Energy", "ESG Strategy", "Climate Policy",
      "Green Technology", "Waste Management", "Water Resource Management",
      "Sustainable Design", "Carbon Accounting", "Biodiversity Conservation",
    ],
  },
  {
    id: "creative_media",
    label: "Creative & Media",
    icon: "Palette",
    subfields: [
      "Graphic Design", "Film Production", "Animation", "Photography",
      "Journalism", "Copywriting", "Branding", "Advertising", "Marketing",
      "Music Production", "Fashion Design", "Game Design", "Digital Media",
    ],
  },
  {
    id: "engineering_manufacturing",
    label: "Engineering & Manufacturing",
    icon: "Wrench",
    subfields: [
      "Mechanical Engineering", "Electrical Engineering", "Civil Engineering",
      "Robotics", "Automation", "Smart Manufacturing", "Industrial Design",
      "Product Engineering", "Quality Control", "Materials Science",
      "Construction Management",
    ],
  },
  {
    id: "travel_hospitality",
    label: "Travel & Hospitality",
    icon: "Plane",
    subfields: [
      "Tourism Management", "Event Planning", "Customer Service",
      "Hotel Management", "Food & Beverage", "Airline Operations",
      "Travel Consulting", "Guest Relations", "Luxury Services",
    ],
  },
  {
    id: "public_sector_policy",
    label: "Public Sector & Policy",
    icon: "Landmark",
    subfields: [
      "Law", "Public Administration", "Political Science", "Urban Planning",
      "International Relations", "Government Affairs", "Civil Service",
      "Legal Research", "Public Policy Analysis", "Human Rights Advocacy",
    ],
  },
  {
    id: "communication_community",
    label: "Communication & Community",
    icon: "Users",
    subfields: [
      "Human Resources", "Public Relations", "Organizational Development",
      "Community Engagement", "Diversity & Inclusion", "Nonprofit Management",
      "Fundraising", "Stakeholder Relations", "Corporate Communications",
    ],
  },
  {
    id: "retail_consumer",
    label: "Retail & Consumer Goods",
    icon: "ShoppingBag",
    subfields: [
      "E-commerce", "Product Marketing", "Merchandising", "Customer Experience",
      "Brand Management", "Supply Operations", "Category Management",
      "Retail Strategy", "Luxury Goods", "Omnichannel Management",
    ],
  },
  {
    id: "logistics_supply_chain",
    label: "Logistics & Supply Chain",
    icon: "Truck",
    subfields: [
      "Transportation", "Procurement", "Inventory Management", "Global Trade",
      "Smart Warehousing", "Supply Chain Optimization", "Fleet Management",
      "Distribution", "Maritime Logistics", "Import/Export Operations",
    ],
  },
];

export const S4_LIKERT_QUESTIONS: LikertQuestion[] = [
  { id: "INT_F4_Q1", text: "I enjoy learning new languages or cultures.", group: "F4" },
  { id: "INT_F4_Q2", text: "I'm curious about how people work in different cultures.", group: "F4" },
  { id: "INT_F4_Q3", text: "I'd love to work in an international or cross-cultural environment.", group: "F4" },
  { id: "INT_F6_Q1", text: "I learn best by doing, not just reading.", group: "F6" },
  { id: "INT_F6_Q2", text: "Finishing a hands-on task feels more rewarding than writing a report.", group: "F6" },
  { id: "INT_F6_Q3", text: "I enjoy jobs where I can see tangible results, like building or designing.", group: "F6" },
];
