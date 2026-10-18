// Centralized mock data — every screen reads from here so the demo stays consistent.

export type Stage = "Operator" | "Builder" | "Founder" | "Backer";
export const STAGES: { name: Stage; line: string }[] = [
  { name: "Operator", line: "Learn. Execute. Create impact." },
  { name: "Builder", line: "Explore. Validate. Find your people." },
  { name: "Founder", line: "Build. Launch. Create value." },
  { name: "Backer", line: "Give back. Support the next generation." },
];

export const me = {
  name: "Jens Fischer",
  initials: "JF",
  role: "Founders Associate Intern",
  team: "CEO Office",
  city: "New York",
  stage: "Builder" as Stage,
  strengths: ["Strategy", "GTM", "Operations"],
};

export type Member = {
  id: string;
  lookingFor?: string[];
  name: string;
  initials: string;
  title: string;
  badge: string;
  city: string;
  stage: Stage;
  type: "People" | "Mentors" | "Founders" | "Backers";
  skills: string[];
  helpWith: string[];
  openTo: string[];
  match?: number;
  impact?: { intros: number; mentored: number; backed: number; playbooks: number };
  canIntroduce?: string[];
  intro?: { to: string; toTitle: string; message: string };
};

export const members: Member[] = [
  {
    id: "felix-weber",
    name: "Felix Weber",
    initials: "FW",
    title: "AI Engineer · Lio",
    badge: "Operator → Builder",
    city: "New York",
    stage: "Builder",
    type: "People",
    skills: ["AI", "Full Stack", "Consumer"],
    helpWith: ["Technical architecture", "AI infrastructure"],
    openTo: ["Co-founding", "Weekend builds"],
    match: 93,
    impact: { intros: 2, mentored: 1, backed: 0, playbooks: 1 },
    canIntroduce: ["engineers", "AI researchers"],
    intro: {
      to: "Priya Nair",
      toTitle: "Staff Engineer · ex-Spotify",
      message:
        "I'm validating Matchmaker, a personalized sports discovery product, and would love Priya's take on recommendation architecture.",
    },
  },
  {
    id: "sarah-klein",
    name: "Sarah Klein",
    initials: "SK",
    title: "Former GTM @ Lio",
    badge: "Founder & Angel",
    city: "New York",
    stage: "Backer",
    type: "Backers",
    skills: ["GTM", "US Expansion", "Fundraising"],
    helpWith: ["US Expansion", "Enterprise GTM", "Fundraising", "Hiring"],
    openTo: ["Mentorship", "Angel Investing", "Customer Intros"],
    match: 81,
    impact: { intros: 12, mentored: 6, backed: 2, playbooks: 3 },
    canIntroduce: ["investors", "operators", "founders"],
    intro: {
      to: "Alex Morgan",
      toTitle: "Consumer VC",
      message:
        "I'm currently validating Matchmaker, a personalized sports discovery product, and would love Alex's perspective on consumer behavior and early distribution.",
    },
  },
  {
    id: "anna-schmidt",
    name: "Anna Schmidt",
    initials: "AS",
    title: "Former Product @ Lio",
    badge: "Founder · Kivo AI",
    city: "Berlin",
    stage: "Founder",
    type: "Founders",
    skills: ["Consumer Product", "AI", "Design"],
    helpWith: ["Consumer product", "Onboarding", "Retention"],
    openTo: ["Mentorship", "Product feedback"],
    match: 88,
    impact: { intros: 5, mentored: 4, backed: 0, playbooks: 2 },
    canIntroduce: ["designers", "consumer founders"],
    intro: {
      to: "Lena Brandt",
      toTitle: "Head of Product · Strava",
      message:
        "I'm validating Matchmaker and would love Lena's view on habit loops for sports fans.",
    },
  },
  {
    id: "max-richter",
    name: "Max Richter",
    initials: "MR",
    title: "Former GTM @ Lio",
    badge: "Founder · Northpass",
    city: "New York",
    stage: "Founder",
    type: "Mentors",
    skills: ["GTM", "US Expansion", "Sales"],
    helpWith: ["US go-to-market", "First sales hires"],
    openTo: ["Mentorship", "Customer Intros"],
    match: 72,
    impact: { intros: 9, mentored: 5, backed: 1, playbooks: 2 },
    canIntroduce: ["US customers", "sales leaders"],
    intro: {
      to: "Jordan Lee",
      toTitle: "VP Partnerships · DAZN",
      message:
        "I'm building Matchmaker and would value Jordan's perspective on sports media partnerships.",
    },
  },
  {
    id: "david-okafor",
    name: "David Okafor",
    initials: "DO",
    title: "Former Partnerships @ Lio",
    badge: "Sports & Media",
    city: "London",
    stage: "Founder",
    type: "Mentors",
    skills: ["Sports", "Media Rights", "Partnerships"],
    helpWith: ["Sports rights landscape", "Broadcaster intros"],
    openTo: ["Mentorship", "Advisory"],
    match: 86,
    impact: { intros: 7, mentored: 3, backed: 1, playbooks: 1 },
    canIntroduce: ["leagues", "broadcasters"],
    intro: {
      to: "Chris Hall",
      toTitle: "Digital Lead · Premier League",
      message:
        "I'm validating Matchmaker and would love Chris's take on how fans discover fixtures today.",
    },
  },
  {
    id: "mira-tanaka",
    name: "Mira Tanaka",
    initials: "MT",
    title: "Former Finance @ Lio",
    badge: "Angel",
    city: "Munich",
    stage: "Backer",
    type: "Backers",
    skills: ["Fundraising", "Finance", "Fintech"],
    helpWith: ["Pre-seed rounds", "Financial modelling"],
    openTo: ["Angel Investing", "Mentorship"],
    match: 64,
    impact: { intros: 10, mentored: 8, backed: 4, playbooks: 1 },
    canIntroduce: ["angels", "seed funds"],
    intro: {
      to: "Tom Becker",
      toTitle: "Partner · Seed fund",
      message:
        "I'm validating Matchmaker and would love Tom's view on what pre-seed investors need to see.",
    },
  },
];
export const jensMember: Member = {
  id: "jens-fischer",
  name: me.name,
  initials: me.initials,
  title: "Founders Associate Intern · Lio",
  badge: "Operator → Builder",
  city: me.city,
  stage: "Builder",
  type: "People",
  skills: ["Strategy", "Operations", "GTM", "Consumer Research"],
  helpWith: ["Strategy", "Operations", "GTM", "Consumer Research"],
  lookingFor: ["Technical Co-Founder", "Sports / Media Expertise"],
  openTo: ["Helping other builders", "User testing", "Introductions"],
  impact: { intros: 0, mentored: 0, backed: 0, playbooks: 0 },
};
export const getMember = (id: string) =>
  id === jensMember.id ? jensMember : members.find((m) => m.id === id);

