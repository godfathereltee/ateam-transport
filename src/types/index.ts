export type ServiceType = 'wheelchair' | 'stretcher' | 'ambulatory'

export type BookingStatus = 'pending' | 'confirmed' | 'dispatched' | 'completed' | 'cancelled'

export interface BookingRequest {
  id?: string
  facility_name: string
  facility_contact_name: string
  facility_contact_phone: string
  facility_contact_email?: string
  patient_initials: string // PHI-minimal: initials only at booking stage
  service_type: ServiceType
  pickup_date: string
  pickup_time: string
  pickup_address: string
  destination_name: string
  destination_address: string
  oxygen_required: boolean
  bariatric: boolean
  stairs: boolean
  notes?: string
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
  priority_rank: number // 1–62 outreach order
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
