import { useEffect, useState } from 'react';
import { Calendar, Clock, User, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useForm } from 'react-hook-form';

interface BookingFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
}

export default function BookingPage() {
  const [services, setServices] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>();

  useEffect(() => {
    loadBookingData();
  }, []);

  const loadBookingData = async () => {
    try {
      setIsLoading(true);
      // In a real implementation, you would fetch from Wix Bookings API
      // For now, we'll show the booking form structure
      // The actual integration would use Wix's bookings service
      setServices([
        { id: '1', name: 'Interior Detailing', duration: '2 hours' },
        { id: '2', name: 'Exterior Detailing', duration: '1.5 hours' },
        { id: '3', name: 'Full Detailing', duration: '3 hours' },
        { id: '4', name: 'Ceramic Coating', duration: '4 hours' }
      ]);
      setStaff([
        { id: '1', name: 'John - Lead Detailer' },
        { id: '2', name: 'Mike - Senior Detailer' },
        { id: '3', name: 'Sarah - Specialist' }
      ]);
    } catch (error) {
      console.error('Error loading booking data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    try {
      setIsSubmitting(true);
      // In a real implementation, this would call the Wix Bookings API
      // to create an actual booking in the system
      console.log('Booking data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setBookingSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setBookingSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center py-40">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{
          backgroundImage: 'radial-gradient(circle, rgba(22,123,246,0.08) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
        
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Book Your Appointment
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
              Schedule your car detailing service at a time that works best for you. Our expert team is ready to make your vehicle shine.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {bookingSuccess && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  ✓ Booking submitted successfully! We'll confirm your appointment shortly.
                </p>
              </div>
            )}

            <Card className="bg-white border-border/40 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/40">
                <CardTitle className="text-2xl font-heading text-foreground">
                  Schedule Your Service
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Your Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Full Name *
                        </label>
                        <Input
                          {...register('customerName', { required: 'Name is required' })}
                          placeholder="John Doe"
                          className="border-border/40"
                        />
                        {errors.customerName && (
                          <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
                        <Input
                          {...register('customerEmail', { 
                            required: 'Email is required',
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
                          })}
                          type="email"
                          placeholder="john@example.com"
                          className="border-border/40"
                        />
                        {errors.customerEmail && (
                          <p className="text-red-500 text-sm mt-1">{errors.customerEmail.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone *
                        </label>
                        <Input
                          {...register('customerPhone', { required: 'Phone is required' })}
                          placeholder="(214) 367-0617"
                          className="border-border/40"
                        />
                        {errors.customerPhone && (
                          <p className="text-red-500 text-sm mt-1">{errors.customerPhone.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="pt-6 border-t border-border/40">
                    <h3 className="text-lg font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Select Service
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Service *
                      </label>
                      <select
                        {...register('serviceId', { required: 'Please select a service' })}
                        className="w-full px-4 py-2 border border-border/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                      >
                        <option value="">Choose a service...</option>
                        {services.map(service => (
                          <option key={service.id} value={service.id}>
                            {service.name} - {service.duration}
                          </option>
                        ))}
                      </select>
                      {errors.serviceId && (
                        <p className="text-red-500 text-sm mt-1">{errors.serviceId.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Staff Selection */}
                  <div className="pt-6 border-t border-border/40">
                    <h3 className="text-lg font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Preferred Specialist
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Staff Member (Optional)
                      </label>
                      <select
                        {...register('staffId')}
                        className="w-full px-4 py-2 border border-border/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                      >
                        <option value="">Any available specialist</option>
                        {staff.map(member => (
                          <option key={member.id} value={member.id}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date & Time Selection */}
                  <div className="pt-6 border-t border-border/40">
                    <h3 className="text-lg font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Preferred Date & Time
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Date *
                        </label>
                        <Input
                          {...register('date', { required: 'Date is required' })}
                          type="date"
                          className="border-border/40"
                        />
                        {errors.date && (
                          <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Time *
                        </label>
                        <Input
                          {...register('time', { required: 'Time is required' })}
                          type="time"
                          className="border-border/40"
                        />
                        {errors.time && (
                          <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-border/40">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white hover:bg-primary/90 h-12 text-base font-semibold"
                    >
                      {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                    </Button>
                    <p className="text-sm text-foreground/60 mt-4 text-center">
                      We'll send you a confirmation email with all the details.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="bg-white border-border/40 rounded-xl">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-heading font-bold text-foreground mb-2">Flexible Scheduling</h4>
                  <p className="text-sm text-foreground/70">
                    Choose a date and time that works best for you
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-border/40 rounded-xl">
                <CardContent className="p-6 text-center">
                  <User className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-heading font-bold text-foreground mb-2">Expert Team</h4>
                  <p className="text-sm text-foreground/70">
                    Work with our experienced detailing specialists
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-border/40 rounded-xl">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-heading font-bold text-foreground mb-2">Quick Confirmation</h4>
                  <p className="text-sm text-foreground/70">
                    Get instant confirmation via email
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
