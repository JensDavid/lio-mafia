import { createContext, useContext, useState, type ReactNode } from "react";
import {
  getCompletedTasks,
  initialLoops,
  initialRequests,
  type CommunityRequest,
  type OpenLoop,
} from "@/lib/community";
import jensPortrait from "@/assets/portraits/jens-fischer.jpg";

const initialProfile = {
  name: "Jens Fischer",
  role: "Founders Associate Intern",
  city: "New York",
  helpWith: ["Strategy", "Operations", "GTM", "Consumer Research"],
  lookingFor: ["Technical Co-Founder", "Sports / Media Expertise"],
  openTo: ["Helping other builders", "User testing", "Introductions"],
  photo: jensPortrait,
};
type DemoProfile = typeof initialProfile;
type DemoState = {
  requests: CommunityRequest[];
  reply: (id: string, text: string) => void;
  createRequest: (text: string, category: string) => string;
  attending: string[];
  toggleAttend: (id: string) => void;
  tasks: Record<number, string[]>;
  toggleTask: (stage: number, task: string) => void;
  profile: DemoProfile;
  updateProfile: (p: DemoProfile) => void;
  saved: string[];
  toggleSave: (id: string) => void;
  loops: OpenLoop[];
  addLoop: (loop: Omit<OpenLoop, "id" | "when">) => void;
};
const Ctx = createContext<DemoState | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState(initialRequests);
  const [attending, setAttending] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Record<number, string[]>>({
    0: getCompletedTasks(0),
    1: getCompletedTasks(1),
    2: [],
    3: [],
  });
  const [profile, updateProfile] = useState(initialProfile);
  const [saved, setSaved] = useState<string[]>([]);
  const [loops, setLoops] = useState(initialLoops);
  const reply = (id: string, text: string) => {
    if (!text.trim()) return;
    setRequests((rs) =>
      rs.map((r) =>
        r.id === id
          ? {
              ...r,
              replies: [
                ...r.replies,
                {
                  id: crypto.randomUUID(),
                  author: "jens-fischer",
                  text: text.trim(),
                  when: "Just now",
                },
              ],
            }
          : r,
      ),
    );
  };
  const createRequest = (text: string, category: string) => {
    const id = crypto.randomUUID();
    if (text.trim())
      setRequests((rs) => [
        { id, author: "jens-fischer", when: "Just now", category, text: text.trim(), replies: [] },
        ...rs,
      ]);
    return id;
  };
  const toggleAttend = (id: string) =>
    setAttending((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  const toggleTask = (stage: number, task: string) =>
    setTasks((t) => ({
      ...t,
      [stage]: (t[stage] ?? []).includes(task)
        ? (t[stage] ?? []).filter((x) => x !== task)
        : [...(t[stage] ?? []), task],
    }));
  const toggleSave = (id: string) =>
    setSaved((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  const addLoop = (loop: Omit<OpenLoop, "id" | "when">) =>
    setLoops((ls) => [{ ...loop, id: crypto.randomUUID(), when: "Just now" }, ...ls]);
  return (
    <Ctx.Provider
      value={{
        requests,
        reply,
        createRequest,
        attending,
        toggleAttend,
        tasks,
        toggleTask,
        profile,
        updateProfile,
        saved,
        toggleSave,
        loops,
        addLoop,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
export function useDemo() {
  const context = useContext(Ctx);
  if (!context) throw new Error("DemoProvider is required");
  return context;
}
