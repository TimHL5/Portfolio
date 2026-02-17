export const PERSONAL = {
  name: "Timothy Liu",
  shortName: "Tim Liu",
  initials: "TL",
  email: "timothy.liu@bc.edu",
  phone: null,
  location: "Boston, MA",
  tagline: "Builder. Founder. Creator. Maker.",
  roles: ["Builder", "Founder", "Creator", "Maker"],
  bio: "Tim Liu is a senior at Boston College studying Finance, Entrepreneurship, and Computer Science. At 18, he co-founded MLV, an edtech company that\u2019s taught 500+ students across 6 countries how to build real startups. He\u2019s interned at PwC Consulting in Boston as well as OOCL and MTR in Hong Kong. He speaks three languages, studied at UCL London, and has a habit of turning side projects into revenue-generating businesses. He\u2019s currently building MLV full time.",
  pullQuote: "The \u2018safe\u2019 path is the riskiest bet you can make.",
  stats: [
    { label: "GPA", value: 3.93, prefix: "", suffix: "", decimals: 2 },
    { label: "Students Taught", value: 500, prefix: "", suffix: "+", decimals: 0 },
    { label: "Revenue Generated", value: 50, prefix: "$", suffix: "K+", decimals: 0 },
    { label: "Content Views", value: 5, prefix: "", suffix: "M+", decimals: 0 },
    { label: "Languages Spoken", value: 3, prefix: "", suffix: "", decimals: 0 },
  ],
  socials: {
    linkedin: "https://www.linkedin.com/in/timothyhaiyiliu",
    instagram: "https://www.instagram.com/timh.liu",
    tiktok: "https://www.tiktok.com/@timh.liu",
    bookCall: "https://cal.com/timh.liu/intro",
  },
  places: [
    { name: "Boston", lat: 42.3601, lng: -71.0589, flag: "\uD83C\uDDFA\uD83C\uDDF8" },
    { name: "Hong Kong", lat: 22.3193, lng: 114.1694, flag: "\uD83C\uDDED\uD83C\uDDF0" },
    { name: "London", lat: 51.5074, lng: -0.1278, flag: "\uD83C\uDDEC\uD83C\uDDE7" },
    { name: "Vietnam", lat: 10.8231, lng: 106.6297, flag: "\uD83C\uDDFB\uD83C\uDDF3" },
    { name: "Singapore", lat: 1.3521, lng: 103.8198, flag: "\uD83C\uDDF8\uD83C\uDDEC" },
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
    caseStudy: {
      problem: "Millions of ambitious high school students in Asia want to become entrepreneurs, but existing programs are either purely theoretical or prohibitively expensive. There\u2019s no hands-on, affordable path that takes students from zero to a real, revenue-generating startup.",
      solution: "MLV designed intensive, project-based programs where students don\u2019t just learn about business \u2014 they build actual companies with real customers. Through MLV Ignite (2-week virtual accelerator) and MLV Sprint (48-hour challenge), students go from idea to MVP to first revenue, mentored by college entrepreneurs who\u2019ve done it themselves.",
      milestones: [
        { date: "Jun 2023", event: "Co-founded MLV with initial team of 5" },
        { date: "Aug 2023", event: "First cohort: 30 students, 6 startups launched" },
        { date: "Jan 2024", event: "Secured $10K pre-seed from SSC Venture Partners" },
        { date: "Jun 2024", event: "Expanded to Vietnam and Singapore" },
        { date: "Dec 2024", event: "Surpassed 500 students and $50K revenue" },
        { date: "Mar 2025", event: "Launched international case competition (460+ participants, 10 countries)" },
      ],
    },
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
    caseStudy: {
      problem: "College admissions consulting costs $5,000\u201350,000+, leaving most families without access to expert guidance. Students from non-target backgrounds are at a severe disadvantage, even if they\u2019re equally talented.",
      solution: "Reach uses AI trained on admissions data to provide personalized, expert-level guidance at 1/100th the cost. From school list building to essay review to interview prep, Reach gives every student a fighting chance at their dream school.",
      milestones: [
        { date: "Sep 2025", event: "Concept validated with 50+ student interviews" },
        { date: "Dec 2025", event: "MVP built and beta testing with early users" },
        { date: "Spring 2026", event: "Public launch at $199/year" },
      ],
    },
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
    caseStudy: {
      problem: "Most consulting prep focuses solely on case interviews. But the real bottleneck is getting the interview in the first place \u2014 students need a standout profile with genuine proof of impact, not just polished resumes.",
      solution: "This mentorship goes beyond case prep. It\u2019s strategic positioning: identifying your unique angle, building proof-of-impact projects, crafting a narrative that makes recruiters say yes. 1-on-1 coaching from someone who navigated 15+ interview rounds and landed a top choice offer.",
      milestones: [
        { date: "2024", event: "Navigated 15+ consulting interview rounds" },
        { date: "2024", event: "Landed top choice consulting offer" },
        { date: "2025", event: "Began mentoring other students through the process" },
      ],
    },
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
    location: "Vietnam",
  },
  {
    company: "Island School",
    role: "High School",
    period: "2017 \u2013 2021",
    description:
      "Attended one of Hong Kong\u2019s top international schools. Developed early interests in entrepreneurship, finance, and technology.",
    status: "completed" as const,
    location: "Hong Kong",
  },
  {
    company: "OOCL",
    role: "Corporate Finance Intern",
    period: "Summer 2023",
    description:
      "Researched 30+ international digital payment solutions for $11B shipping company. Delivered 64-slide strategy deck to senior management on financial transformation initiatives.",
    status: "completed" as const,
    location: "Hong Kong",
  },
  {
    company: "MTR Corporation",
    role: "Intern",
    period: "Summer 2022",
    description:
      "Interned at Hong Kong\u2019s major railway and property conglomerate, gaining exposure to large-scale infrastructure operations and corporate strategy.",
    status: "completed" as const,
    location: "Hong Kong",
  },
  {
    company: "Boston College",
    role: "Student \u2014 Finance, Entrepreneurship & Computer Science",
    period: "2021 \u2013 Present",
    description:
      "Pursuing a triple concentration at Boston College\u2019s Carroll School of Management. 3.93 GPA.",
    status: "active" as const,
    location: "Boston",
  },
  {
    company: "PwC",
    role: "Technology Consulting Intern",
    period: "Summer 2024",
    description:
      "Created an AI tool that increased testing efficiency by ~15%. Executed testing on 20+ IT and business process controls for Fortune 500 client for SOX compliance.",
    status: "completed" as const,
    location: "Boston",
  },
  {
    company: "Messina College",
    role: "Tutor",
    period: "Sep 2022 \u2013 Present",
    description:
      "Mentoring 20 students in underserved communities through weekly academic tutoring. Designing and leading weekly cooking lessons teaching essential life skills.",
    status: "active" as const,
    location: "Boston",
  },
  {
    company: "UCL London",
    role: "Study Abroad \u2014 Entrepreneurial Finance",
    period: "Spring 2025",
    description:
      "Studied entrepreneurial finance at University College London while building MLV remotely.",
    status: "completed" as const,
    location: "London",
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
