import { Suspense } from 'react';

export type IBookingCreateInput = {
  title: string;
  contactPerson: string;
  contactMobile: string;
  contactEmail: string;
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  logo: string;
  city: string;
  pincode: string;
  status: BookingStatus;
  state: string;
  country: string;
  gst: string;
  pan: string;
  estbId: string;
  cin: string;
  estbtDoc: any;
  panDoc: any;
  gstDoc: any;
  cinDoc: any;
  isVerified: boolean;
  isActive: boolean;
  profileImage: any;
};
export type IBookingEdit = {
  id: any;
  title: string;
  contactPerson: string;
  contactMobile: string;
  contactEmail: string;
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  logo: string;
  city: string;
  pincode: string;
  status: BookingStatus;
  state: string;
  country: string;
  gst: string;
  pan: string;
  estbId: string;
  cin: string;

  user?: any;
  profileImage?: any;
  estbtDoc: any;
  panDoc: any;
  gstDoc: any;
  cinDoc: any;
  isVerified: boolean;
  isActive: boolean;
};
export type IBooking = {
  id: any;
  title: string;
  contactPerson: string;
  contactMobile: string;
  contactEmail: string;
  address: Address;
  profileImage: any;
  status: BookingStatus;
  estbtDoc: any;
  panDoc: any;
  gstDoc: any;
  cinDoc: any;
  state: string;
  country: string;
  gst: string;
  pan: string;
  estbId: string;
  cin: string;
  isVerified: boolean;
  isActive: boolean;
  user?: any;
};

export type Address = {
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  city: string;
  pincode: string;
  state: string;
};

export type BookingDoc = {
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
};

export enum BookingStatus {
  ACTIVE = 'isActive',
  VERFIIED = 'isVerified',
  SUSPENDED = 'isBanned',
}


export enum BookingSearchParams {
  TITLE="TITLE" ,
  AREA="AREA",
  PINCODE="PINCODE",
  MOBILE="MOBILE",
  EMAIL="EMAIL",
   
}