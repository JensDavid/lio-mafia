import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Avatar, Btn, Modal } from "./primitives";
import { useDemo } from "./demo-state";
import { getMember, me, type Member } from "@/lib/data";

function Sent({ title, body, onDone }: { title: string; body: string; onDone: () => void }) {
  return (
    <div className="py-4 animate-rise">
      <div className="eyebrow">Sent · added to your open loops</div>
      <h3 className="display mt-3 text-3xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      <div className="mt-6 flex items-center justify-between gap-3">
        <Link to="/home" onClick={onDone} className="text-sm font-medium hover:underline">
          See open loops →
        </Link>
        <Btn variant="outline" onClick={onDone}>
          Done
        </Btn>
      </div>
    </div>
  );
}

export function IntroModal({
  member,
  open,
  onOpenChange,
  target,
}: {
  member: Member;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  target?: { to: string; toTitle: string; message: string };
}) {
  const { addLoop } = useDemo();
  const t = target ??
    member.intro ?? {
      to: member.name,
      toTitle: "Conversation",
      message: "I would love to connect.",
    };
  const [msg, setMsg] = useState(t.message);
  const [sent, setSent] = useState(false);
  const first = member.name.split(" ")[0];
  const close = (o: boolean) => {
    onOpenChange(o);
    if (!o) setTimeout(() => setSent(false), 200);
  };
  return (
    <Modal open={open} onOpenChange={close} title={`Request an intro to ${t.to}`}>
      {sent ? (
        <Sent
          title={`Request sent to ${first}.`}
          body={`You'll hear back when ${first} has spoken with ${t.to.split(" ")[0]}.`}
          onDone={() => close(false)}
        />
      ) : (
        <>
          <div className="eyebrow mb-2">Request an intro</div>
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
            <Avatar id={member.id} initials={member.initials} size="sm" />
            <span className="font-medium">{first}</span>
            <span className="text-muted-foreground">→</span>
            <span className="font-medium">{t.to}</span>
            <span className="text-muted-foreground">· {t.toTitle}</span>
          </div>
          <textarea
            aria-label="Message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={5}
            className="w-full resize-none rounded-md border border-border bg-background p-3 text-sm leading-relaxed outline-none focus:border-border-strong"
          />
          <div className="mt-5 flex justify-end gap-2">
            <Btn variant="ghost" onClick={() => close(false)}>
              Cancel
            </Btn>
            <Btn
              onClick={() => {
                addLoop({ kind: "intro", via: member.id, to: t.to, detail: t.toTitle });
                setSent(true);
              }}
            >
              Send request
            </Btn>
          </div>
        </>
      )}
    </Modal>
  );
}

export function ConnectModal({
  memberId,
  open,
  onOpenChange,
}: {
  memberId: string;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { addLoop } = useDemo();
  const m = getMember(memberId);
  const [slot, setSlot] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const close = (o: boolean) => {
    onOpenChange(o);
    if (!o)
      setTimeout(() => {
        setDone(false);
        setSlot(null);
      }, 200);
  };
  if (!m) return null;
  const first = m.name.split(" ")[0];
  const slots = ["Tue · 8:30 coffee", "Wed · 12:30 lunch", "Thu · 18:00 walk"];
  return (
    <Modal open={open} onOpenChange={close} title={`Start a conversation with ${m.name}`}>
      {done ? (
        <Sent
          title={`Suggested ${slot} to ${first}.`}
          body="We'll let you know when they confirm."
          onDone={() => close(false)}
        />
      ) : (
        <>
          <div className="eyebrow mb-3">Start a conversation</div>
          <div className="mb-4 flex items-center gap-3">
            <Avatar id="jens-fischer" initials={me.initials} />
            <span className="text-muted-foreground">+</span>
            <Avatar id={m.id} initials={m.initials} />
          </div>
          <h3 className="text-xl font-semibold tracking-tight">Grab a coffee with {first}?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {m.city === me.city ? `You're both in ${m.city}.` : `${first} is in ${m.city}.`}{" "}
            Suggested topic: what a Matchmaker MVP needs in the first 30 days.
          </p>
          <div className="mt-5 grid gap-2" role="radiogroup" aria-label="Suggested times">
            {slots.map((s) => (
              <button
                type="button"
                role="radio"
                aria-checked={slot === s}
                key={s}
                onClick={() => setSlot(s)}
                className={`rounded-md border px-3 py-2.5 text-left text-sm transition ${slot === s ? "border-foreground" : "border-border hover:border-border-strong"}`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Btn variant="ghost" onClick={() => close(false)}>
              Cancel
            </Btn>
            <Btn
              disabled={!slot}
              className="disabled:opacity-40"
              onClick={() => {
                if (!slot) return;
                addLoop({ kind: "connect", via: m.id, to: m.name, detail: slot });
                setDone(true);
              }}
            >
              Suggest time
            </Btn>
          </div>
        </>
      )}
    </Modal>
  );
}
