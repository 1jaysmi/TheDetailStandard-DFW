/**
 * Wix Bookings API Types
 */

export interface BookingsService {
  _id: string;
  serviceName: string;
  description?: string;
  duration?: number; // in minutes
  price?: number;
  category?: string;
  image?: string;
  _createdDate?: Date;
  _updatedDate?: Date;
}

export interface BookingsStaff {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  image?: string;
  bio?: string;
  _createdDate?: Date;
  _updatedDate?: Date;
}

export interface BookingsSchedule {
  _id: string;
  staffId: string;
  serviceId: string;
  startTime: string; // ISO 8601 format
  endTime: string;
  status: 'available' | 'booked' | 'blocked';
  _createdDate?: Date;
  _updatedDate?: Date;
}

export interface BookingRequest {
  serviceId: string;
  staffId?: string;
  startTime: string;
  endTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
}

export interface BookingResponse {
  _id: string;
  serviceId: string;
  staffId?: string;
  startTime: string;
  endTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  _createdDate?: Date;
  _updatedDate?: Date;
}
