export type TransportType =
  | 'standard_wheelchair'
  | 'bariatric_wheelchair'
  | 'stretcher'
  | 'ambulatory'

export type TripType = 'one_way' | 'round_trip'

export type BookingStatus = 'pending' | 'confirmed' | 'dispatched' | 'completed' | 'cancelled'

export interface BookingRequest {
  id?: string
  // Requester
  facility_contact_name: string
  facility_contact_phone: string
  facility_name: string
  confirmation_email?: string
  // Patient
  patient_name: string
  patient_weight?: string
  // Transport
  transport_type: TransportType
  trip_type: TripType
  pickup_date: string
  appt_time?: string
  pickup_time: string
  // Pickup
  pickup_address: string
  pickup_stairs: boolean
  pickup_notes?: string
  // Drop-off
  destination_address: string
  dropoff_stairs: boolean
  dropoff_notes?: string
  // Special
  oxygen_required: boolean
  status: BookingStatus
  created_at?: string
}

export interface Facility {
  id?: string
  name: string
  address?: string
  contact_name?: string
  contact_phone?: string
  contact_email?: string
  priority_rank: number
  status: 'active' | 'consistent' | 'historical'
  last_trip_date?: string
  engagement_status?: 'not_contacted' | 'contacted' | 'responded' | 'visit_scheduled' | 'reactivated'
  notes?: string
}

export interface Driver {
  id?: string
  name: string
  phone: string
  email?: string
  license_number: string
  license_expiry: string
  medical_cert_expiry: string
  background_check_expiry: string
  drug_test_expiry: string
  cpr_expiry: string
  nemt_cert_expiry?: string
  status: 'active' | 'inactive' | 'on_leave'
}
