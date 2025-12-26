import { useContent } from "@/hooks/useContent";

const WhyChooseUs = () => {
  const { content } = useContent();
  const reasons = content?.whyChooseUs?.reasons || [];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
            {content?.whyChooseUs?.title || "Why Choose Us"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            {content?.whyChooseUs?.heading || "Your Success is Our Priority"}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {reasons.map((reason) => (
            <div key={reason.title} className="text-center p-6">
              <h3 className="font-semibold text-foreground mb-2">{reason.title}</h3>
              <p className="text-muted-foreground text-sm">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
