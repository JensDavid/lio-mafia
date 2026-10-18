import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Avatar, Btn, PageHeader } from "@/components/mafia/primitives";
import { useDemo } from "@/components/mafia/demo-state";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/profile/edit")({
  head: () =>
    pageHead(
      "Edit founder profile",
      "Share how you can help and what you are looking for in the Lio Mafia.",
    ),
  component: Edit,
});
function Edit() {
  const { profile, updateProfile } = useDemo();
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  return (
    <div>
      <PageHeader
        size="sm"
        eyebrow="Your profile"
        title="Edit founder profile"
        sub="Give. Ask. Build. Tell the Mafia how you can help and what you need."
      />
      <form
        className="max-w-2xl space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          updateProfile(draft);
          setSaved(true);
        }}
      >
        <div className="flex items-center gap-4">
          <Avatar id="jens-fischer" initials="JF" size="lg" photo={draft.photo} />
          <label className="text-sm">
            Profile photo
            <input
              type="file"
              accept="image/*"
              aria-label="Upload profile photo"
              className="mt-2 block max-w-full text-xs"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (!file.type.startsWith("image/") || file.size > 5000000) {
                  setError("Choose an image smaller than 5 MB.");
                  return;
                }
                const reader = new FileReader();
                reader.onload = () => {
                  if (typeof reader.result === "string") {
                    setDraft((d) => ({ ...d, photo: reader.result as string }));
                    setSaved(false);
                    setError("");
                  }
                };
                reader.readAsDataURL(file);
              }}
            />
          </label>
        </div>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        {(["name", "role", "city"] as const).map((key) => (
          <label key={key} className="block text-sm capitalize">
            {key}
            <input
              className="field mt-2"
              required
              value={draft[key]}
              onChange={(e) => {
                setDraft({ ...draft, [key]: e.target.value });
                setSaved(false);
              }}
            />
          </label>
        ))}
        {(
          [
            { key: "helpWith", label: "Can help with" },
            { key: "lookingFor", label: "Looking for" },
            { key: "openTo", label: "Open to" },
          ] as const
        ).map(({ key, label }) => (
          <label key={key} className="block text-sm">
            {label}
            <textarea
              className="field mt-2"
              rows={3}
              value={draft[key].join("\n")}
              onChange={(e) => {
                setDraft({ ...draft, [key]: e.target.value.split("\n") });
                setSaved(false);
              }}
            />
          </label>
        ))}
        <div className="flex items-center gap-4">
          <Btn type="submit">Save profile</Btn>
          {saved && (
            <Link to="/network/$memberId" params={{ memberId: "jens-fischer" }} className="text-sm">
              Profile saved · View profile →
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