export const matchmaker = {
  name: "Matchmaker",
  oneLiner: "Personalized sports discovery for fragmented fans.",
  stage: "Validating",
  problem:
    "Sports discovery is fragmented across leagues, streaming platforms, schedules and social media.",
  hypothesis: ["Fans do not need more sports content.", "They need better prioritization."],
  needs: [
    "Technical Co-Founder",
    "Consumer Product Feedback",
    "Sports / Media Expertise",
    "Infrastructure",
  ],
  thesis: [
    { k: "What matters", v: "The handful of events that actually matter to you this week." },
    { k: "Why it matters", v: "Context: stakes, storylines, rivalries, standings." },
    { k: "When it happens", v: "One calendar across every league and time zone." },
    { k: "Where to watch", v: "The exact service, channel or stream — no searching." },
  ],
};

// Jens's strongest co-founder match, shown on Project and referenced from Home.
export const founderMatch = {
  member: "felix-weber",
  score: 93,
  matches: 3,
  skills: ["Engineering", "AI", "Product"],
  shared: ["Consumer Technology", "Sports", "Building ambition"],
  request: "technical-cofounder",
};

export const pulse = [
  { who: "anna-schmidt", what: "launched Kivo AI", meta: "Former Product @ Lio", when: "2h" },
  {
    who: "felix-weber",
    what: "is looking for a commercial co-founder",
    meta: "Engineering @ Lio",
    when: "5h",
  },
  {
    who: "max-richter",
    what: "shared a US Expansion Playbook",
    meta: "Former GTM @ Lio",
    when: "1d",
  },
  {
    who: "sarah-klein",
    what: "made 3 warm customer intros this week",
    meta: "Founder & Backer",
    when: "2d",
  },
];

