import { UserCheck, FileCheck, TrendingUp, DollarSign, Headphones } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: UserCheck,
      title: "Experienced Consultants",
      description: "Our team has 15+ years of visa processing expertise.",
    },
    {
      icon: FileCheck,
      title: "Personalized Checklists",
      description: "Get customized document lists for your specific visa type.",
    },
    {
      icon: TrendingUp,
      title: "High Success Rate",
      description: "98% approval rate with our expert guidance and review.",
    },
    {
      icon: DollarSign,
      title: "Affordable Packages",
      description: "Competitive pricing with no hidden fees or surprises.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your queries.",
    },
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Your Success is Our Priority
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {reasons.map((reason) => (
            <div key={reason.title} className="text-center p-6">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <reason.icon className="w-7 h-7 text-primary" />
              </div>
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
