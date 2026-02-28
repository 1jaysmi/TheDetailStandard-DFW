# Wix Bookings API Integration

This document describes the integration of Wix Bookings API endpoints for Services, Staff, and Schedule management.

## Overview

The bookings integration provides a complete interface to interact with Wix's Bookings collections:
- **Services** (`Bookings/Services`) - Available detailing services
- **Staff** (`Bookings/Staff`) - Team members and specialists
- **Schedule** (`Bookings/Schedule`) - Available time slots and booking availability

## Architecture

### File Structure

```
src/
├── integrations/
│   └── bookings/
│       ├── index.ts          # Main export file
│       ├── types.ts          # TypeScript interfaces
│       └── service.ts        # API service functions
├── hooks/
│   └── useBookings.ts        # Custom React hooks
└── components/
    └── pages/
        └── BookingPage.tsx   # Booking form component
```

### Core Types

#### BookingsService
```typescript
interface BookingsService {
  _id: string;
  serviceName: string;
  description?: string;
  duration?: number;        // in minutes
  price?: number;
  category?: string;
  image?: string;
  _createdDate?: Date;
  _updatedDate?: Date;
}
```

#### BookingsStaff
```typescript
interface BookingsStaff {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  image?: string;
  bio?: string;
  _createdDate?: Date;
  _updatedDate?: Date;
}
```

#### BookingsSchedule
```typescript
interface BookingsSchedule {
  _id: string;
  staffId: string;
  serviceId: string;
  startTime: string;        // ISO 8601 format
  endTime: string;
  status: 'available' | 'booked' | 'blocked';
  _createdDate?: Date;
  _updatedDate?: Date;
}
```

## API Functions

### Service Functions

#### `getServices(): Promise<BookingsService[]>`
Fetches all available services from the Bookings/Services collection.

```typescript
import { getServices } from '@/integrations/bookings';

const services = await getServices();
services.forEach(service => {
  console.log(`${service.serviceName} - $${service.price}`);
});
```

#### `getService(serviceId: string): Promise<BookingsService | null>`
Fetches a single service by ID.

```typescript
const service = await getService('service-123');
if (service) {
  console.log(`Duration: ${service.duration} minutes`);
}
```

#### `getStaff(): Promise<BookingsStaff[]>`
Fetches all staff members from the Bookings/Staff collection.

```typescript
import { getStaff } from '@/integrations/bookings';

const staff = await getStaff();
staff.forEach(member => {
  console.log(`${member.name} - ${member.email}`);
});
```

#### `getStaffMember(staffId: string): Promise<BookingsStaff | null>`
Fetches a single staff member by ID.

```typescript
const member = await getStaffMember('staff-123');
if (member) {
  console.log(`Bio: ${member.bio}`);
}
```

#### `getAvailableSlots(serviceId: string, staffId?: string, startDate?: string, endDate?: string): Promise<BookingsSchedule[]>`
Fetches available time slots for a service, optionally filtered by staff member and date range.

```typescript
const slots = await getAvailableSlots(
  'service-123',
  'staff-456',
  '2024-03-01',
  '2024-03-31'
);

slots.forEach(slot => {
  console.log(`Available: ${slot.startTime} - ${slot.endTime}`);
});
```

#### `createBooking(bookingData: BookingRequest): Promise<BookingResponse | null>`
Creates a new booking with customer information and service details.

```typescript
const booking = await createBooking({
  serviceId: 'service-123',
  staffId: 'staff-456',
  startTime: '2024-03-15T10:00:00Z',
  endTime: '2024-03-15T12:00:00Z',
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  customerPhone: '(214) 367-0617',
  notes: 'Please bring the car clean'
});
```

## Custom Hooks

### `useBookingsServices()`
Hook for fetching and managing services data.

```typescript
import { useBookingsServices } from '@/hooks/useBookings';

function MyComponent() {
  const { services, isLoading, error } = useBookingsServices();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {services.map(service => (
        <li key={service._id}>{service.serviceName}</li>
      ))}
    </ul>
  );
}
```

### `useBookingsStaff()`
Hook for fetching and managing staff data.

