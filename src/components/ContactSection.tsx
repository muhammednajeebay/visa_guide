import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContent } from "@/hooks/useContent";

const ContactSection = () => {
  const { content } = useContent();
  const contactInfo = content?.contact?.info || [];

  return (
    <section id="contact" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
            {content?.contact?.title || "Contact Us"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            {content?.contact?.heading || "Get in Touch"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {content?.contact?.description ||
              "Ready to start your visa application? Contact us today for a free consultation."}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-background p-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Your Name" className="bg-card" />
                <Input type="email" placeholder="Email Address" className="bg-card" />
              </div>
              <Input placeholder="Phone Number" className="bg-card" />
              <Input placeholder="Destination Country" className="bg-card" />
              <Textarea placeholder="Tell us about your visa requirements..." className="bg-card min-h-[120px]" />
              <Button type="submit" className="w-full">
                {content?.contact?.form?.submitText || "Submit Request"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="bg-background p-6 border border-border"
                >
                  <div className="font-medium text-foreground mb-1">{info.title}</div>
                  <div className="text-muted-foreground text-sm">{info.content}</div>
                </div>
              ))}
            </div>

            <div className="bg-primary p-8 text-primary-foreground">
              <h3 className="text-xl font-semibold mb-4">{content?.contact?.ctaTitle || "Free Consultation"}</h3>
              <p className="text-primary-foreground/80 mb-6">
                {content?.contact?.ctaDescription ||
                  "Not sure which visa you need? Book a free 15-minute consultation with our experts."}
              </p>
              <Button
                variant="outline"
                className="bg-transparent border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                {content?.contact?.ctaButton || "Book Free Call"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