export type Playbook = {
  id: string;
  title: string;
  author: string;
  topic: string;
  read: number;
  tags: string[];
  sections: { t: string; b: string }[];
  helpers: string[];
};
export const playbooks: Playbook[] = [
  {
    id: "europe-to-us",
    title: "From Europe to your first US customers",
    author: "sarah-klein",
    topic: "US Expansion",
    read: 12,
    tags: ["GTM", "US Expansion"],
    helpers: ["sarah-klein", "max-richter", "anna-schmidt"],
    sections: [
      {
        t: "Start founder-led",
        b: "Your first ten US customers should hear the story from you. No agency, no first sales hire — the learning is the asset.",
      },
      {
        t: "Narrow your ICP",
        b: "Pick one segment, one buyer, one pain. A wide US funnel looks like traction and behaves like noise.",
      },
      {
        t: "Optimize for learning, not scale",
        b: "Run fast loops: five calls, one change, five more calls. Measure what you learned, not pipeline volume.",
      },
      {
        t: "Build warm paths",
        b: "Cold outbound in the US is crowded. Map every alumnus, angel and customer who can make a credible intro.",
      },
      {
        t: "Hire only after repeatability",
        b: "When three deals close for the same reason, write it down. Then hire someone to run that playbook.",
      },
    ],
  },
  {
    id: "pilot-to-enterprise",
    title: "From pilot to enterprise rollout",
    author: "max-richter",
    topic: "GTM",
    read: 9,
    tags: ["GTM", "Enterprise"],
    helpers: ["max-richter", "sarah-klein"],
    sections: [
      {
        t: "Define success before the pilot",
        b: "Agree on one metric and a decision date in writing.",
      },
      {
        t: "Find the second champion",
        b: "Pilots die when the one internal sponsor changes roles.",
      },
      {
        t: "Price the rollout early",
        b: "Anchor the enterprise number during the pilot, not after.",
      },
    ],
  },
  {
    id: "startup-stack",
    title: "Choosing your early startup stack",
    author: "felix-weber",
    topic: "Engineering",
    read: 7,
    tags: ["Engineering", "Product"],
    helpers: ["felix-weber", "anna-schmidt"],
    sections: [
      {
        t: "Buy, don't build, the boring parts",
        b: "Auth, payments, hosting and email are solved. Spend your hours on what's unique.",
      },
      {
        t: "Optimize for speed of change",
        b: "Pick tools that make it cheap to be wrong next month.",
      },
      {
        t: "Keep one source of truth",
        b: "One database, one analytics pipeline, one place for decisions.",
      },
    ],
  },
  {
    id: "us-incorporation",
    title: "US incorporation: what actually matters",
    author: "mira-tanaka",
    topic: "Legal",
    read: 10,
    tags: ["Legal", "Fundraising", "US Expansion"],
    helpers: ["mira-tanaka", "sarah-klein"],
    sections: [
      {
        t: "Delaware C-Corp, usually",
        b: "If you plan to raise from US investors, it's the default for a reason.",
      },
      {
        t: "Clean cap table from day one",
        b: "Founder vesting, 83(b) elections and IP assignment — do them now.",
      },
      {
        t: "Get a warm intro to counsel",
        b: "Startup-focused counsel can defer fees; a warm intro helps.",
      },
    ],
  },
  {
    id: "first-hires",
    title: "Your first five hires",
    author: "anna-schmidt",
    topic: "Hiring",
    read: 8,
    tags: ["Hiring"],
    helpers: ["anna-schmidt", "max-richter"],
    sections: [
      {
        t: "Hire for slope",
        b: "Early hires should grow faster than the company. Bet on learning speed over a perfect CV.",
      },
      {
        t: "Founders sell the first five",
        b: "Nobody explains the mission better than you. Run every first conversation yourself and close in person.",
      },
      {
        t: "Generalists before specialists",
        b: "Your first engineer will also do support, analytics and infra. Hire people who enjoy that range.",
      },
      {
        t: "Use the Mafia as your bench",
        b: "Former Lio operators already know the pace. Ask alumni for referrals before you open a public role.",
      },
    ],
  },
  {
    id: "pre-seed",
    title: "Raising a pre-seed without a network",
    author: "mira-tanaka",
    topic: "Fundraising",
    read: 11,
    tags: ["Fundraising"],
    helpers: ["mira-tanaka", "sarah-klein"],
    sections: [
      {
        t: "Start with the Mafia",
        b: "Former operators back what they understand. Begin with alumni angels who saw you work.",
      },
      {
        t: "Raise on evidence, not a deck",
        b: "Fifteen sharp user interviews and a working prototype beat a polished narrative with no signal.",
      },
      {
        t: "Run a tight two-week process",
        b: "Line up every first meeting in the same window. Momentum is the only leverage you have at pre-seed.",
      },
      {
        t: "Keep the terms boring",
        b: "Standard post-money SAFEs, a clear cap and no side letters. Save your energy for building.",
      },
    ],
  },
];
playbooks.push({
  id: "user-discovery",
  title: "How to run early user discovery",
  author: "anna-schmidt",
  topic: "Product",
  read: 6,
  tags: ["Product"],
  helpers: ["anna-schmidt", "felix-weber"],
  sections: [
    {
      t: "Start with their last real experience",
      b: "Ask a sports fan to walk you through the last time they decided what to watch. Observe the workarounds, not their opinions about your idea.",
    },
    {
      t: "Keep the prototype out of the first half",
      b: "Understand the problem before showing your solution. Ask what they missed, how often it happens and what they do today.",
    },
    {
      t: "Look for commitment",
      b: "End with a concrete next step: a second session, a prototype test or an introduction to another fan. Record behavior and demand signals after every interview.",
    },
  ],
});
export const getPlaybook = (id: string) => playbooks.find((p) => p.id === id);
export const PLAYBOOK_CATEGORIES = [
  "GTM",
  "Product",
  "Engineering",
  "Fundraising",
  "Hiring",
  "Legal",
  "US Expansion",
];

