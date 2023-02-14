import { Suspense } from 'react';

export type IDriverCreateInput = {
  name: string;
  contactMobile: string;
  contactEmail: string;
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  photo: string;
  city: string;
  pincode: string;
  status: DriverStatus;
  state: string;
  country: string;
  pan: string;
  licenceNo: string;
  badgeNo: string;
  displayCardNo: string;
  defenceTraining: boolean;
  medicalCheck: boolean;
  policeVerification: boolean;
  isVerified: boolean;
};
export type IDriverEdit = {
  id: any;
  name: string;
  contactMobile: string;
  contactEmail: string;
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  photo: string;
  city: string;
  pincode: string;
  status: DriverStatus;
  state: string;
  country: string;
  pan: string;
  licenceNo: string;
  badgeNo: string;
  displayCardNo: string;
  defenceTraining: boolean;
  medicalCheck: boolean;
  policeVerification: boolean;
  isVerified: boolean;
};
export type IDriver = {
  id: any;
  name: string;
  contactMobile: string;
  contactEmail: string;
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  photo: string;
  city: string;
  pincode: string;
  status: DriverStatus;
  state: string;
  country: string;
  pan: string;
  licenceNo: string;
  badgeNo: string;
  displayCardNo: string;
  defenceTraining: boolean;
  medicalCheck: boolean;
  policeVerification: boolean;
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

export enum DriverStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
}
