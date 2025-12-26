import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/hooks/useContent";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const { content } = useContent();
  const highlights = content?.hero?.highlights || [];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            {content?.hero?.title || "Your Trusted Partner for Global Visa Services"}
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8">
            {content?.hero?.subtitle || "Fast, reliable, and stress-free visa processing for travelers, students, and professionals."}
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Button size="lg" className="bg-accent text-foreground hover:bg-accent/90" asChild>
              <a href="#contact">{content?.hero?.ctaText || "Get In Touch"}</a>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="flex-shrink-0 w-5 h-5 bg-accent flex items-center justify-center">
                  <Check className="w-3 h-3 text-foreground" />
                </div>
                <span className="text-primary-foreground/90 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
