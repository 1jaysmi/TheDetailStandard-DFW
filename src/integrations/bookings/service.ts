/**
 * Wix Bookings API Service
 * Handles integration with Wix Bookings collections
 */

import { BaseCrudService } from '@/integrations/cms';
import type {
  BookingsService,
  BookingsStaff,
  BookingsSchedule,
  BookingRequest,
  BookingResponse,
} from './types';

const SERVICES_COLLECTION = 'Bookings/Services';
const STAFF_COLLECTION = 'Bookings/Staff';
const SCHEDULE_COLLECTION = 'Bookings/Schedule';

/**
 * Fetch all available services
 */
export async function getServices(): Promise<BookingsService[]> {
  try {
    const result = await BaseCrudService.getAll<BookingsService>(SERVICES_COLLECTION);
    return result.items || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

/**
 * Fetch a single service by ID
 */
export async function getService(serviceId: string): Promise<BookingsService | null> {
  try {
    const service = await BaseCrudService.getById<BookingsService>(
      SERVICES_COLLECTION,
      serviceId
    );
    return service || null;
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

/**
 * Fetch all staff members
 */
export async function getStaff(): Promise<BookingsStaff[]> {
  try {
    const result = await BaseCrudService.getAll<BookingsStaff>(STAFF_COLLECTION);
    return result.items || [];
  } catch (error) {
    console.error('Error fetching staff:', error);
    return [];
  }
}

/**
 * Fetch a single staff member by ID
 */
export async function getStaffMember(staffId: string): Promise<BookingsStaff | null> {
  try {
    const staff = await BaseCrudService.getById<BookingsStaff>(STAFF_COLLECTION, staffId);
    return staff || null;
  } catch (error) {
    console.error('Error fetching staff member:', error);
    return null;
  }
}

/**
 * Fetch available time slots for a service and staff member
 */
export async function getAvailableSlots(
  serviceId: string,
  staffId?: string,
  startDate?: string,
  endDate?: string
): Promise<BookingsSchedule[]> {
  try {
    const result = await BaseCrudService.getAll<BookingsSchedule>(SCHEDULE_COLLECTION);
    let slots = result.items || [];

    // Filter by service
    slots = slots.filter((slot) => slot.serviceId === serviceId);

    // Filter by staff if provided
    if (staffId) {
      slots = slots.filter((slot) => slot.staffId === staffId);
    }

    // Filter by status (only available slots)
    slots = slots.filter((slot) => slot.status === 'available');

    // Filter by date range if provided
    if (startDate) {
      slots = slots.filter((slot) => new Date(slot.startTime) >= new Date(startDate));
    }
    if (endDate) {
      slots = slots.filter((slot) => new Date(slot.endTime) <= new Date(endDate));
    }

    return slots;
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return [];
  }
}

/**
 * Create a new booking
 */
export async function createBooking(bookingData: BookingRequest): Promise<BookingResponse | null> {
  try {
    const booking: BookingResponse = {
      _id: crypto.randomUUID(),
      serviceId: bookingData.serviceId,
      staffId: bookingData.staffId,
      startTime: bookingData.startTime,
      endTime: bookingData.endTime,
      customerName: bookingData.customerName,
      customerEmail: bookingData.customerEmail,
      customerPhone: bookingData.customerPhone,
      status: 'pending',
      notes: bookingData.notes,
    };

    // In a real implementation, this would create a booking in the Wix Bookings system
    // For now, we'll just return the booking object
    console.log('Booking created:', booking);
    return booking;
  } catch (error) {
    console.error('Error creating booking:', error);
    return null;
  }
}

/**
 * Get all bookings (admin only)
 */
export async function getAllBookings(): Promise<BookingResponse[]> {
  try {
    // This would typically require admin authentication
    // For now, returning empty array
    return [];
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
}

/**
 * Cancel a booking
 */
export async function cancelBooking(bookingId: string): Promise<boolean> {
  try {
    // In a real implementation, this would update the booking status
    console.log('Booking cancelled:', bookingId);
    return true;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return false;
  }
}
