// The Detail Standard-DFW
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Phone,
  Star,
  Check,
  Sparkles,
  Clock,
  Shield,
  MapPin,
  Gift,
  ChevronRight,
  Car,
  Calendar,
  CreditCard,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import type { DetailingServices, Testimonials } from '@/entities';

// --- Animation Components ---

const AnimatedElement: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'fade';
}> = ({ children, className = "", delay = 0, direction = 'up' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.1, rootMargin: '50px' });

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translate-y-8';
        case 'left': return '-translate-x-8';
        case 'right': return 'translate-x-8';
        default: return '';
      }
    }
    return 'translate-y-0 translate-x-0';
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
};

// --- Main Component ---

export default function HomePage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<DetailingServices[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  // Fetch Data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch Services
        const servicesResult = await BaseCrudService.getAll<DetailingServices>('detailingservices');
        setServices(servicesResult.items);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setIsLoadingServices(false);
      }

      try {
        // Fetch Testimonials
        const testimonialsResult = await BaseCrudService.getAll<Testimonials>('testimonials');
        setTestimonials(testimonialsResult.items.filter(t => t.isApproved));
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setIsLoadingTestimonials(false);
      }
    };

    loadData();
  }, []);

  // Filter services based on active tab
  const filteredServices = services.filter(service => {
    if (activeTab === "sedan") return service.itemDescription?.toLowerCase().includes("sedan") || service.itemDescription?.toLowerCase().includes("coupe");
    if (activeTab === "truck") return service.itemDescription?.toLowerCase().includes("truck") || service.itemDescription?.toLowerCase().includes("suv");
    return true;
  });

  // Helper to parse features list
  const getFeaturesList = (text?: string) => {
    if (!text) return [];
    return text.split(/[\n,]/).map(item => item.trim()).filter(item => item.length > 0);
  };

  return (
    <div className="min-h-screen bg-background font-paragraph overflow-x-hidden">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/11062b_11062b11062b11062b11062b11062b11~mv2.jpg"
            alt="Luxury Car Detailing"
            className="w-full h-full object-cover opacity-60"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
          {/* Decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-radial from-primary/20 to-transparent opacity-40 pointer-events-none" />
        </div>

        <div className="container relative z-10 px-4 py-20 text-center">
          <AnimatedElement delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-white tracking-wide uppercase">Convenient. Reliable. Transparent.</span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={100}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight tracking-tight">
              #1 Car Detailing Services <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary/50 to-white">
                in Dallas, TX
              </span>
            </h1>
          </AnimatedElement>

          <AnimatedElement delay={200}>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Never lose that car shine - K&J Cleaner brings you the best car detailing Dallas can offer.
              Every service at your doorstep.
            </p>
          </AnimatedElement>

          <AnimatedElement delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white rounded-full shadow-[0_0_20px_rgba(22,123,246,0.4)] hover:shadow-[0_0_30px_rgba(22,123,246,0.6)] transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/services')}
              >
                Book Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-white/40 rounded-full backdrop-blur-sm transition-all duration-300"
                onClick={() => window.location.href = 'tel:2143670617'}
              >
                <Phone className="w-5 h-5 mr-2" />
                (214) 367-0617
              </Button>
            </div>
          </AnimatedElement>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* --- BLUE BANNER (FEATURES) --- */}
      <section className="bg-primary py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <AnimatedElement delay={0} direction="left" className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Unlimited requests</h3>
                <p className="text-white/80 text-sm">Book as often as you need</p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100} direction="up" className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Pause or cancel anytime</h3>
                <p className="text-white/80 text-sm">Flexible membership options</p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200} direction="right" className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Fast turnaround</h3>
                <p className="text-white/80 text-sm">Same day service available</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* --- PRICING / SERVICES SECTION --- */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedElement>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Transformations That Are Minutes Away
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get prices that work for you the best. Choose from our premium packages.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <div className="mt-8 flex justify-center">
                <div className="bg-secondary/50 p-1 rounded-full inline-flex">
                  {[
                    { id: 'sedan', label: 'Sedan/Coupe' },
                    { id: 'truck', label: 'Truck/SUV' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-white text-primary shadow-md'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </AnimatedElement>
          </div>

          {isLoadingServices ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner className="w-12 h-12 text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredServices.map((service, index) => (
                <AnimatedElement key={service._id} delay={index * 100}>
                  <Card className="h-full flex flex-col border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-3xl overflow-hidden group">
                    <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                          {service.serviceDuration || 'Best Value'}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl font-bold text-foreground">{service.itemName}</CardTitle>
                      <div className="mt-4 flex items-baseline">
                        <span className="text-4xl font-bold text-primary">${service.itemPrice}</span>
                        <span className="ml-2 text-muted-foreground text-sm">starting at</span>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-6 text-sm line-clamp-2">
                        {service.itemDescription}
                      </p>

                      <div className="space-y-3">
                        {getFeaturesList(service.whatsIncluded).slice(0, 6).map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="mt-1 min-w-[18px] min-h-[18px] rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="pt-4 pb-8">
                      <Button
                        className="w-full bg-foreground text-white hover:bg-foreground/90 h-12 rounded-xl text-base font-semibold shadow-lg shadow-foreground/20"
                        onClick={() => navigate('/services')}
                      >
                        Book Appointment
                      </Button>
                    </CardFooter>
                  </Card>
                </AnimatedElement>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Book an Appointment With Your Finger Tips
            </h2>
            <p className="text-muted-foreground">Simple, fast, and secure booking process.</p>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <AnimatedElement delay={0} className="text-center group">
              <div className="w-20 h-20 mx-auto bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <Car className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. We Come To You</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Select your location and we will come to your home or office fully equipped.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={100} className="text-center group">
              <div className="w-20 h-20 mx-auto bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <Calendar className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Detail Now</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Choose a time that works for you. We are available 7 days a week.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={200} className="text-center group">
              <div className="w-20 h-20 mx-auto bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <CreditCard className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Pay Later</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Secure payment after the service is completed to your satisfaction.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* --- MAP & LOCATION SECTION --- */}
      <section className="py-0 bg-black text-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left: Image/Content */}
          <div className="relative p-12 flex flex-col justify-center items-start z-10">
            <div className="absolute inset-0 z-0">
              <Image
                src="https://static.wixstatic.com/media/11062b_11062b11062b11062b11062b11062b11~mv2.jpg"
                alt="Garage"
                className="w-full h-full object-cover opacity-40"
                width={800}
                height={800}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-lg">
              <Badge className="mb-6 bg-primary text-white border-none px-4 py-1">Service Area</Badge>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                We are serving all of Dallas
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                From Downtown to the suburbs, our mobile units are ready to deploy.
                We cover a 50-mile radius around the Dallas metropolitan area.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">Dallas, TX</p>
                    <p className="text-sm text-gray-400">Headquarters</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">Mon - Sun: 7am - 7pm</p>
                    <p className="text-sm text-gray-400">Operating Hours</p>
                  </div>
                </div>
              </div>
              <Button className="mt-10 bg-white text-black hover:bg-gray-200 rounded-full px-8" onClick={() => navigate('/contact')}>
                Check Your Area
              </Button>
            </div>
          </div>

          {/* Right: Map Image */}
          <div className="relative h-[400px] lg:h-auto bg-gray-900">
            <Image
              src="https://static.wixstatic.com/media/11062b_11062b11062b11062b11062b11062b11~mv2.jpg"
              alt="Map of Dallas"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              width={800}
              height={800}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 bg-primary/30 rounded-full animate-ping absolute" />
              <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-xl relative z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* --- GIFT CARD SECTION --- */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-primary font-bold mb-4">
                  <Gift className="w-5 h-5" />
                  <span>SPECIAL OFFER</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  Give the Gift of Clean
                </h2>
                <p className="text-muted-foreground mb-8">
                  The perfect gift for car lovers. Purchase a digital gift card instantly and send it to friends or family.
                </p>
                <Button
                  className="w-fit bg-foreground text-white hover:bg-foreground/90 rounded-full px-8 h-12 shadow-lg"
                  onClick={() => navigate('/services')}
                >
                  Purchase Gift Card
                </Button>
              </div>
              <div className="bg-gray-100 relative min-h-[300px] flex items-center justify-center p-8">
                <div className="relative w-48 md:w-56 aspect-[9/16] bg-black rounded-[2rem] border-4 border-gray-800 shadow-2xl transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gray-900 rounded-[1.8rem] overflow-hidden flex flex-col items-center justify-center text-white p-4 text-center">
                    <Sparkles className="w-8 h-8 text-yellow-400 mb-2" />
                    <h3 className="font-bold text-xl mb-1">BLACK</h3>
                    <p className="text-xs text-gray-400">PREMIUM CARD</p>
                    <div className="mt-8 text-2xl font-bold">$100</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of satisfied customers who trust K&J Cleaner Car.
            </p>
          </AnimatedElement>

          {isLoadingTestimonials ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <AnimatedElement key={testimonial._id} delay={index * 100}>
                  <Card className="h-full p-8 bg-secondary/10 border-none rounded-2xl hover:bg-secondary/20 transition-colors duration-300">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < (testimonial.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-foreground/80 text-lg italic mb-8 leading-relaxed">
                      "{testimonial.reviewText}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                        {testimonial.customerName?.charAt(0) || 'C'}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{testimonial.customerName}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.customerLocation || 'Dallas, TX'}</p>
                      </div>
                    </div>
                  </Card>
                </AnimatedElement>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedElement>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Ready to Transform Your Car?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Book your appointment today and experience the best car detailing Dallas has to offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 rounded-full px-10 h-14 text-lg font-bold shadow-xl"
                onClick={() => navigate('/services')}
              >
                Book Appointment
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-10 h-14 text-lg font-bold"
                onClick={() => window.location.href = 'tel:2143670617'}
              >
                Call Us Now
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
