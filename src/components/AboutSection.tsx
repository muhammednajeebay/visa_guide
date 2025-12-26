import { useContent } from "@/hooks/useContent";

const AboutSection = () => {
  const { content } = useContent();
  const stats = content?.about?.stats || [];
  const paragraphs = content?.about?.paragraphs || [];

  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
              {content?.about?.title || "About Us"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              {content?.about?.heading || "Simplifying Visa Applications Since 2009"}
            </h2>
            {paragraphs.map((p: string, i: number) => (
              <p key={i} className="text-muted-foreground text-lg leading-relaxed mb-6">
                {p}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-background p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
