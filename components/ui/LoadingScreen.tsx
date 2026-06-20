import Image from "next/image";

export function LoadingScreen({ label = "Loading" }: { label?: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8 px-6">
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl animate-pulse-ring" />
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-xl shadow-primary/20 animate-pulse-ring">
          <Image
            src="/logo.jpeg"
            alt="SoftPulse"
            width={80}
            height={80}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>

      <div className="flex items-end gap-1.5 h-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="w-1.5 rounded-full bg-primary animate-loader-bar"
            style={{ animationDelay: `${i * 0.12}s`, height: "100%" }}
          />
        ))}
      </div>

      <p className="text-sm font-medium text-muted animate-fade-in">{label}</p>
    </div>
  );
}
