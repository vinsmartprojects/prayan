import { Suspense } from "react";

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
  tin: string;
  cin: string;
  isVerified: boolean;
};
export type ILocationEdit = {
  id:any;
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
  tin: string;
  cin: string;
  isVerified: boolean;
};
export type ILocation = {
  id:any;
  title: string;
  contactPerson: string;
  contactMobile: string;
  contactEmail: string;
  address: Address;
  logo: string;
  status: LocationStatus;
  
  state: string;
  country: string;
  gst: string;
  pan: string;
  tin: string;
  cin: string;
  isVerified: boolean;
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
 

 
export enum  LocationStatus {
  ACTIVE = "active",
  PENDING="pending",
  SUSPENDED = "suspended"
  
}