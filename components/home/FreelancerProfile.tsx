import Link from "next/link";
import { ExternalLink, Star, Briefcase } from "lucide-react";

const skills = [
  "React Native",
  "Flutter",
  "iOS & Android",
  "Mobile App Development",
  "UI/UX Design",
  "GPS & Maps Integration",
  "E-commerce Apps",
  "App Store Deployment",
];

export function FreelancerProfile() {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Trusted Freelancer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Proven on Upwork & Fiverr
          </h2>
          <p className="text-muted text-lg">
            Top-rated mobile developer with apps live on Google Play and the App
            Store — available on both leading freelance platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Mudassar Ali</h3>
                <p className="text-muted text-sm">
                  developerpro532 on Fiverr
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-sm text-muted">5.0 Rating</span>
            </div>

            <p className="text-muted leading-relaxed mb-6">
              Specialized in React Native and Flutter cross-platform development.
              Apps shipped to Google Play and the Apple App Store including PacePal,
              Whenn, and SHOOF. GPS tracking, e-commerce, fintech loyalty wallets,
              and polished UI/UX from concept to deployment.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="https://www.upwork.com/freelancers/mudassara81"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#14a800] text-white font-semibold hover:bg-[#118f00] transition-colors"
              >
                Upwork Profile
                <ExternalLink className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.fiverr.com/developerpro532?public_mode=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1dbf73] text-white font-semibold hover:bg-[#19a463] transition-colors"
              >
                Fiverr Profile
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Core Skills</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full bg-blue-50 text-primary text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            <h3 className="text-lg font-bold mb-4">Shipped Apps</h3>
            <ul className="space-y-3 text-sm text-muted mb-6">
              <li className="flex justify-between">
                <span>PacePal</span>
                <span className="text-primary font-medium">Google Play + iOS</span>
              </li>
              <li className="flex justify-between">
                <span>Whenn</span>
                <span className="text-primary font-medium">Google Play + iOS</span>
              </li>
              <li className="flex justify-between">
                <span>SHOOF | شوف</span>
                <span className="text-primary font-medium">Google Play</span>
              </li>
              <li className="flex justify-between">
                <span>Wafaa PRO</span>
                <span className="text-primary font-medium">Loyalty / Fintech</span>
              </li>
            </ul>

            <Link
              href="https://www.fiverr.com/users/developerpro532/portfolio?roleIds="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1dbf73] hover:underline"
            >
              View full Fiverr portfolio
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
