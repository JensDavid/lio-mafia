import felix from "@/assets/portraits/felix-weber.jpg";
import sarah from "@/assets/portraits/sarah-klein.jpg";
import anna from "@/assets/portraits/anna-schmidt.jpg";
import max from "@/assets/portraits/max-richter.jpg";
import david from "@/assets/portraits/david-okafor.jpg";
import mira from "@/assets/portraits/mira-tanaka.jpg";
import { matchmaker } from "./data";

export const portraits: Record<string, string> = {
  "felix-weber": felix,
  "sarah-klein": sarah,
  "anna-schmidt": anna,
  "max-richter": max,
  "david-okafor": david,
  "mira-tanaka": mira,
};
export const journeyCopy = [
  {
    title: "Learn by doing.",
    description:
      "Work alongside exceptional operators, build hard skills and learn how a high-growth company actually scales.",
  },
  {
    title: "Turn curiosity into something real.",
    description:
      "Explore ideas, find complementary people and use the Mafia’s network and knowledge to validate what is worth building.",
  },
  {
    title: "Go from project to company.",
    description:
      "Access talent, customers, infrastructure, capital and trusted partners to get off the ground faster.",
  },
  {
    title: "Make the next generation stronger.",
    description:
      "Mentor builders, make introductions, invest, hire and share what you learned along the way.",
  },
];
// Intros and coffee suggestions Jens has started; they stay visible until answered.
export type OpenLoop = {
  id: string;
  kind: "intro" | "connect";
  via: string;
  to: string;
  detail: string;
  when: string;
};
export const initialLoops: OpenLoop[] = [
  {
    id: "loop-premier-league",
    kind: "intro",
    via: "david-okafor",
    to: "Chris Hall",
    detail: "Digital Lead · Premier League",
    when: "2 days ago",
  },
];
export type Reply = { id: string; author: string; text: string; when: string };
export type CommunityRequest = {
  id: string;
  author: string;
  when: string;
  category: string;
  text: string;
  replies: Reply[];
};
export const initialRequests: CommunityRequest[] = [
  {
    id: "commercial-cofounder",
    author: "felix-weber",
    when: "2h ago",
    category: "Co-founders",
    text: "Looking for a commercial co-founder for an AI infrastructure idea.",
    replies: [
      {
        id: "r1",
        author: "max-richter",
        text: "Happy to compare notes on the commercial side. Who is your first customer?",
        when: "1h ago",
      },
    ],
  },
  {
    id: "spotify-intro",
    author: "sarah-klein",
    when: "4h ago",
    category: "Introductions",
    text: "Does anyone have a warm intro to someone at Spotify Partnerships?",
    replies: [
      {
        id: "r2",
        author: "david-okafor",
        text: "I have a former colleague there — send me a little context and I can make an intro.",
        when: "2h ago",
      },
    ],
  },
  {
    id: "seed-deck",
    author: "max-richter",
    when: "5h ago",
    category: "Feedback",
    text: "Looking for feedback on my seed deck.",
    replies: [
      {
        id: "r3",
        author: "mira-tanaka",
        text: "Happy to review the financial model and fundraising narrative.",
        when: "3h ago",
      },
    ],
  },
  {
    id: "scaling-supabase",
    author: "anna-schmidt",
    when: "Yesterday",
    category: "Engineering",
    text: "Does anyone have experience scaling Supabase?",
    replies: [
      {
        id: "r4",
        author: "felix-weber",
        text: "Used it in two side projects — happy to chat.",
        when: "Yesterday",
      },
      {
        id: "r5",
        author: "anna-schmidt",
        text: "I’d probably use Firebase instead for this use case because the offline experience matters to our users. Curious how you handled that.",
        when: "Yesterday",
      },
    ],
  },
  {
    id: "landing-feedback",
    author: "mira-tanaka",
    when: "Yesterday",
    category: "Feedback",
    text: "Looking for feedback on my landing page.",
    replies: [],
  },
  {
    id: "sports-intro",
    author: "david-okafor",
    when: "2 days ago",
    category: "Introductions",
    text: "Any warm path to ESPN or DAZN?",
    replies: [
      {
        id: "r6",
        author: "max-richter",
        text: "I can introduce you to Jordan at DAZN. What are you hoping to explore?",
        when: "Yesterday",
      },
    ],
  },
  {
    id: "technical-cofounder",
    author: "jens-fischer",
    when: "2 days ago",
    category: "Co-founders",
    text: "Looking for a technical co-founder for Matchmaker, a personalized sports discovery product.",
    replies: [
      {
        id: "r7",
        author: "felix-weber",
        text: "This sounds interesting. I’d love to see the prototype and hear what you learned from the first interviews.",
        when: "Yesterday",
      },
    ],
  },
];
export type CommunityEvent = {
  id: string;
  title: string;
  date: string;
  iso: string;
  time: string;
  city: string;
  description: string;
  attending: number;
  members: string[];
  host?: string;
};
export const communityEvents: CommunityEvent[] = [
  {
    id: "founder-dinner",
    title: "Founder Dinner NYC",
    date: "Oct 29",
    iso: "2026-10-29",
    time: "19:00",
    city: "New York",
    description:
      "Private dinner in the West Village. Consumer products in crowded markets, honest founder stories and good company.",
    attending: 18,
    members: ["sarah-klein", "felix-weber", "max-richter", "anna-schmidt", "david-okafor"],
  },
  {
    id: "builder-breakfast",
    title: "Builder Breakfast · Berlin",
    date: "Nov 4",
    iso: "2026-11-04",
    time: "08:30",
    city: "Berlin",
    description:
      "AI Builders Berlin: prototypes, early user insights and conversations over breakfast.",
    attending: 12,
    members: ["anna-schmidt", "felix-weber", "mira-tanaka"],
  },
  {
    id: "us-office-hours",
    title: "Office Hours: US GTM",
    date: "Nov 6",
    iso: "2026-11-06",
    time: "16:00",
    city: "Online",
    description:
      "US Expansion Office Hours with Sarah Klein. Bring your questions about first customers and founder-led sales.",
    attending: 8,
    members: ["sarah-klein", "max-richter", "mira-tanaka"],
    host: "sarah-klein",
  },
];
export type FounderStage = {
  name: string;
  purpose: string;
  goal: string;
  focus: string[];
  tasks: string[];
  completed: number;
  action: string;
  why: string;
};
export const founderStages: FounderStage[] = [
  {
    name: "Exploring",
    purpose: "Find a problem worth solving.",
    goal: "Find a meaningful problem at the intersection of your experience and curiosity.",
    focus: ["Problem thesis", "Founder-market fit", "Idea exploration", "Early feedback"],
    tasks: [
      "Write a problem thesis",
      "Map your founder-market fit",
      "Explore three ideas",
      "Collect early feedback",
    ],
    completed: 4,
    action: "Choose one problem to validate.",
    why: "A focused thesis makes the next learning loop more useful.",
  },
  {
    name: "Validating",
    purpose: "Prove people actually care.",
    goal: "Prove that sports fans experience a meaningful discovery problem before spending time building.",
    focus: ["User interviews", "Prototype", "Demand signals", "Co-founder search"],
    tasks: [
      "Define initial problem hypothesis",
      "Build clickable prototype",
      "Conduct first 5 user interviews",
      "Complete 15 user interviews",
      "Validate willingness to use",
      "Find technical counterpart",
    ],
    completed: 3,
    action: "Run 10 structured user interviews.",
    why: "You have a clear hypothesis but not enough evidence yet to justify moving into Build.",
  },
  {
    name: "Building",
    purpose: "Turn validated demand into a product.",
    goal: "Ship a focused MVP and learn from your first active users.",
    focus: ["MVP", "Technical team", "First users", "Startup stack"],
    tasks: [
      "Scope and build the MVP",
      "Confirm technical team",
      "Choose initial startup stack",
      "Find first design partners",
    ],
    completed: 0,
    action: "Choose initial startup stack.",
    why: "Keep infrastructure simple so the team can focus on the discovery experience.",
  },
  {
    name: "Launching",
    purpose: "Turn the product into a company.",
    goal: "Create the foundations for a company with customers and a clear go-to-market motion.",
    focus: ["Incorporation", "GTM", "First customers", "Hiring", "Capital"],
    tasks: [
      "Incorporate US entity",
      "Define founder-led GTM",
      "Win first customers",
      "Plan first hires",
      "Prepare seed round",
    ],
    completed: 0,
    action: "Incorporate US entity.",
    why: "Clean incorporation and founder agreements make the first contracts and financing easier.",
  },
];
// What pre-seed backers expect to see, tied to Founder Track tasks so it stays in sync.
export const roundReadiness = [
  { label: "15+ structured user interviews", stage: 1, task: "Complete 15 user interviews" },
  { label: "Evidence fans will actually use it", stage: 1, task: "Validate willingness to use" },
  { label: "Technical co-founder committed", stage: 1, task: "Find technical counterpart" },
  { label: "Focused MVP in users' hands", stage: 2, task: "Scope and build the MVP" },
  { label: "Clean US entity and cap table", stage: 3, task: "Incorporate US entity" },
];
export const projectFocus = {
  focus: "Validate whether sports fans actually struggle to prioritize what matters.",
  testers: 4,
  mentors: 2,
  playbooks: 1,
};
export const getCompletedTasks = (stage: number) =>
  founderStages[stage]?.tasks.slice(0, founderStages[stage]?.completed ?? 0) ?? [];

// Founder Track tasks are the single source of truth for Matchmaker's progress.
export const currentStageIndex = Math.max(
  0,
  founderStages.findIndex((s) => s.name === matchmaker.stage),
);
export type TaskState = Record<number, string[]>;
export const stageDone = (tasks: TaskState, stage: number) =>
  (founderStages[stage]?.tasks ?? []).filter((t) => tasks[stage]?.includes(t)).length;
export function projectProgress(tasks: TaskState) {
  const total = founderStages.reduce((n, s) => n + s.tasks.length, 0);
  const done = founderStages.reduce((n, _, i) => n + stageDone(tasks, i), 0);
  return Math.round((done / total) * 100);
}
export const nextOpenTask = (tasks: TaskState) =>
  founderStages[currentStageIndex]?.tasks.find((t) => !tasks[currentStageIndex]?.includes(t)) ??
  null;
