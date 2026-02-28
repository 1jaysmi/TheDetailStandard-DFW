// TheDetailStandard-DFW - Updated Homepage
npm run release
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
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ─── Gold/Black Color Tokens (override via CSS variables in your Wix theme) ───
// --gold:       #C9A84C
// --gold-light: #E8C96A
// --gold-dark:  #9A7A2E
// --black:      #0A0A0A
// --charcoal:   #111111
// --off-white:  #F5F0E8

// ─── Hardcoded Pricing Data ───────────────────────────────────────────────────
const SERVICES = {
  sedan: [
    {
      id: 's1',
      name: 'Express Interior',
      price: 99,
      duration: '1–1.5 hrs',
      badge: 'Most Popular',
      description: 'Quick refresh for sedans & coupes. Perfect for regular maintenance.',
      features: [
        'Vacuum all surfaces',
        'Wipe down dashboard & console',
        'Window cleaning (interior)',
        'Door panel wipe-down',
        'Cup holder & crevice clean',
        'Air freshener',
      ],
    },
    {
      id: 's2',
      name: 'Full Interior Detail',
      price: 179,
      duration: '2.5–3.5 hrs',
      badge: 'Best Value',
      description: 'Deep clean for sedans & coupes. Restores like-new interior condition.',
      features: [
        'Everything in Express',
        'Steam clean vents & crevices',
        'Leather/vinyl conditioning',
        'Carpet shampoo & extraction',
        'Headliner spot clean',
        'Pet hair removal',
      ],
    },
    {
      id: 's3',
      name: 'Full Detail Package',
      price: 279,
      duration: '4–6 hrs',
      badge: 'Premium',
      description: 'Complete interior + exterior transformation for sedans & coupes.',
      features: [
        'Everything in Full Interior',
        'Hand wash & dry',
        'Clay bar decontamination',
        'Tire dressing & rim clean',
        'Exterior wipe-down',
        'Paint sealant application',
      ],
    },
  ],
  truck: [
    {
      id: 't1',
      name: 'Express Interior',
      price: 129,
      duration: '1.5–2 hrs',
      badge: 'Most Popular',
      description: 'Quick refresh for trucks & SUVs. Perfect for regular maintenance.',
      features: [
        'Vacuum all surfaces',
        'Wipe down dashboard & console',
        'Window cleaning (interior)',
        'Door panel wipe-down',
        'Cup holder & crevice clean',
        'Air freshener',
      ],
    },
    {
      id: 't2',
      name: 'Full Interior Detail',
      price: 219,
      duration: '3–4.5 hrs',
      badge: 'Best Value',
      description: 'Deep clean for trucks & SUVs. Restores like-new interior condition.',
      features: [
        'Everything in Express',
        'Steam clean vents & crevices',
        'Leather/vinyl conditioning',
        'Carpet shampoo & extraction',
        'Headliner spot clean',
        'Pet hair removal',
      ],
    },
    {
      id: 't3',
      name: 'Full Detail Package',
      price: 329,
      duration: '5–7 hrs',
      badge: 'Premium',
      description: 'Complete interior + exterior transformation for trucks & SUVs.',
      features: [
        'Everything in Full Interior',
        'Hand wash & dry',
        'Clay bar decontamination',
        'Tire dressing & rim clean',
        'Exterior wipe-down',
        'Paint sealant application',
      ],
    },
  ],
};

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Marcus T.',
    location: 'Plano, TX',
    rating: 5,
    text: 'TheDetailStandard came to my office and had my truck looking brand new in under 4 hours. Absolutely worth every penny.',
  },
  {
    id: 2,
    name: 'Destiny R.',
    location: 'Frisco, TX',
    rating: 5,
    text: 'I was skeptical about a mobile detail service but wow — they exceeded every expectation. My car smells and looks incredible.',
  },
  {
    id: 3,
    name: 'Jerome W.',
    location: 'Dallas, TX',
    rating: 5,
    text: 'Professional, on time, and detailed to perfection. This is the only detailing company I'll ever use in DFW.',
  },
];

