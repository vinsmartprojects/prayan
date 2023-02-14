import { Suspense } from "react";

export type IClientCreateInput = {
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
  status: ClientStatus;
  state: string;
  country: string;
  gst: string;
  pan: string;
  tin: string;
  cin: string;
  isVerified: boolean;
};
export type IClientEdit = {
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
  status: ClientStatus;
  state: string;
  country: string;
  gst: string;
  pan: string;
  tin: string;
  cin: string;
  isVerified: boolean;
};
export type IClient = {
  id:any;
  title: string;
  contactPerson: string;
  contactMobile: string;
  contactEmail: string;
  address: Address;
  logo: string;
  status: ClientStatus;
  
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

export type ClientDoc = {
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
};
 

 
export enum  ClientStatus {
  ACTIVE = "active",
  PENDING="pending",
  SUSPENDED = "suspended"
  
}