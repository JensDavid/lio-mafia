import { describe, expect, it } from "vitest";
import {
  communityEvents,
  founderStages,
  getCompletedTasks,
  initialRequests,
  nextOpenTask,
  projectProgress,
} from "@/lib/community";
import { buildPath, requestsYouCanHelp, searchNetwork } from "@/lib/network-search";

const initialTasks = { 0: getCompletedTasks(0), 1: getCompletedTasks(1), 2: [], 3: [] };
describe("Founder product rules", () => {
  it("derives Matchmaker progress from Founder Track tasks (7 of 19)", () =>
    expect(projectProgress(initialTasks)).toBe(37));
  it("moves progress and the next milestone when a task is completed", () => {
    expect(nextOpenTask(initialTasks)).toBe("Complete 15 user interviews");
    const more = { ...initialTasks, 1: [...initialTasks[1], "Complete 15 user interviews"] };
    expect(projectProgress(more)).toBe(42);
    expect(nextOpenTask(more)).toBe("Validate willingness to use");
  });
  it("starts validation with exactly the three specified tasks complete", () =>
    expect(getCompletedTasks(1)).toEqual([
      "Define initial problem hypothesis",
      "Build clickable prototype",
      "Conduct first 5 user interviews",
    ]));
  it("has six validation tasks", () => expect(founderStages[1]?.tasks.length).toBe(6));
  it("has 18 initial attendees at the Oct 29 NYC dinner", () =>
    expect(communityEvents.find((e) => e.id === "founder-dinner")).toMatchObject({
      iso: "2026-10-29",
      attending: 18,
    }));
  it("has 12 initial attendees at the Nov 4 Berlin breakfast", () =>
    expect(communityEvents.find((e) => e.id === "builder-breakfast")).toMatchObject({
      iso: "2026-11-04",
      attending: 12,
    }));
  it("finds community answers when searching Supabase", () =>
    expect(
      searchNetwork("experience scaling Supabase", initialRequests).requests.map((r) => r.id),
    ).toContain("scaling-supabase"));
  it("finds legal and stack resources for entity and startup stack queries", () => {
    const r = searchNetwork(
      "I need help setting up a US entity and choosing my initial tech stack",
      initialRequests,
    );
    expect(r.partners.map((p) => p.name)).toContain("Orrick");
    expect(r.playbooks.map((p) => p.id)).toContain("startup-stack");
    expect(r.people.length).toBeGreaterThan(0);
  });
  it("builds a different path for different questions and always offers to post", () => {
    const funding = buildPath(searchNetwork("fundraising pre-seed", initialRequests));
    const legal = buildPath(searchNetwork("US entity legal", initialRequests));
    expect(funding[0]).toMatchObject({ kind: "intro", member: { id: "mira-tanaka" } });
    expect(legal.some((s) => s.kind === "partner")).toBe(true);
    expect(funding.at(-1)?.kind).toBe("post");
    expect(buildPath(searchNetwork("zzz", initialRequests))).toEqual([{ kind: "post" }]);
  });
  it("suggests requests Jens can help with, never his own", () => {
    const ids = requestsYouCanHelp(initialRequests, ["Strategy", "GTM", "Consumer Research"]).map(
      (r) => r.id,
    );
    expect(ids.length).toBeGreaterThan(0);
    expect(ids).not.toContain("technical-cofounder");
  });
});
