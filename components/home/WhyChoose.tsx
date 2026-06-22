import { Users, Trophy, Zap, HeartHandshake } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { whyChooseItems } from "@/lib/data/static";

const iconMap = {
  users: Users,
  trophy: Trophy,
  zap: Zap,
  "heart-handshake": HeartHandshake,
};

export function WhyChoose() {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Why SoftPulse"
          title="Why Choose SoftPulse"
          description="50+ projects delivered, 500+ students trained — technical excellence with a genuine passion for your success."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseItems.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <div
                key={item.title}
                className="text-center group"
              >
                <div className="relative mx-auto w-20 h-20 mb-6">
                  <div className="absolute inset-0 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Icon className="w-9 h-9 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
