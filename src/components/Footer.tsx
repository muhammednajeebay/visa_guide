import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const Footer = () => {
  const { content } = useContent();
  const quickLinks = content?.footer?.quickLinks || [];

  const services = content?.footer?.services || [];
  const brand = content?.footer?.brand || "VisaGuide";

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 mb-4">
              <img
                src="/logo.jpeg"
                alt={brand}
                className="h-7 w-7 object-contain"
                loading="eager"
              />
              <span className="text-xl font-bold">{brand}</span>
            </a>
            <p className="text-primary-foreground/70 text-sm mb-4">
              {content?.footer?.description ||
                "Your trusted partner for hassle-free visa processing and travel documentation services."}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link: any) => (
                <li key={link.name || link}>
                  <a
                    href={link.href || "#"}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name || link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {(content?.footer?.contact || []).map((c: string, i: number) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>{content?.footer?.copyright || `© ${new Date().getFullYear()} VisaGuide. All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
