import Link from "next/link";
import { ShieldCheck, Globe, Lock } from "lucide-react";
import { event } from "@/data/event";
import { TeamRevealGrid, type TeamRevealMember } from "@/components/ui/TeamRevealGrid";

const CREATORS: readonly TeamRevealMember[] = [
  {
    id: "shiv",
    name: "Shiv Raj Singh",
    role: "Full-Stack Engineer",
    expertise:
      "Creator of Hyper Learning. Built the entire platform from scratch, designed the architecture, AI systems, and leads product development.",
    image: "/team/shiv.webp",
    imagePosition: "center 18%",
    accent: "#e0b885",
    socials: {
      github: "https://github.com/imuniqueshiv",
      linkedin: "https://www.linkedin.com/in/shiv-raj-singh-387973299/",
      twitter: "https://x.com/imuniqueshiv",
      instagram: "https://www.instagram.com/imuniqueshiv?hvrq=MXVtc29wMWJndWwwdA==",
      portfolio: "https://imuniqueshiv-portfolio.vercel.app/",
      email: "singhshivraj89969@gmail.com",
    },
  },
  {
    id: "nitin",
    name: "Nitin Mohan",
    role: "UI/UX Designer & Full Stack Developer",
    expertise:
      "Designs intuitive user interfaces and improves the overall user experience of Hyper Learning.",
    image: "/team/nitin.webp",
    imagePosition: "center 24%",
    accent: "#ff6b2b",
    socials: {
      github: "https://github.com/nitinmohan18",
      linkedin: "https://linkedin.com/in/nitin-mohan-9251ab328",
      twitter: "https://x.com/nitinmohan18",
      instagram: "https://www.instagram.com/nitin__.pandey/",
      portfolio: "https://nitinpandey-portfolio.vercel.app/",
      email: "mohannitin494@gmail.com",
    },
  },
  {
    id: "ramoo",
    name: "Ramoo Kachhee",
    role: "Content Contributor & Full Stack Developer",
    expertise:
      "Actively contributes to Hyper Learning by curating and uploading essential study materials, including PYQs, syllabuses, and question papers.",
    image: "/team/ramoo.webp",
    imagePosition: "center 16%",
    accent: "#ffd89b",
    socials: {
      github: "https://github.com/RamuuXfree",
      linkedin: "https://www.linkedin.com/in/ramoo-kachhee-9b1616405/",
      instagram: "https://www.instagram.com/ramuuuu_kachhee?jplx=MXd2MW9mY2pyOGc0cw==",
      email: "ramoo@hyperlearning.tech",
    },
  },
];

export default function ContactCTASection() {
  return (
    <section id="contact" className="py-8 sm:py-14 lg:py-16 bg-cream">
      <div className="container-site max-w-6xl">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          {/* Left: Official Organizer & Verification Info */}
          <div className="space-y-5 sm:space-y-6 border-b border-white/[0.08] pb-6 sm:pb-7 text-left lg:border-b-0 lg:border-r lg:pb-2 lg:pr-8">
            <div>
              <p className="font-mono text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e0b885]">
                Organised By
              </p>
              <h3 className="mt-1 font-serif text-xl sm:text-2xl font-normal text-white">
                {event.organiser}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#d6cec2]">
                Winter Hackathon ’26 is an independently organised online build challenge committed to genuine engineering progress and verifiable execution.
              </p>
              <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-mono text-[#b8ada0]">
                <a
                  href={`https://${event.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Globe size={13} className="text-[#e0b885]" />
                  <span>{event.website}</span>
                </a>
                <span>·</span>
                <span className="text-white">{event.tagline}</span>
              </div>
            </div>

            <div className="border-t border-white/[0.08] pt-5">
              <p className="font-mono text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e0b885]">
                Participant Privacy & Terms
              </p>
              <div className="mt-2.5 space-y-2 text-xs text-[#d6cec2]">
                <div className="flex items-start gap-2.5">
                  <Lock size={14} className="mt-0.5 shrink-0 text-[#b8ada0]" />
                  <span>
                    Payment & UPI details are restricted to authorized organizers and will never be published publicly.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[#b8ada0]" />
                  <span>
                    Participants retain 100% intellectual property ownership of all code and inventions.
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-mono">
                <Link href="/rules" className="text-[#e0b885] hover:text-white transition-colors underline">
                  Event Rules
                </Link>
                <span className="text-white/20">·</span>
                <Link href="/faq" className="text-[#e0b885] hover:text-white transition-colors underline">
                  FAQ
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Right: 3 Creators Reveal Cards */}
          <div className="w-full lg:pl-2">
            <TeamRevealGrid
              eyebrow="Core Creators"
              title="Built by the Hyper Learning Team"
              websiteHref="https://www.hyperlearningtech.in/"
              websiteLabel="hyperlearningtech.in"
              members={CREATORS}
              compact
            />
          </div>
        </div>
      </div>
    </section>
  );
}
