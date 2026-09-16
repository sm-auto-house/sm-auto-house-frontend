import { img, photo } from "@/lib/images";

/* ------------------------------------------------------------------ */
/*  Product categories: asymmetric editorial grid                      */
/* ------------------------------------------------------------------ */
export type Category = {
  id: string;
  title: string;
  description: string;
  image: string;
  /** Tailwind column/row spans for the editorial grid on lg+ */
  span: string;
  /** How tall the card sits at each breakpoint */
  height: string;
  index: string;
};

export const categories: Category[] = [
  {
    id: "engine-parts",
    title: "Engine Parts",
    description:
      "Pistons, gaskets, belts and timing components built to hold tolerance under heat and load.",
    image: img(photo.engineBelts, { w: 1400, h: 1000 }),
    span: "lg:col-span-7",
    height: "h-[26rem] sm:h-[30rem] lg:h-[34rem]",
    index: "01",
  },
  {
    id: "brake-parts",
    title: "Brake Parts",
    description:
      "Pads, discs and hydraulics tuned for consistent stopping power, lap after lap.",
    image: img(photo.frontEndDetail, { w: 1200, h: 1000 }),
    span: "lg:col-span-5",
    height: "h-[26rem] sm:h-[30rem] lg:h-[34rem]",
    index: "02",
  },
  {
    id: "electrical-parts",
    title: "Electrical Parts",
    description:
      "Batteries, alternators, sensors and lighting that keep every system talking.",
    image: img(photo.wiringLoom, { w: 1200, h: 1200 }),
    span: "lg:col-span-4",
    height: "h-[24rem] lg:h-[30rem]",
    index: "03",
  },
  {
    id: "suspension-parts",
    title: "Suspension Parts",
    description:
      "Shocks, bushes and steering components for a composed ride on any surface.",
    image: img(photo.tyreStack, { w: 1200, h: 1200 }),
    span: "lg:col-span-4",
    height: "h-[24rem] lg:h-[30rem]",
    index: "04",
  },
  {
    id: "automotive-filters",
    title: "Automotive Filters",
    description:
      "Oil, air, fuel and cabin filtration that protects the engine on every cycle.",
    image: img(photo.mechanicToolbox, { w: 1200, h: 1200 }),
    span: "lg:col-span-4",
    height: "h-[24rem] lg:h-[30rem]",
    index: "05",
  },
  {
    id: "motor-oils",
    title: "Motor Oils",
    description:
      "Fully synthetic and mineral lubricants formulated for tropical operating temperatures.",
    image: img(photo.wrenchingEngine, { w: 1200, h: 1000 }),
    span: "lg:col-span-5",
    height: "h-[24rem] lg:h-[32rem]",
    index: "06",
  },
  {
    id: "car-care",
    title: "Car Care",
    description:
      "Shampoos, polishes and ceramic coatings that hold a showroom finish.",
    image: img(photo.foamWash, { w: 1400, h: 1000 }),
    span: "lg:col-span-7",
    height: "h-[24rem] lg:h-[32rem]",
    index: "07",
  },
  {
    id: "tools-equipment",
    title: "Tools & Equipment",
    description:
      "Workshop-grade tooling and diagnostics built for daily professional use.",
    image: img(photo.precisionTool, { w: 1600, h: 900 }),
    span: "lg:col-span-12",
    height: "h-[22rem] lg:h-[26rem]",
    index: "08",
  },
];

/* ------------------------------------------------------------------ */
/*  Company statistics                                                 */
/* ------------------------------------------------------------------ */
export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 40, suffix: "+", label: "Years of Experience" },
  { value: 60, suffix: "+", label: "Global Brands" },
  { value: 1600, suffix: "+", label: "Dealer Network" },
  { value: 150, suffix: "+", label: "Team Members" },
];

/* ------------------------------------------------------------------ */
/*  Featured products: horizontal rail                                 */
/* ------------------------------------------------------------------ */
export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  spec: string;
};

export const products: Product[] = [
  {
    id: "titan-pro-5w40",
    name: "Titan Pro 5W-40",
    category: "Premium Motor Oil",
    spec: "Fully synthetic",
    image: img(photo.wrenchingEngine, { w: 900, h: 1200 }),
  },
  {
    id: "precision-brake-set",
    name: "Precision Brake Set",
    category: "Brake Components",
    spec: "Low-dust ceramic",
    image: img(photo.frontEndDetail, { w: 900, h: 1200 }),
  },
  {
    id: "forged-piston-assembly",
    name: "Forged Piston Assembly",
    category: "Engine Components",
    spec: "Heat-treated alloy",
    image: img(photo.engineBelts, { w: 900, h: 1200 }),
  },
  {
    id: "multistage-filtration",
    name: "Multi-Stage Filtration",
    category: "Automotive Filters",
    spec: "Oil · air · fuel · cabin",
    image: img(photo.mechanicHoodOpen, { w: 900, h: 1200 }),
  },
  {
    id: "ceramic-gloss-kit",
    name: "Ceramic Gloss Kit",
    category: "Car Care Products",
    spec: "9H hydrophobic",
    image: img(photo.waterSprayDetail, { w: 900, h: 1200 }),
  },
  {
    id: "workshop-service-kit",
    name: "Workshop Service Kit",
    category: "Service Products",
    spec: "Bay-ready consumables",
    image: img(photo.mechanicCloseUp, { w: 900, h: 1200 }),
  },
  {
    id: "damper-control-series",
    name: "Damper Control Series",
    category: "Suspension Parts",
    spec: "Twin-tube gas",
    image: img(photo.tyreStack, { w: 900, h: 1200 }),
  },
  {
    id: "high-output-alternator",
    name: "High-Output Alternator",
    category: "Electrical Parts",
    spec: "120A rectified",
    image: img(photo.circuitBoard, { w: 900, h: 1200 }),
  },
];

