import { Suspense } from 'react';

export type ICustomerCreateInput = {
  name: string;
  
  contactMobile: string;
  contactEmail: string;
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  city: string;
  pincode: string;
  status: CustomerStatus;
  state: string;
  country: string;
  identyCardNo: string;
  identyCardDoc: any;
  isVerified: boolean;
  isActive: boolean;
  profileImage: any;
};
export type ICustomerEdit = {
  id: any;
  name: string;
  profileImage: any;
  contactMobile: string;
  contactEmail: string;
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  city: string;
  pincode: string;
  status: CustomerStatus;
  state: string;
  country: string;
  identyCardNo: string;
  identyCardDoc: any;
  isVerified: boolean;
  isActive: boolean;
};
export type ICustomer = {
  id: any;
  name: string;
  profileImage: any;
  contactMobile: string;
  contactEmail: string;
  address: Address;
  status: CustomerStatus;
  state: string;
  country: string;
  identyCardNo: string;
  identyCardDoc: any;
  isVerified: boolean;
  isActive: boolean;
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

export type CustomerDoc = {
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
};

export enum CustomerStatus {
  ACTIVE = 'isActive',
  VERFIIED = 'isVerified',
  SUSPENDED = 'isBanned',
}


export enum CustomerSearchParams {
  TITLE="TITLE" ,
  AREA="AREA",
  PINCODE="PINCODE",
  MOBILE="MOBILE",
  EMAIL="EMAIL",
   
}