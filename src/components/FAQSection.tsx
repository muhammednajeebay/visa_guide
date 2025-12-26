import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How long does it take to get a visa?",
      answer: "Processing times vary by country – anywhere from a few days to several weeks. Tourist visas are typically faster (5-15 business days), while work and student visas may take 4-8 weeks. We'll provide an accurate timeline based on your destination.",
    },
    {
      question: "Can you guarantee visa approval?",
      answer: "We cannot guarantee approvals as the final decision rests with the embassy. However, our 98% success rate reflects our expertise in preparing strong applications that meet all requirements.",
    },
    {
      question: "What documents do I need for a visa application?",
      answer: "Documents vary by visa type but typically include: valid passport, photographs, proof of funds, travel itinerary, and supporting documents. We provide a personalized checklist based on your specific application.",
    },
    {
      question: "Do you provide travel insurance and flight booking support?",
      answer: "Yes! We offer comprehensive travel support including travel insurance, flight bookings, and hotel reservations to make your journey completely hassle-free.",
    },
    {
      question: "What are your service fees?",
      answer: "Our fees vary based on the visa type and destination country. We believe in transparent pricing with no hidden charges. Contact us for a free quote tailored to your requirements.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our visa services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
