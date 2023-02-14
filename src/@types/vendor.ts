import { Suspense } from "react";

export type IVendorCreateInput = {
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
  status: VendorStatus;
  state: string;
  country: string;
  gst: string;
  pan: string;
  tin: string;
  cin: string;
  isVerified: boolean;
};
export type IVendorEdit = {
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
  status: VendorStatus;
  state: string;
  country: string;
  gst: string;
  pan: string;
  tin: string;
  cin: string;
  isVerified: boolean;
};
export type IVendor = {
  id:any;
  title: string;
  contactPerson: string;
  contactMobile: string;
  contactEmail: string;
  address: Address;
  logo: string;
  status: VendorStatus;
  
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

export type VendorDoc = {
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
};
 

 
export enum  VendorStatus {
  ACTIVE = "active",
  PENDING="pending",
  SUSPENDED = "suspended"
  
}