export type Tool = {
  name: string;
  label: "LIO EXPERIENCE" | "MAFIA RECOMMENDED";
  section: string;
  use: string;
  experts: string[];
  why: string;
  cta: "Ask a Founder" | "Find an Expert" | "View Playbook";
};
export const tools: Tool[] = [
  {
    name: "Vercel",
    label: "MAFIA RECOMMENDED",
    section: "Infrastructure",
    use: "Frontend hosting & previews",
    experts: ["felix-weber", "anna-schmidt"],
    why: "Ship on day one; preview every change.",
    cta: "Ask a Founder",
  },
  {
    name: "Supabase",
    label: "MAFIA RECOMMENDED",
    section: "Infrastructure",
    use: "Database, auth, storage",
    experts: ["felix-weber"],
    why: "A real Postgres backend in an afternoon.",
    cta: "View Playbook",
  },
  {
    name: "Stripe",
    label: "MAFIA RECOMMENDED",
    section: "Product",
    use: "Payments & billing",
    experts: ["anna-schmidt", "mira-tanaka"],
    why: "The default for charging customers anywhere.",
    cta: "Ask a Founder",
  },
  {
    name: "Microsoft Teams",
    label: "LIO EXPERIENCE",
    section: "Operations",
    use: "Internal communication",
    experts: ["max-richter"],
    why: "Know how enterprise buyers collaborate day-to-day.",
    cta: "Find an Expert",
  },
  {
    name: "SAP / Ariba",
    label: "LIO EXPERIENCE",
    section: "GTM",
    use: "Enterprise procurement",
    experts: ["sarah-klein", "max-richter"],
    why: "Understand how large customers actually buy.",
    cta: "Find an Expert",
  },
  {
    name: "PostHog",
    label: "MAFIA RECOMMENDED",
    section: "Product",
    use: "Product analytics",
    experts: ["anna-schmidt"],
    why: "Analytics, flags and replays in one place.",
    cta: "Ask a Founder",
  },
  {
    name: "HubSpot",
    label: "MAFIA RECOMMENDED",
    section: "GTM",
    use: "CRM for early pipeline",
    experts: ["max-richter"],
    why: "Enough CRM without a RevOps hire.",
    cta: "View Playbook",
  },
];

export const partners = [
  {
    name: "Orrick",
    category: "Legal",
    best: ["US incorporation", "Financing rounds", "Employee equity", "Cross-border structuring"],
    contact: "sarah-klein",
  },
  {
    name: "Carta",
    category: "Equity",
    best: ["Cap table management", "409A valuations"],
    contact: "mira-tanaka",
  },
  {
    name: "Pilot",
    category: "Finance & Ops",
    best: ["Bookkeeping", "Tax filings", "CFO services"],
    contact: "mira-tanaka",
  },
];

// Members whose intro targets are Matchmaker's most likely first partners.
export const designPartnerPaths = ["max-richter", "david-okafor", "anna-schmidt"];

export const nextMoves = [
  {
    title: "Find your technical counterpart",
    meta: "3 founder matches",
    link: { to: "/build/matchmaker", hash: "founder-matching" },
  },
  {
    title: "Pressure-test Matchmaker",
    meta: "Anna Schmidt · consumer product",
    link: { to: "/network/$memberId", params: { memberId: "anna-schmidt" } },
  },
  {
    title: "Build your stack",
    meta: "7 battle-tested recommendations",
    link: { to: "/build/launchpad/stack" },
  },
  { title: "Founder Dinner NYC", meta: "18 Mafia members attending", link: null },
] as const;
