export default function AboutPage() {
  return (
    <div className="container-site section-pad">
      <p className="eyebrow">About the event</p>
      <h1 className="section-title">A 24-hour test of ideas, execution and proof.</h1>
      <p className="section-copy">HyperLearningTech – Winter Hackathon '26 is the first edition of an independently organised online competition for individual builders and squads.</p>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {[
          ["What you will build", "Choose a meaningful problem and deliver a functional project with a clear user journey, working features and inspectable source."],
          ["What makes it different", "Repository snapshots, hourly checkpoints and collaborator inspection are used to keep development effort visible and credible."],
          ["Development effort", "Participants must document genuine contribution, disclose AI and existing-code assistance, and build the core solution during the competition."],
          ["Solo or squad", "Solo entry costs ₹99. Squads contain 2–4 members and pay ₹200 flat for one project."],
        ].map(([title, copy]) => <article key={title} className="card p-6"><h2 className="text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-400">{copy}</p></article>)}
      </div>
    </div>
  );
}