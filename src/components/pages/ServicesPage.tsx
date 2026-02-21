import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import type { DetailingServices } from '@/entities';

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

export default function ServicesPage() {
  const [services, setServices] = useState<DetailingServices[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const result = await BaseCrudService.getAll<DetailingServices>('detailingservices');
      setServices(result.items);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
                Our Detailing Services
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
                Professional mobile car detailing packages designed to keep your vehicle looking its best. Choose the service that fits your needs.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : services.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <AnimatedElement key={service._id} delay={index * 100}>
                    <Card className="group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-white border-border/40 rounded-2xl overflow-hidden">
                      {service.itemImage && (
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={service.itemImage}
                            alt={service.itemName || 'Detailing service'}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            width={600}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          {service.itemPrice && (
                            <div className="absolute bottom-4 left-4">
                              <div className="bg-primary text-white px-4 py-2 rounded-full">
                                <span className="text-2xl font-bold">${service.itemPrice}</span>
                                <span className="text-sm ml-1">starting at</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-2xl font-heading font-bold text-foreground">
                            {service.itemName}
                          </h3>
                        </div>

                        {service.serviceDuration && (
                          <div className="flex items-center gap-2 text-foreground/70 mb-4">
                            <Clock className="w-5 h-5 text-primary" />
                            <span className="font-medium">{service.serviceDuration}</span>
                          </div>
                        )}

                        {service.itemDescription && (
                          <p className="text-foreground/70 mb-6 leading-relaxed">
                            {service.itemDescription}
                          </p>
                        )}

                        {service.whatsIncluded && (
                          <div className="mb-6">
                            <h4 className="font-heading font-bold text-foreground mb-3">What&apos;s Included:</h4>
                            <div className="space-y-2">
                              {service.whatsIncluded.split('\n').filter(item => item.trim()).map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                  <span className="text-foreground/80 text-sm">{item.trim()}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <Button className="w-full bg-primary text-white hover:bg-primary/90 hover:scale-105 transition-all">
                          <a href="tel:2143670617" className="flex items-center justify-center gap-2 w-full">
                            <Phone className="w-5 h-5" />
                            Book This Service
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-foreground/60 text-lg">No services available at the moment.</p>
              </div>
            )}
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
                Not Sure Which Service to Choose?
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                Call us today and we&apos;ll help you find the perfect detailing package for your vehicle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 hover:scale-105 transition-all shadow-lg">
                  <a href="tel:2143670617">
                    <Phone className="w-5 h-5 mr-2" />
                    (214) 367-0617
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 hover:bg-primary/5 hover:scale-105 transition-all">
                  <Link to="/contact">Contact Us</Link>
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
