import { Suspense } from 'react';

export type IUserCreateInput = {
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
  status: UserStatus;
  state: string;
  country: string;
  gst: string;
  gstDoc: any;
  isVerified: boolean;
  isActive: boolean;
  profileImage: any;
};
export type IUserEdit = {
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
  status: UserStatus;
  state: string;
  country: string;
  gst: string;
  user?: any;
  profileImage?: any;
  gstDoc: any;
  isVerified: boolean;
  isActive: boolean;
};
export type IUser = {
  id: any;
  name: string;
  contactMobile: string;
  contactEmail: string;
  address: Address;
  profileImage: any;
  status: UserStatus;
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

export type UserDoc = {
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
};

export enum UserStatus {
  ACTIVE = 'isActive',
  VERFIIED = 'isVerified',
  SUSPENDED = 'isBanned',
}


export enum UserSearchParams {
  TITLE="TITLE" ,
  AREA="AREA",
  PINCODE="PINCODE",
  MOBILE="MOBILE",
  EMAIL="EMAIL",
   
}