/* ------------------------------------------------------------------ */
/*  Distribution partners: placeholder wordmarks                       */
/* ------------------------------------------------------------------ */
export const brands = [
  "AXLON",
  "KRAFTEC",
  "VELORA",
  "NORDIQ",
  "PRIMEX",
  "TORQON",
  "HELVAR",
  "CASTELON",
  "MERIDIO",
  "RIVELLI",
  "DURATEQ",
  "SEIKON",
] as const;

/* ------------------------------------------------------------------ */
/*  Why choose us                                                      */
/* ------------------------------------------------------------------ */
export type Feature = {
  index: string;
  title: string;
  description: string;
  icon: "shield" | "gauge" | "truck" | "headset";
};

export const features: Feature[] = [
  {
    index: "01",
    title: "Genuine Products",
    description:
      "Carefully sourced products from trusted manufacturers, with traceable supply lines.",
    icon: "shield",
  },
  {
    index: "02",
    title: "Proven Quality",
    description:
      "Reliable components designed for performance and durability in real operating conditions.",
    icon: "gauge",
  },
  {
    index: "03",
    title: "Islandwide Distribution",
    description:
      "Reliable automotive product distribution across Sri Lanka, from Jaffna to Matara.",
    icon: "truck",
  },
  {
    index: "04",
    title: "Expert Support",
    description:
      "Professional assistance to help customers identify and fit the right solution, first time.",
    icon: "headset",
  },
];

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "dinesh",
    name: "Dinesh Fernando",
    role: "Service Manager · Colombo Auto Care",
    quote:
      "Parts arrive correctly specified and on time. That reliability is what keeps our bays turning over instead of waiting.",
    rating: 5,
    avatar: img(photo.avatarA, { w: 200, h: 200 }),
  },
  {
    id: "nadeeka",
    name: "Nadeeka Perera",
    role: "Fleet Operations · IslandLine Logistics",
    quote:
      "We run 90 vehicles across the island. Their lubricant programme cut our unplanned downtime noticeably in the first year.",
    rating: 5,
    avatar: img(photo.avatarB, { w: 200, h: 200 }),
  },
  {
    id: "roshan",
    name: "Roshan Jayawardena",
    role: "Owner · Kandy Motor Works",
    quote:
      "Their team knows the catalogue properly. I describe the fault, they identify the part. No guesswork, no returns.",
    rating: 5,
    avatar: img(photo.avatarC, { w: 200, h: 200 }),
  },
  {
    id: "aisha",
    name: "Aisha Rahman",
    role: "Procurement · Southern Transit Group",
    quote:
      "Consistent pricing, genuine stock and clear documentation. They have become the benchmark we measure suppliers against.",
    rating: 5,
    avatar: img(photo.avatarD, { w: 200, h: 200 }),
  },
];

/* ------------------------------------------------------------------ */
/*  News                                                               */
/* ------------------------------------------------------------------ */
export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
};

export const articles: Article[] = [
  {
    id: "northern-distribution",
    title: "Distribution Network Expands Across the Northern Province",
    excerpt:
      "Two new regional depots bring next-day parts availability to dealers in Jaffna, Vavuniya and Mannar.",
    category: "Company",
    date: "12 August 2026",
    image: img(photo.warehouseAisles, { w: 1200, h: 900 }),
  },
  {
    id: "synthetic-lubricants",
    title: "Why Synthetic Lubricants Matter in Tropical Climates",
    excerpt:
      "Sustained heat and humidity change how oil behaves. A look at viscosity retention and service intervals.",
    category: "Technical",
    date: "28 July 2026",
    image: img(photo.assemblyLine, { w: 1200, h: 900 }),
  },
  {
    id: "monsoon-checklist",
    title: "Preparing Your Vehicle for the Monsoon Season",
    excerpt:
      "Brakes, wipers, filtration and electrics: the eight-point check that prevents most wet-weather callouts.",
    category: "Guides",
    date: "09 July 2026",
    image: img(photo.evCharging, { w: 1200, h: 900 }),
  },
];

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */
export type Service = {
  title: string;
  description: string;
  points: string[];
  image: string;
};

export const services: Service[] = [
  {
    title: "Dealer & Workshop Supply",
    description:
      "Scheduled replenishment, catalogue access and technical documentation for trade partners island-wide.",
    points: ["Next-day dispatch", "Trade pricing tiers", "Parts identification"],
    image: img(photo.partsShopShelves, { w: 1200, h: 900 }),
  },
  {
    title: "Fleet Lubricant Programmes",
    description:
      "Oil analysis, interval planning and bulk supply built around how your vehicles actually run.",
    points: ["Usage auditing", "Bulk & drum supply", "Interval planning"],
    image: img(photo.mechanicCloseUp, { w: 1200, h: 900 }),
  },
  {
    title: "Technical Advisory",
    description:
      "Direct access to product specialists for specification, compatibility and fitment questions.",
    points: ["Specification support", "Fitment guidance", "Warranty handling"],
    image: img(photo.mechanicHoodOpen, { w: 1200, h: 900 }),
  },
];
