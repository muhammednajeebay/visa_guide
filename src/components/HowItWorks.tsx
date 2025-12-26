import { FileText, MessageSquare, Settings, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      step: "01",
      title: "Submit Your Request",
      description: "Fill our online form or contact us directly with your visa requirements.",
    },
    {
      icon: MessageSquare,
      step: "02",
      title: "Get Expert Advice",
      description: "Receive a personalized checklist and eligibility assessment from our team.",
    },
    {
      icon: Settings,
      step: "03",
      title: "We Handle the Process",
      description: "We manage all paperwork, documentation review, and embassy submission.",
    },
    {
      icon: CheckCircle,
      step: "04",
      title: "Visa Approved",
      description: "Collect your approved visa and travel with confidence to your destination.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Simple 4-Step Process
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've streamlined the visa application process to make it as simple as possible for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              <div className="bg-card border border-border p-8 h-full hover:shadow-lg transition-shadow">
                <div className="text-5xl font-bold text-border mb-4">{item.step}</div>
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <a href="#contact">Contact Us</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
