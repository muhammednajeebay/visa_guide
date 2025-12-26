import { Shield, Users, Award, Clock } from "lucide-react";

const AboutSection = () => {
  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Clients" },
    { icon: Award, value: "98%", label: "Success Rate" },
    { icon: Shield, value: "15+", label: "Years Experience" },
    { icon: Clock, value: "24/7", label: "Support Available" },
  ];

  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Simplifying Visa Applications Since 2009
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              At GlobalVisa, we simplify the visa application process for travelers around the world. Whether it's tourism, business, study, or work visas, our dedicated team ensures every application is handled with care and precision.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              With years of experience, we've successfully guided thousands of clients to their dream destinations. Our mission is to make international travel accessible to everyone through expert guidance and personalized service.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-background p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <stat.icon className="w-10 h-10 text-primary mb-4" />
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
