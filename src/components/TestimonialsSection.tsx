import { Star } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const TestimonialsSection = () => {
  const { content } = useContent();
  const testimonials = content?.testimonials?.items || [];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-secondary-foreground/70 uppercase tracking-wider">
            {content?.testimonials?.title || "Testimonials"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mt-2 mb-4">
            {content?.testimonials?.heading || "What Our Clients Say"}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-card p-8 border border-border"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>
              <div>
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-muted-foreground text-sm">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
