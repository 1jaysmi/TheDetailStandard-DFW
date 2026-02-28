import { Link } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-heading font-bold text-primary">kjcleanercar.com</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/services" className="text-foreground hover:text-primary transition-colors font-medium">
              Services
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:2143670617" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">(214) 367-0617</span>
            </a>
            <Button asChild className="bg-primary text-white hover:bg-primary/90">
              <Link to="/booking">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Home
              </Link>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Services
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Contact
              </Link>
              <a href="tel:2143670617" className="flex items-center gap-2 text-primary font-semibold py-2">
                <Phone className="w-5 h-5" />
                <span>(214) 367-0617</span>
              </a>
              <Button asChild className="bg-primary text-white hover:bg-primary/90 w-full">
                <Link to="/booking" onClick={() => setMobileMenuOpen(false)}>Book Now</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
