import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-secondary/10 border-t border-border/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-heading font-bold text-primary">kjcleanercar.com</span>
            </Link>
            <p className="text-foreground/70 text-sm leading-relaxed">
              #1 Car Detailing Services in Dallas, TX. Convenient. Reliable. Transparent.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-foreground mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link to="/services" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                Services
              </Link>
              <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                About
              </Link>
              <Link to="/contact" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-foreground mb-4">Services</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/services" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                Interior Detailing
              </Link>
              <Link to="/services" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                Exterior Detailing
              </Link>
              <Link to="/services" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                Full Detailing
              </Link>
              <Link to="/services" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                Ceramic Coating
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-foreground mb-4">Contact Us</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:2143670617" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>(214) 367-0617</span>
              </a>
              <div className="flex items-start gap-2 text-foreground/70 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Dallas, TX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground/60 text-sm">
              © 2026 kjcleanercar.com. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
