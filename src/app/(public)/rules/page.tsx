export default function RulesPage() {
  const sections = [
    ["Eligibility", "Open to eligible students and independent builders. Registration details must be accurate."],
    ["Registration", "Registration closes on 25 December 2026. Entry must include the participation form and proposal."],
    ["Solo and squads", "Solo costs ₹99. A squad costs ₹200 flat and has 2–4 members. One project is allowed per registered entry."],
    ["Originality", "The project must represent original participant work. Submitted code or assets must be honestly disclosed."],
    ["AI tool disclosure", "AI assistance is allowed only when relevant tools and usage are disclosed in the proposal and final submission."],
    ["Existing code disclosure", "Existing code, templates and third-party assets must be identified. They cannot replace the required competition build."],
    ["Development period", "Core development occurs from 10 PM IST on 26 December through 10 PM IST on 27 December."],
    ["Hourly checkpoints", "Entries are expected to submit hourly progress, blockers and evidence for the build window."],
    ["Private repository", "Each entry needs a private GitHub repository. The team leader creates and owns the repository during the competition."],
    ["Collaborator inspection", "Invite [OFFICIAL HYPERLEARNINGTECH GITHUB ACCOUNT] as a collaborator and ensure the invitation is accepted."],
    ["Repository public reveal", "The repository is planned to become public at 8 PM IST on 27 December."],
    ["Final submission", "Submit the repository, deployment URL, description, feature list and required declarations before 10 PM IST."],
    ["Judging", "Projects are assessed for functionality, implementation, originality, UI/UX and genuine development effort."],
    ["Disqualification", "False disclosures, prohibited copied work, repository manipulation or failure to follow mandatory rules may lead to disqualification."],
    ["Privacy and IP", "Participants retain ownership of their work and grant only event-related inspection and showcase permissions."],
  ];
  return <div className="container-site section-pad"><p className="eyebrow">Competition rules</p><h1 className="section-title">Build honestly. Document clearly.</h1><div className="mt-10 grid gap-4 md:grid-cols-2">{sections.map(([title,copy],i) => <section key={title} className="card p-6"><p className="text-xs font-bold text-cyan">{String(i+1).padStart(2,"0")}</p><h2 className="mt-4 text-lg font-semibold">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-400">{copy}</p></section>)}</div></div>;
}