```typescript
import { useBookingsStaff } from '@/hooks/useBookings';

function StaffList() {
  const { staff, isLoading, error } = useBookingsStaff();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {staff.map(member => (
        <li key={member._id}>{member.name}</li>
      ))}
    </ul>
  );
}
```

### `useAvailableSlots(serviceId?, staffId?, startDate?, endDate?)`
Hook for fetching available time slots with automatic refetching when parameters change.

```typescript
import { useAvailableSlots } from '@/hooks/useBookings';

function AvailableSlots() {
  const { slots, isLoading, error } = useAvailableSlots(
    'service-123',
    'staff-456',
    '2024-03-01',
    '2024-03-31'
  );
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {slots.map(slot => (
        <li key={slot._id}>
          {new Date(slot.startTime).toLocaleString()}
        </li>
      ))}
    </ul>
  );
}
```

### `useCreateBooking()`
Hook for creating bookings with loading and error states.

```typescript
import { useCreateBooking } from '@/hooks/useBookings';

function BookingForm() {
  const { submit, isLoading, error } = useCreateBooking();
  
  const handleSubmit = async (formData) => {
    const booking = await submit({
      serviceId: formData.serviceId,
      staffId: formData.staffId,
      startTime: formData.startTime,
      endTime: formData.endTime,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
    });
    
    if (booking) {
      console.log('Booking created:', booking);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {/* form fields */}
      <button disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Book Now'}
      </button>
    </form>
  );
}
```

## Implementation in BookingPage

The `BookingPage.tsx` component demonstrates the full integration:

1. **Data Loading**: Uses `getServices()` and `getStaff()` to populate dropdowns
2. **Form Submission**: Creates bookings with `createBooking()`
3. **Error Handling**: Displays user-friendly error messages
4. **Loading States**: Shows spinners and disabled buttons during operations

### Key Features

- Real-time data from Wix Bookings collections
- Automatic duration calculation for end time
- Customer information validation
- Success/error notifications
- Responsive form design

## Integration Points

### Collections Used

1. **Bookings/Services** - Wix App Collection
   - Displays available detailing services
   - Shows service duration and pricing
   - Provides service selection in booking form

2. **Bookings/Staff** - Wix App Collection
   - Lists available staff members
   - Allows customer to request specific specialist
   - Optional selection (any available specialist)

3. **Bookings/Schedule** - Wix App Collection
   - Manages available time slots
   - Prevents double-booking
   - Tracks booking status

## Error Handling

All functions include try-catch blocks and return null or empty arrays on error:

```typescript
try {
  const services = await getServices();
} catch (error) {
  console.error('Error fetching services:', error);
  // Returns empty array
}
```

The hooks provide error states for UI feedback:

```typescript
const { services, isLoading, error } = useBookingsServices();

if (error) {
  return <div className="error">Failed to load services: {error}</div>;
}
```

## Future Enhancements

1. **Real-time Availability**: Implement WebSocket updates for live slot availability
2. **Booking Confirmation**: Send confirmation emails via Wix Mail API
3. **Calendar Integration**: Display calendar view of available slots
4. **Recurring Services**: Support for recurring bookings
5. **Payment Integration**: Connect to Wix Payments for service deposits
6. **Customer History**: Track customer booking history
7. **Cancellation Management**: Handle booking cancellations and rescheduling

## Testing

To test the integration:

1. Ensure Wix Bookings app is installed and configured
2. Add sample services, staff, and schedule data in Wix Dashboard
3. Navigate to `/booking` page
4. Verify services and staff load correctly
5. Submit a test booking and verify it's created

## Troubleshooting

### Services/Staff not loading
- Check that Bookings app is installed in Wix
- Verify collections have data in Wix Dashboard
- Check browser console for error messages

### Booking creation fails
- Verify all required fields are filled
- Check that selected service and staff exist
- Ensure date/time are in valid format

### Type errors
- Ensure all imports use the correct paths
- Verify entity types match Wix collection structure
- Check that BaseCrudService is properly imported

## References

- [Wix Bookings API Documentation](https://www.wix.com/velo/reference/wix-bookings)
- [Wix Collections Documentation](https://www.wix.com/velo/reference/wix-data)
- [React Hooks Documentation](https://react.dev/reference/react)
