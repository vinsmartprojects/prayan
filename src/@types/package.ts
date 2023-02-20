import { Suspense } from "react";

export type IPackageCreateInput = {
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
  status: PackageStatus;
  state: string;
  country: string;
  gst: string;
  pan: string;
  tin: string;
  cin: string;
  isVerified: boolean;
};
export type IPackageEdit = {
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
  status: PackageStatus;
  state: string;
  country: string;
  gst: string;
  pan: string;
  tin: string;
  cin: string;
  isVerified: boolean;
};
export type IPackage = {
  id:any;
  title: string;
  contactPerson: string;
  contactMobile: string;
  contactEmail: string;
  address: Address;
  logo: string;
  status: PackageStatus;
  
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

export type PackageDoc = {
  addressLine1: string;
  addressLine2: string;
  area: string;
  landmark: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
};
 

 
export enum  PackageStatus {
  ACTIVE = "active",
  PENDING="pending",
  SUSPENDED = "suspended"
  
}