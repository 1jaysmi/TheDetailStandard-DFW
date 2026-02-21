import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Animated reveal component
const AnimatedElement: React.FC<{children: React.ReactNode; className?: string; delay?: number}> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.classList.add('is-visible');
        }, delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={`${className || ''} opacity-0 translate-y-8 transition-all duration-700 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0`}>{children}</div>;
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{
          backgroundImage: 'radial-gradient(circle, rgba(22,123,246,0.08) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
        
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Get In Touch
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
                Ready to book your detailing appointment? We&apos;re here to help. Contact us today!
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Cards */}
            <div className="space-y-6">
              <AnimatedElement>
                <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
                  Contact Information
                </h2>
              </AnimatedElement>

              <AnimatedElement delay={100}>
                <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white border-border/40 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-2">Phone</h3>
                      <a href="tel:2143670617" className="text-foreground/70 hover:text-primary transition-colors text-lg">
                        (214) 367-0617
                      </a>
                      <p className="text-foreground/60 text-sm mt-1">Call or text us anytime</p>
                    </div>
                  </div>
                </Card>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white border-border/40 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-2">Service Area</h3>
                      <p className="text-foreground/70">Dallas, TX and surrounding areas</p>
                      <p className="text-foreground/60 text-sm mt-1">Mobile service - we come to you!</p>
                    </div>
                  </div>
                </Card>
              </AnimatedElement>

              <AnimatedElement delay={300}>
                <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white border-border/40 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-2">Hours</h3>
                      <div className="text-foreground/70 space-y-1">
                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 5:00 PM</p>
                        <p>Sunday: By appointment</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimatedElement>
            </div>

            {/* CTA Section */}
            <div>
              <AnimatedElement delay={100}>
                <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-border/40 rounded-2xl">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                    Ready to Book?
                  </h3>
                  <p className="text-foreground/70 mb-6 leading-relaxed">
                    Get your car looking its best with our professional mobile detailing service. We bring the detail shop to you!
                  </p>
                  
                  <div className="space-y-4">
                    <Button asChild size="lg" className="w-full bg-primary text-white hover:bg-primary/90 hover:scale-105 transition-all shadow-lg">
                      <Link to="/services">View Services & Book</Link>
                    </Button>
                    
                    <Button asChild size="lg" variant="outline" className="w-full border-2 hover:bg-primary/5 hover:scale-105 transition-all">
                      <a href="tel:2143670617">
                        <Phone className="w-5 h-5 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  </div>

                  <div className="mt-8 pt-8 border-t border-border/40">
                    <h4 className="font-heading font-bold text-foreground mb-3">Why Choose Us?</h4>
                    <ul className="space-y-2 text-foreground/70 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>Mobile service - we come to you</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>Professional quality results</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>Flexible scheduling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>Transparent pricing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>Satisfaction guaranteed</span>
                      </li>
                    </ul>
                  </div>
                </Card>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/5 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Have questions? We&apos;ve got answers.
              </p>
            </div>
          </AnimatedElement>

          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatedElement delay={0}>
              <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-border/40 rounded-2xl">
                <h3 className="font-heading font-bold text-foreground mb-2">
                  How does mobile detailing work?
                </h3>
                <p className="text-foreground/70">
                  We bring all the equipment and supplies needed to detail your car right to your location. All we need is access to water and electricity, and we&apos;ll take care of the rest!
                </p>
              </Card>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-border/40 rounded-2xl">
                <h3 className="font-heading font-bold text-foreground mb-2">
                  How long does a detail take?
                </h3>
                <p className="text-foreground/70">
                  Depending on the service package, most details take between 2-5 hours. We&apos;ll give you an estimated time when you book your appointment.
                </p>
              </Card>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-border/40 rounded-2xl">
                <h3 className="font-heading font-bold text-foreground mb-2">
                  What areas do you service?
                </h3>
                <p className="text-foreground/70">
                  We service Dallas, TX and the surrounding areas. Call us to confirm we service your specific location.
                </p>
              </Card>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-border/40 rounded-2xl">
                <h3 className="font-heading font-bold text-foreground mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-foreground/70">
                  We accept cash, credit cards, and digital payment methods. Payment is due upon completion of service.
                </p>
              </Card>
            </AnimatedElement>

            <AnimatedElement delay={400}>
              <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-border/40 rounded-2xl">
                <h3 className="font-heading font-bold text-foreground mb-2">
                  Do I need to be present during the detail?
                </h3>
                <p className="text-foreground/70">
                  You don&apos;t need to be present the entire time, but we do need you available at the start and end of the service. Many customers go about their day while we work!
                </p>
              </Card>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{
          backgroundImage: 'radial-gradient(circle, rgba(71,71,215,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Let&apos;s Get Started
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                Contact us today to schedule your mobile detailing appointment. We&apos;re ready to make your car shine!
              </p>
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 hover:scale-105 transition-all shadow-lg">
                <a href="tel:2143670617">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (214) 367-0617
                </a>
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
