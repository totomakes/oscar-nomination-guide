"use client";
import { useState } from "react";
import { sections } from "./data";
const pill = (m: number) => (m > 0 ? "pill pos" : m < 0 ? "pill neg" : "pill neu");
const fmt = (m: number) => (m > 0 ? `+${m}` : m === 0 ? "REQ" : `${m}`);
export default function Page() {
  const [on, setOn] = useState<Record<string, boolean>>({});
  const total = sections.flatMap(s => s.items.map((it, i) => (on[`${s.id}-${i}`] ? it.m : 0))).reduce((a, b) => a + b, 0);
  const count = sections.reduce((a, s) => a + s.items.length, 0);
  return (<main>
    <header className="hero">
      <p className="kicker">Awards Strategy Field Guide · 98th Academy Awards cycle</p>
      <h1>The Oscar Nomination Scorecard</h1>
      <p className="lede">{count} granular factors that move a film's odds of an Academy Award nomination — each scored with a modifier.</p>
      <div className="note"><strong>Read this first:</strong> These modifiers are a heuristic estimate built from Academy rules and observed awards-season patterns — not an official Academy formula. Rules change each year; always check the current Academy Rules at oscars.org.<br/><br/><strong>How to read it:</strong> <span className="pill pos">+</span> raises odds, <span className="pill neg">−</span> lowers them, <span className="pill neu">REQ</span> is a pass/fail requirement (−100 = ineligible). Tick the factors that apply to your film to see a running estimate. Roughly: 60+ = serious contender, 30–60 = in the conversation, under 30 = long shot.</div>
    </header>
    <nav className="nav">{sections.map(s => <a key={s.id} href={`#${s.id}`}>{s.title.replace(/^\d+\. /, "")}</a>)}<span className={`score ${total < 0 ? "neg" : ""}`}>Score: {total > 0 ? "+" : ""}{total}</span></nav>
    {sections.map(s => (<section key={s.id} id={s.id}>
      <h2>{s.title}</h2><p className="blurb">{s.blurb}</p>
      <ul>{s.items.map((it, i) => { const k = `${s.id}-${i}`; return (
        <li key={k} className={on[k] ? "on" : ""} onClick={() => setOn(o => ({ ...o, [k]: !o[k] }))}>
          <input type="checkbox" checked={!!on[k]} readOnly aria-label="applies" />
          <div><h3>{it.f}</h3><p>{it.r}</p></div>
          <span className={pill(it.m)}>{fmt(it.m)}</span>
        </li>); })}</ul>
    </section>))}
    <footer>Prepared for Roberto Burgos · Central American film strategy reference. Sources: Academy Rules (oscars.org), guild & precursor history, trade coverage. Heuristic only.</footer>
  </main>);
}
