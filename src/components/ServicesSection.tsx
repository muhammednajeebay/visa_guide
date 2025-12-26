import { Plane, Briefcase, GraduationCap, Laptop, RefreshCw, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ServicesSection = () => {
  const services = [
    {
      icon: Plane,
      title: "Tourist Visa Assistance",
      description: "Travel stress-free with our expert guidance on tourist visas for top destinations worldwide.",
    },
    {
      icon: Briefcase,
      title: "Business Visa Services",
      description: "Support for professionals, entrepreneurs, and corporate travel needs.",
    },
    {
      icon: GraduationCap,
      title: "Student Visa Guidance",
      description: "Helping students fulfill their dreams of studying abroad with step-by-step assistance.",
    },
    {
      icon: Laptop,
      title: "Work & Freelance Visas",
      description: "Tailored solutions for skilled workers and freelancers seeking international opportunities.",
    },
    {
      icon: RefreshCw,
      title: "Visa Extensions & Renewals",
      description: "Already abroad? We help with extensions and renewals without hassle.",
    },
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Comprehensive Visa Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From tourist to work visas, we offer complete visa processing services tailored to your travel needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base mb-4">
                  {service.description}
                </CardDescription>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-secondary transition-colors"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
