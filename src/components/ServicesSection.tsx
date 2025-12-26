import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useContent } from "@/hooks/useContent";

const ServicesSection = () => {
  const { content } = useContent();
  const services = content?.services?.items || [];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
            {content?.services?.sectionTitle || "Our Services"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            {content?.services?.heading || "Comprehensive Visa Solutions"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {content?.services?.description ||
              "From tourist to work visas, we offer complete visa processing services tailored to your travel needs."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
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
                  {(service as any).cta || "Learn More"} <ArrowRight className="w-4 h-4" />
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
