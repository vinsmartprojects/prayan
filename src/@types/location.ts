import { Suspense } from 'react';

export type ILocationCreateInput = {
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
  status: LocationStatus;
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
export type ILocationEdit = {
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
  status: LocationStatus;
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
export type ILocation = {
  id: any;
  title: string;
  contactPerson: string;
  contactMobile: string;
  contactEmail: string;
  address: Address;
  profileImage: any;
  status: LocationStatus;
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

export type LocationDoc = {
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
};

export enum LocationStatus {
  ACTIVE = 'isActive',
  VERFIIED = 'isVerified',
  SUSPENDED = 'isBanned',
}


export enum LocationSearchParams {
  TITLE="TITLE" ,
  AREA="AREA",
  PINCODE="PINCODE",
  MOBILE="MOBILE",
  EMAIL="EMAIL",
   
}