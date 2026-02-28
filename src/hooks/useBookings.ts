/**
 * Custom hook for managing Bookings data
 */

import { useState, useEffect } from 'react';
import {
  getServices,
  getStaff,
  getAvailableSlots,
  createBooking,
  type BookingsService,
  type BookingsStaff,
  type BookingsSchedule,
  type BookingRequest,
  type BookingResponse,
} from '@/integrations/bookings';

export function useBookingsServices() {
  const [services, setServices] = useState<BookingsService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getServices();
        setServices(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load services');
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  return { services, isLoading, error };
}

export function useBookingsStaff() {
  const [staff, setStaff] = useState<BookingsStaff[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStaff = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getStaff();
        setStaff(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load staff');
      } finally {
        setIsLoading(false);
      }
    };

    loadStaff();
  }, []);

  return { staff, isLoading, error };
}

export function useAvailableSlots(
  serviceId?: string,
  staffId?: string,
  startDate?: string,
  endDate?: string
) {
  const [slots, setSlots] = useState<BookingsSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceId) {
      setSlots([]);
      setIsLoading(false);
      return;
    }

    const loadSlots = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAvailableSlots(serviceId, staffId, startDate, endDate);
        setSlots(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load available slots');
      } finally {
        setIsLoading(false);
      }
    };

    loadSlots();
  }, [serviceId, staffId, startDate, endDate]);

  return { slots, isLoading, error };
}

export function useCreateBooking() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (bookingData: BookingRequest): Promise<BookingResponse | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const booking = await createBooking(bookingData);
      return booking;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create booking';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, error };
}
