export const PERSONAL = {
  name: "Timothy Liu",
  shortName: "Tim Liu",
  initials: "TL",
  email: "timothy.liu@bc.edu",
  phone: null,
  location: "Boston, MA",
  tagline: "Builder. Founder. Consultant. Maker.",
  roles: ["Builder", "Founder", "Consultant", "Maker"],
  bio: "Tim Liu is a senior at Boston College studying Finance, Entrepreneurship, and Computer Science. At 21, he co-founded MLV \u2014 an edtech company that\u2019s taught 500+ students across 6 countries how to build real startups. He\u2019s interned at PwC (where he built an AI tool that improved SOX testing efficiency by 15%) and OOCL in Hong Kong. He speaks three languages, studied at UCL London, and has a habit of turning side projects into revenue-generating businesses. He\u2019s currently building MLV full time.",
  pullQuote: "I don\u2019t wait for permission to build things.",
  stats: [
    { label: "GPA", value: 3.93, prefix: "", suffix: "", decimals: 2 },
    { label: "Students Taught", value: 500, prefix: "", suffix: "+", decimals: 0 },
    { label: "Revenue Generated", value: 50, prefix: "$", suffix: "K+", decimals: 0 },
    { label: "Countries", value: 6, prefix: "", suffix: "", decimals: 0 },
    { label: "Languages Spoken", value: 3, prefix: "", suffix: "", decimals: 0 },
  ],
  socials: {
    linkedin: "https://linkedin.com/in/timothyhaiyiliu",
    instagram: "https://instagram.com/timhliu",
    tiktok: "https://tiktok.com/@timhliu",
    bookCall: "https://cal.com/timh.liu/intro",
  },
  places: [
    { name: "Boston", lat: 42.3601, lng: -71.0589 },
    { name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
    { name: "London", lat: 51.5074, lng: -0.1278 },
    { name: "Ho Chi Minh City", lat: 10.8231, lng: 106.6297 },
    { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  ],
};

export const VENTURES = [
  {
    name: "MLV",
    fullName: "Makers Lab Ventures",
    tagline: "Asia\u2019s premier high school entrepreneurship program",
    role: "Co-Founder & CFO",
    description:
      "MLV teaches high school students across Asia how to build real startups through intensive, project-based programs. Students don\u2019t just learn about business \u2014 they launch actual companies.",
    metrics: [
      { label: "Students", value: "500+" },
      { label: "Startups Launched", value: "50+" },
      { label: "Cohorts", value: "7" },
      { label: "Countries", value: "6" },
      { label: "Revenue", value: "$50K+" },
    ],
    programs: [
      { name: "MLV Ignite", description: "2-week virtual startup accelerator" },
      { name: "MLV Sprint", description: "48-hour startup challenge weekend" },
    ],
    markets: ["Hong Kong", "Vietnam", "Singapore"],
    link: "https://mlvignite.com",
    press: "Featured in The Heights (Boston College)",
    status: "active" as const,
    accentColor: "#FF9500",
  },
  {
    name: "Reach Admissions",
    fullName: "Reach Admissions",
    tagline: "AI-powered college admissions guidance",
    role: "Co-Founder",
    description:
      "An AI platform that democratizes college admissions guidance, making expert-level advice accessible at a fraction of traditional consulting costs.",
    metrics: [
      { label: "Launch", value: "Spring 2026" },
      { label: "Model", value: "$199/yr" },
    ],
    programs: [],
    markets: [],
    cofounders: ["Ethan Foreman", "Alex Amaral", "Dean Kaduboski"],
    link: "https://www.reachadmissions.app/",
    press: "",
    status: "building" as const,
    accentColor: "#00C9A7",
  },
  {
    name: "Consulting Mentorship",
    fullName: "Consulting Mentorship",
    tagline: "Land consulting offers by building an unforgettable profile",
    role: "Founder & Mentor",
    description:
      "1-on-1 coaching for college students targeting consulting careers. Not generic case prep \u2014 strategic positioning, story-building, and proof-of-impact development.",
    metrics: [
      { label: "Interview Rounds Navigated", value: "15+" },
      { label: "Result", value: "Top Choice Offer" },
    ],
    programs: [],
    markets: [],
    link: "https://cal.com/timh.liu/intro",
    press: "",
    status: "active" as const,
    accentColor: "#6366F1",
  },
];

export const EXPERIENCE = [
  {
    company: "MLV",
    role: "Co-Founder & CFO",
    period: "2023 \u2013 Present",
    description:
      "Building MLV full time \u2014 scaled edtech startup to $50K+ revenue serving 500+ students across Asia.",
    status: "active" as const,
  },
  {
    company: "Boston College",
    role: "Data Analyst \u2014 Center for Corporate Citizenship",
    period: "2024 \u2013 Present",
    description:
      "Leading technology transformation projects for the research center.",
    status: "active" as const,
  },
  {
    company: "PwC",
    role: "Technology Consulting Intern",
    period: "Summer 2024",
    description:
      "Built an AI tool that improved SOX testing efficiency by 15%.",
    status: "completed" as const,
  },
  {
    company: "OOCL",
    role: "Strategy Intern \u2014 Hong Kong",
    period: "Summer 2023",
    description:
      "Analyzed payment capabilities and cash management strategies across 3 Asian banks.",
    status: "completed" as const,
  },
  {
    company: "UCL London",
    role: "Study Abroad \u2014 Entrepreneurial Finance",
    period: "Spring 2025",
    description:
      "Studied entrepreneurial finance at University College London while building MLV remotely.",
    status: "completed" as const,
  },
];

export const SKILLS = {
  programming: ["Python", "R", "Java", "SQL", "JavaScript", "HTML/CSS"],
  tools: ["Advanced Excel", "Tableau", "Bloomberg Terminal", "Figma", "Git"],
  business: [
    "Financial Modeling",
    "LBO Analysis",
    "M&A",
    "Consulting Frameworks",
    "Product Management",
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Mandarin", level: "Fluent" },
    { name: "Cantonese", level: "Fluent" },
  ],
};

export const LEADERSHIP = [
  { title: "Co-President", org: "BC Consulting Club" },
  { title: "Member", org: "Alpha Sigma Nu (Jesuit Honor Society)" },
  { title: "Leader", org: "BC Cooking Club" },
  { title: "Winner", org: "AlphaSights Case Challenge" },
  { title: "Member", org: "Fulton Leadership Society" },
  { title: "Grant Recipient", org: "Winston Center \u2014 ASU+GSV AIR Show" },
];

export const EDUCATION = {
  school: "Boston College \u2014 Carroll School of Management",
  degree: "Finance & Entrepreneurship, Computer Science Minor",
  gpa: "3.93",
  graduation: "2026",
};

export const NAV_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "ventures", label: "Ventures" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "leadership", label: "Leadership" },
  { id: "contact", label: "Contact" },
];
