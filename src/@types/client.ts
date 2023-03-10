import { Suspense } from 'react';

export type IClientCreateInput = {
  name: string;
  contactPerson: string;
  contactMobile: string;
  contactEmail: string;
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  city: string;
  pincode: string;
  status: ClientStatus;
  state: string;
  country: string;
  gst: string;
  gstDoc: any;
  isVerified: boolean;
  isActive: boolean;
  profileImage: any;
};
export type IClientEdit = {
  id: any;
  name: string;
  contactMobile: string;
  contactEmail: string;
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  city: string;
  pincode: string;
  status: ClientStatus;
  state: string;
  country: string;
  gst: string;
  user?: any;
  profileImage?: any;
  gstDoc: any;
  isVerified: boolean;
  isActive: boolean;
};
export type IClient = {
  id: any;
  name: string;
  contactMobile: string;
  contactEmail: string;
  address: Address;
  profileImage: any;
  status: ClientStatus;
  gstDoc: any;
  state: string;
  country: string;
  gst: string;
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

export enum ClientStatus {
  ACTIVE = 'isActive',
  VERFIIED = 'isVerified',
  SUSPENDED = 'isBanned',
}


export enum ClientSearchParams {
  TITLE="TITLE" ,
  AREA="AREA",
  PINCODE="PINCODE",
  MOBILE="MOBILE",
  EMAIL="EMAIL",
   
}