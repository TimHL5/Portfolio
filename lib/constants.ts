export const PERSONAL = {
  name: "Timothy Liu",
  shortName: "Tim Liu",
  initials: "TL",
  email: "timothy.liu@bc.edu",
  phone: null,
  location: "Boston, MA",
  tagline: "Builder. Founder. Creator. Maker.",
  roles: ["Builder", "Founder", "Creator", "Maker"],
  bio: "Tim Liu is a senior at Boston College studying Finance, Entrepreneurship, and Computer Science. At 21, he co-founded MLV \u2014 an edtech company that\u2019s taught 500+ students across 6 countries how to build real startups. He\u2019s interned at PwC (where he built an AI tool that improved SOX testing efficiency by 15%) and OOCL in Hong Kong. He speaks three languages, studied at UCL London, and has a habit of turning side projects into revenue-generating businesses. He\u2019s currently building MLV full time.",
  pullQuote: "I don\u2019t wait for permission to build things.",
  stats: [
    { label: "GPA", value: 3.93, prefix: "", suffix: "", decimals: 2 },
    { label: "Students Taught", value: 500, prefix: "", suffix: "+", decimals: 0 },
    { label: "Revenue Generated", value: 50, prefix: "$", suffix: "K+", decimals: 0 },
    { label: "Content Views", value: 5, prefix: "", suffix: "M+", decimals: 0 },
    { label: "Languages Spoken", value: 3, prefix: "", suffix: "", decimals: 0 },
  ],
  socials: {
    linkedin: "https://www.linkedin.com/in/timothyhaiyiliu",
    instagram: "https://www.instagram.com/timhliu",
    tiktok: "https://www.tiktok.com/@timhliu",
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
    tagline: "AI-powered college admissions guidance",
    role: "Co-Founder",
    description:
      "An AI platform that democratizes college admissions guidance, making expert-level advice accessible at a fraction of traditional consulting costs.",
    metrics: [
      { label: "Launch", value: "Spring 2026" },
      { label: "Model", value: "$199/yr" },
    ],
    cofounders: ["Ethan Foreman", "Alex Amaral", "Dean Kaduboski"],
    link: "https://www.reachadmissions.app/",
    status: "building" as const,
    accentColor: "#00C9A7",
  },
  {
    name: "Consulting Mentorship",
    tagline: "Land consulting offers by building an unforgettable profile",
    role: "Founder & Mentor",
    description:
      "1-on-1 coaching for college students targeting consulting careers. Not generic case prep \u2014 strategic positioning, story-building, and proof-of-impact development.",
    metrics: [
      { label: "Interview Rounds Navigated", value: "15+" },
      { label: "Result", value: "Top Choice Offer" },
    ],
    link: "https://cal.com/timh.liu/intro",
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
      "Building MLV full time \u2014 scaled edtech startup with team of 50 from concept to $50K+ in revenue. Secured $10K pre-seed from SSC Venture Partners. Launched international case competition with 460+ participants across 10 countries.",
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
      "Created an AI tool that increased testing efficiency by ~15%. Executed testing on 20+ IT and business process controls for Fortune 500 client for SOX compliance.",
    status: "completed" as const,
  },
  {
    company: "OOCL",
    role: "Corporate Finance Intern \u2014 Hong Kong",
    period: "Summer 2023",
    description:
      "Researched 30+ international digital payment solutions for $11B shipping company. Delivered 64-slide strategy deck to senior management on financial transformation initiatives.",
    status: "completed" as const,
  },
  {
    company: "Messina College",
    role: "Volunteer Success Coach",
    period: "Sep 2022 \u2013 Present",
    description:
      "Mentored 20 students in underserved communities through weekly academic tutoring. Designed and led weekly cooking lessons teaching essential life skills.",
    status: "active" as const,
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
  tools: ["Advanced Excel", "PowerPoint", "Tableau", "Bloomberg Terminal", "Figma", "Git", "Video Editing"],
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
  { title: "Executive Board", org: "BC Cooking Club" },
  { title: "Winner", org: "AlphaSights Case Challenge" },
  { title: "Runner-Up", org: "Templeton Business Ethics Case Competition" },
  { title: "Professional Development Co-Chair", org: "Fulton Leadership Society" },
  { title: "Grant Recipient", org: "Winston Center \u2014 ASU+GSV AIR Show" },
];

export const EDUCATION = {
  school: "Boston College \u2014 Carroll School of Management",
  degree: "B.S. in Management (Finance & Entrepreneurship), Computer Science Minor",
  gpa: "3.93",
  graduation: "2026",
  honors: "Dean's List First Honors, Alpha Sigma Nu Honor Society",
  ib: "45/45 (top 0.5% worldwide)",
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