// ─── Animation Helper ─────────────────────────────────────────────────────────
const AnimatedElement = ({ children, className = '', delay = 0, direction = 'up' }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'fade';
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); observer.unobserve(el); } },
      { threshold: 0.1, rootMargin: '50px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const transform = !visible
    ? direction === 'up' ? 'translateY(32px)' : direction === 'left' ? 'translateX(-32px)' : direction === 'right' ? 'translateX(32px)' : 'none'
    : 'none';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform,
        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
      }}
    >
      {children}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sedan');

  const services = SERVICES[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', fontFamily: "'Playfair Display', Georgia, serif", overflowX: 'hidden' }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Lato:wght@300;400;700&display=swap');

        :root {
          --gold: #C9A84C;
          --gold-light: #E8C96A;
          --gold-dark: #9A7A2E;
          --black: #0A0A0A;
          --charcoal: #111111;
          --off-white: #F5F0E8;
          --gray: #888;
        }

        * { box-sizing: border-box; }

        .btn-gold {
          background: linear-gradient(135deg, #C9A84C, #E8C96A, #9A7A2E);
          color: #0A0A0A;
          border: none;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-gold:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(201,168,76,0.4); }

        .btn-outline-gold {
          background: transparent;
          color: #C9A84C;
          border: 1.5px solid #C9A84C;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-outline-gold:hover { background: rgba(201,168,76,0.1); transform: translateY(-2px); }

        .gold-divider {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
          margin: 0 auto 24px;
        }

        .service-card {
          background: #111111;
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.35s ease;
        }
        .service-card:hover {
          border-color: rgba(201,168,76,0.6);
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(201,168,76,0.15);
        }

        .tab-btn {
          padding: 10px 28px;
          border-radius: 99px;
          border: none;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .tab-active { background: linear-gradient(135deg, #C9A84C, #E8C96A); color: #0A0A0A; }
        .tab-inactive { background: transparent; color: #888; }
        .tab-inactive:hover { color: #C9A84C; }

        .testimonial-card {
          background: #111;
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 16px;
          padding: 36px;
          transition: border-color 0.3s;
        }
        .testimonial-card:hover { border-color: rgba(201,168,76,0.4); }

        @keyframes scrollBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        .scroll-bounce { animation: scrollBounce 1.5s ease-in-out infinite; }

        @keyframes ping { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.5);opacity:0} }
        .map-ping { animation: ping 2s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0A', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1208 50%, #0A0A0A 100%)' }} />
        {/* Gold grain overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')", opacity: 0.3 }} />
        {/* Gold radial glow */}
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '80px 24px', maxWidth: '900px', margin: '0 auto' }}>
          <AnimatedElement delay={0}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '99px', border: '1px solid rgba(201,168,76,0.4)', background: 'rgba(201,168,76,0.08)', marginBottom: '32px' }}>
              <Sparkles style={{ width: '14px', height: '14px', color: '#C9A84C' }} />
              <span style={{ fontSize: '12px', fontFamily: "'Lato', sans-serif", fontWeight: 700, color: '#C9A84C', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Convenient · Reliable · Transparent
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={100}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 900, color: '#F5F0E8', lineHeight: 1.1, marginBottom: '8px', letterSpacing: '-0.01em' }}>
              TheDetailStandard
            </h1>
            <h2 style={{ fontFamily: "'Lato', sans-serif", fontSize: 'clamp(14px, 2.5vw, 22px)', fontWeight: 300, color: '#C9A84C', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '24px' }}>
              DFW's Premier Mobile Detailing
            </h2>
          </AnimatedElement>

          <div className="gold-divider" />

          <AnimatedElement delay={200}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '18px', color: 'rgba(245,240,232,0.7)', marginBottom: '48px', lineHeight: 1.8, maxWidth: '580px', margin: '0 auto 48px' }}>
              We bring the detail shop to your door — delivering showroom-quality results at your home or office, anywhere in Dallas-Fort Worth.
            </p>
          </AnimatedElement>

          <AnimatedElement delay={300}>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-gold" style={{ padding: '16px 40px', borderRadius: '99px', fontSize: '14px' }} onClick={() => navigate('/services')}>
                Book Now
              </button>
              <button className="btn-outline-gold" style={{ padding: '16px 40px', borderRadius: '99px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => window.location.href = 'tel:2143670617'}>
                <Phone style={{ width: '16px', height: '16px' }} />
                (214) 367-0617
              </button>
            </div>
          </AnimatedElement>
        </div>

        <div className="scroll-bounce" style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: '24px', height: '40px', border: '1.5px solid rgba(201,168,76,0.4)', borderRadius: '12px', display: 'flex', justifyContent: 'center', padding: '4px' }}>
            <div style={{ width: '4px', height: '8px', background: '#C9A84C', borderRadius: '2px' }} />
          </div>
        </div>
      </section>

      {/* ── GOLD BANNER ── */}
      <section style={{ background: 'linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C96A, #C9A84C, #9A7A2E)', padding: '40px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')", opacity: 0.08 }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px', position: 'relative', zIndex: 1 }}>
          {[
            { icon: <Sparkles />, title: 'Unlimited Bookings', sub: 'Book as often as you need' },
            { icon: <Shield />, title: 'Pause or Cancel Anytime', sub: 'Flexible, no-hassle membership' },
            { icon: <Clock />, title: 'Fast Turnaround', sub: 'Same-day service available' },
          ].map((item, i) => (
            <AnimatedElement key={i} delay={i * 80} direction={i === 0 ? 'left' : i === 2 ? 'right' : 'up'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                <div style={{ padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', color: '#0A0A0A' }}>
                  {React.cloneElement(item.icon, { style: { width: '24px', height: '24px' } })}
                </div>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '16px', color: '#0A0A0A', margin: 0 }}>{item.title}</p>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '13px', color: 'rgba(0,0,0,0.6)', margin: 0 }}>{item.sub}</p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </section>

      {/* ── SERVICES / PRICING ── */}
      <section style={{ padding: '100px 24px', background: '#0A0A0A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <AnimatedElement>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '16px' }}>Pricing</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#F5F0E8', margin: '0 0 16px' }}>
                Packages Built for Every Vehicle
              </h2>
              <div className="gold-divider" />
              <p style={{ fontFamily: "'Lato', sans-serif", color: '#888', fontSize: '16px', maxWidth: '500px', margin: '0 auto 40px' }}>
                Choose your vehicle type below. All services are mobile — we come to you.
              </p>

              {/* Tabs */}
              <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '99px', border: '1px solid rgba(201,168,76,0.15)' }}>
                <button className={`tab-btn ${activeTab === 'sedan' ? 'tab-active' : 'tab-inactive'}`} onClick={() => setActiveTab('sedan')}>Sedan / Coupe</button>
                <button className={`tab-btn ${activeTab === 'truck' ? 'tab-active' : 'tab-inactive'}`} onClick={() => setActiveTab('truck')}>Truck / SUV</button>
              </div>
            </div>
          </AnimatedElement>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {services.map((svc, i) => (
              <AnimatedElement key={svc.id} delay={i * 100}>
                <div className="service-card" style={{ position: 'relative' }}>
                  {/* Top gold bar */}
                  <div style={{ height: '3px', background: 'linear-gradient(90deg, #9A7A2E, #E8C96A, #9A7A2E)' }} />
                  
                  <div style={{ padding: '32px' }}>
                    {/* Badge */}
                    <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '99px', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', fontSize: '11px', fontFamily: "'Lato', sans-serif", fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
                      {svc.badge}
                    </span>

                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#F5F0E8', margin: '0 0 6px' }}>
                      {svc.name}
                    </h3>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '13px', color: '#888', margin: '0 0 20px' }}>{svc.description}</p>

                    {/* Price */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', fontWeight: 900, color: '#C9A84C', lineHeight: 1 }}>${svc.price}</span>
                      <span style={{ fontFamily: "'Lato', sans-serif", fontSize: '13px', color: '#888' }}>starting at</span>
                    </div>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '12px', color: '#666', marginBottom: '28px' }}>
                      <Clock style={{ width: '12px', height: '12px', display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                      {svc.duration}
                    </p>

                    {/* Divider */}
                    <div style={{ height: '1px', background: 'rgba(201,168,76,0.1)', marginBottom: '24px' }} />

                    {/* Features */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                      {svc.features.map((f, fi) => (
                        <div key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <div style={{ minWidth: '18px', minHeight: '18px', borderRadius: '50%', background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
                            <Check style={{ width: '10px', height: '10px', color: '#C9A84C' }} />
                          </div>
                          <span style={{ fontFamily: "'Lato', sans-serif", fontSize: '14px', color: 'rgba(245,240,232,0.75)', lineHeight: 1.4 }}>{f}</span>
                        </div>
                      ))}
                    </div>

                    <button className="btn-gold" style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '13px' }} onClick={() => navigate('/services')}>
                      Book Appointment
                    </button>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '100px 24px', background: '#111' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <AnimatedElement>
            <div style={{ textAlign: 'center', marginBottom: '72px' }}>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '16px' }}>Process</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#F5F0E8', margin: '0 0 16px' }}>
                Book With Your Fingertips
              </h2>
              <div className="gold-divider" />
            </div>
          </AnimatedElement>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '48px' }}>
            {[
              { icon: <Car />, step: '01', title: 'We Come to You', desc: 'Select your location — home, office, or anywhere in DFW. We arrive fully equipped.' },
              { icon: <Calendar />, step: '02', title: 'Choose Your Time', desc: 'Available 7 days a week. Pick a time that works for your schedule.' },
              { icon: <CreditCard />, step: '03', title: 'Pay After Service', desc: 'Secure payment collected only after you're fully satisfied with the results.' },
            ].map((item, i) => (
              <AnimatedElement key={i} delay={i * 120}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                      {React.cloneElement(item.icon, { style: { width: '32px', height: '32px', color: '#C9A84C' } })}
                    </div>
                    <span style={{ position: 'absolute', top: '-8px', right: '-8px', fontFamily: "'Playfair Display', serif", fontSize: '12px', fontWeight: 700, color: '#C9A84C', background: '#111', padding: '2px 6px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '4px' }}>{item.step}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: '#F5F0E8', marginBottom: '12px' }}>{item.title}</h3>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '14px', color: '#888', lineHeight: 1.7, maxWidth: '260px', margin: '0 auto' }}>{item.desc}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA ── */}
      <section style={{ background: '#0A0A0A', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', minHeight: '560px' }}>
          <div style={{ padding: '80px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Lato', sans-serif", fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '16px', display: 'block' }}>Service Area</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#F5F0E8', marginBottom: '24px', lineHeight: 1.2 }}>
              Serving All of Dallas-Fort Worth
            </h2>
            <div style={{ width: '50px', height: '2px', background: 'linear-gradient(90deg, #C9A84C, transparent)', marginBottom: '24px' }} />
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '16px', color: '#888', lineHeight: 1.8, marginBottom: '40px' }}>
              Our mobile units cover a 50-mile radius around the DFW metroplex — from Downtown Dallas to the suburbs.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              {[
                { icon: <MapPin />, title: 'Dallas, TX', sub: 'Headquarters' },
                { icon: <Clock />, title: 'Mon – Sun: 7am – 7pm', sub: 'Operating Hours' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {React.cloneElement(item.icon, { style: { width: '16px', height: '16px', color: '#C9A84C' } })}
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, color: '#F5F0E8', margin: 0, fontSize: '15px' }}>{item.title}</p>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '12px', color: '#666', margin: 0 }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-gold" style={{ padding: '14px 36px', borderRadius: '99px', fontSize: '13px', width: 'fit-content' }} onClick={() => navigate('/contact')}>
              Check Your Area
            </button>
          </div>

          {/* Map side */}
          <div style={{ background: '#111', position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="map-ping" style={{ position: 'absolute', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(201,168,76,0.25)' }} />
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#C9A84C', border: '3px solid #F5F0E8', boxShadow: '0 0 20px rgba(201,168,76,0.5)' }} />
              </div>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '13px', color: '#666', marginTop: '24px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Dallas-Fort Worth, TX</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GIFT CARD ── */}
      <section style={{ padding: '100px 24px', background: '#111' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ background: '#0A0A0A', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '24px', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div style={{ padding: '60px 48px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#C9A84C', marginBottom: '20px' }}>
                <Gift style={{ width: '18px', height: '18px' }} />
                <span style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Special Offer</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 900, color: '#F5F0E8', marginBottom: '16px', lineHeight: 1.2 }}>
                Give the Gift of Clean
              </h2>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '15px', color: '#888', lineHeight: 1.7, marginBottom: '36px' }}>
                The perfect gift for car lovers in DFW. Purchase a digital gift card instantly and send it to anyone.
              </p>
              <button className="btn-gold" style={{ padding: '14px 36px', borderRadius: '99px', fontSize: '13px' }} onClick={() => navigate('/services')}>
                Purchase Gift Card
              </button>
            </div>
            <div style={{ background: 'rgba(201,168,76,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 48px' }}>
              <div style={{ width: '160px', aspectRatio: '9/16', background: 'linear-gradient(160deg, #1a1208, #0A0A0A)', borderRadius: '24px', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', transform: 'rotate(-5deg)', transition: 'transform 0.4s ease', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                <Sparkles style={{ width: '28px', height: '28px', color: '#C9A84C' }} />
                <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '16px', color: '#F5F0E8', margin: 0 }}>GOLD</p>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '10px', color: '#666', margin: 0, letterSpacing: '0.15em' }}>PREMIUM CARD</p>
                <div style={{ marginTop: '24px', fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 900, color: '#C9A84C' }}>$100</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '100px 24px', background: '#0A0A0A' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <AnimatedElement>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '16px' }}>Reviews</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#F5F0E8', margin: '0 0 16px' }}>
                What Our Customers Say
              </h2>
              <div className="gold-divider" />
              <p style={{ fontFamily: "'Lato', sans-serif", color: '#888', fontSize: '16px' }}>
                Join hundreds of satisfied customers across the DFW area.
              </p>
            </div>
          </AnimatedElement>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {TESTIMONIALS.map((t, i) => (
              <AnimatedElement key={t.id} delay={i * 100}>
                <div className="testimonial-card">
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} style={{ width: '16px', height: '16px', fill: si < t.rating ? '#C9A84C' : 'transparent', color: si < t.rating ? '#C9A84C' : '#444' }} />
                    ))}
                  </div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', color: 'rgba(245,240,232,0.8)', fontStyle: 'italic', lineHeight: 1.8, marginBottom: '28px' }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '18px', color: '#C9A84C' }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, color: '#F5F0E8', margin: 0, fontSize: '15px' }}>{t.name}</p>
                      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '12px', color: '#666', margin: 0 }}>{t.location}</p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '100px 24px', background: 'linear-gradient(135deg, #0d0b05, #1a1208, #0d0b05)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')", opacity: 0.15 }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <AnimatedElement>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '20px' }}>Get Started</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#F5F0E8', marginBottom: '20px', lineHeight: 1.1 }}>
              Ready to Set the Standard?
            </h2>
            <div className="gold-divider" />
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '18px', color: 'rgba(245,240,232,0.6)', marginBottom: '48px', lineHeight: 1.7 }}>
              Book your appointment today and experience the finest mobile detailing in Dallas-Fort Worth.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-gold" style={{ padding: '18px 48px', borderRadius: '99px', fontSize: '14px' }} onClick={() => navigate('/services')}>
                Book Appointment
              </button>
              <button className="btn-outline-gold" style={{ padding: '18px 48px', borderRadius: '99px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => window.location.href = 'tel:2143670617'}>
                <Phone style={{ width: '16px', height: '16px' }} />
                Call Us Now
              </button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}


}
