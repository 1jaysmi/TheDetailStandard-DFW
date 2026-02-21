import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, CheckCircle, Shield, Clock, Sparkles, Award, Users } from 'lucide-react';
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

export default function AboutPage() {
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
                About K&J Cleaner Car
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
                Dallas&apos;s premier mobile car detailing service, bringing professional care directly to your doorstep.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="space-y-6 text-foreground/70 text-lg leading-relaxed">
                  <p>
                    K&J Cleaner Car was founded with a simple mission: to provide the best car detailing services in Dallas, TX, with unmatched convenience and quality. We understand that your time is valuable, which is why we bring our professional detailing services directly to you.
                  </p>
                  <p>
                    Our team of experienced detailing professionals is passionate about cars and committed to delivering exceptional results. We use only the highest quality products and the latest techniques to ensure your vehicle looks its absolute best.
                  </p>
                  <p>
                    Whether you need a quick refresh or a complete transformation, we&apos;re here to help. Our mobile service means you can get your car detailed at home, at work, or wherever is most convenient for you.
                  </p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/5 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedElement delay={0}>
              <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white border-border/40 rounded-2xl">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">Convenient</h3>
                <p className="text-foreground/70">
                  We come to you, saving you time and hassle. Book online or by phone, and we&apos;ll handle the rest.
                </p>
              </Card>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white border-border/40 rounded-2xl">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">Reliable</h3>
                <p className="text-foreground/70">
                  Consistent quality, on-time service, and professional care you can count on every time.
                </p>
              </Card>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white border-border/40 rounded-2xl">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">Transparent</h3>
                <p className="text-foreground/70">
                  Clear pricing with no hidden fees. You know exactly what you&apos;re getting before we start.
                </p>
              </Card>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Why Choose K&J Cleaner Car?
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Experience the difference with Dallas&apos;s #1 mobile detailing service
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <AnimatedElement delay={0}>
              <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white border-border/40 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-2">Professional Quality</h3>
                    <p className="text-foreground/70 text-sm">
                      Expert technicians using premium products and proven techniques for outstanding results.
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white border-border/40 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-2">Fast Turnaround</h3>
                    <p className="text-foreground/70 text-sm">
                      Efficient service without compromising quality. Most details completed in 2-5 hours.
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white border-border/40 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-2">Customer Focused</h3>
                    <p className="text-foreground/70 text-sm">
                      Your satisfaction is our priority. Flexible scheduling and personalized service.
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white border-border/40 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-2">Eco-Friendly Products</h3>
                    <p className="text-foreground/70 text-sm">
                      We use environmentally responsible products that are safe for you and your vehicle.
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedElement>

            <AnimatedElement delay={400}>
              <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white border-border/40 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-2">Fully Insured</h3>
                    <p className="text-foreground/70 text-sm">
                      Complete peace of mind with our fully insured and bonded service.
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedElement>

            <AnimatedElement delay={500}>
              <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white border-border/40 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-2">Satisfaction Guaranteed</h3>
                    <p className="text-foreground/70 text-sm">
                      We stand behind our work. If you&apos;re not happy, we&apos;ll make it right.
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{
          backgroundImage: 'radial-gradient(circle, rgba(71,71,215,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Ready to Experience the Difference?
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                Join hundreds of satisfied customers across Dallas who trust K&J Cleaner Car for their detailing needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 hover:scale-105 transition-all shadow-lg">
                  <Link to="/services">View Services</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 hover:bg-primary/5 hover:scale-105 transition-all">
                  <a href="tel:2143670617">
                    <Phone className="w-5 h-5 mr-2" />
                    (214) 367-0617
                  </a>
                </Button>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
