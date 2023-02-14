import { Suspense } from "react";

export type IDriverCreateInput = {
  name: string;
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
  status: DriverStatus;
  state: string;
  country: string;
  gst: string;
  pan: string;
  tin: string;
  cin: string;
  isVerified: boolean;
};
export type IDriverEdit = {
  id:any;
  name: string;
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
  status: DriverStatus;
  state: string;
  country: string;
  gst: string;
  pan: string;
  tin: string;
  cin: string;
  isVerified: boolean;
};
export type IDriver = {
  id:any;
  name: string;
  contactPerson: string;
  contactMobile: string;
  contactEmail: string;
  address: Address;
  logo: string;
  status: DriverStatus;
  
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

export type DriverDoc = {
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
};
 

 
export enum  DriverStatus {
  ACTIVE = "active",
  PENDING="pending",
  SUSPENDED = "suspended"
  
}