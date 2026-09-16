export const site = {
  name: "SM Auto House",
  legalName: "SM Auto House (Pvt) Ltd",
  tagline: "Engineered for Performance",
  signature: "Driven by Quality. Built for the Road.",
  description:
    "SM Auto House supplies genuine automotive spare parts, lubricants and vehicle products to workshops, dealers and fleets across Sri Lanka.",
  url: "https://smautohouse.lk",
  founded: 1984,
  contact: {
    phone: "+94 11 245 8800",
    phoneHref: "tel:+94112458800",
    hotline: "+94 77 245 8800",
    hotlineHref: "tel:+94772458800",
    email: "hello@smautohouse.lk",
    emailHref: "mailto:hello@smautohouse.lk",
    address: {
      line1: "No. 142, Maradana Road",
      line2: "Colombo 10",
      country: "Sri Lanka",
    },
    hours: "Mon – Sat · 8.30am – 6.00pm",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Maradana+Road+Colombo+10+Sri+Lanka",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const navigation: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Brands", href: "#brands" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export const footerProductLinks: NavItem[] = [
  { label: "Engine Parts", href: "#products" },
  { label: "Brake Parts", href: "#products" },
  { label: "Electrical Parts", href: "#products" },
  { label: "Suspension Parts", href: "#products" },
  { label: "Automotive Filters", href: "#products" },
  { label: "Motor Oils", href: "#products" },
  { label: "Car Care", href: "#products" },
  { label: "Tools & Equipment", href: "#products" },
];

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
] as const;
