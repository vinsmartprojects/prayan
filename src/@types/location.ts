import { Suspense } from 'react';

export type ILocationCreateInput = {
  name: string;
  code: string;
  pincode: string;
  longitude?: string;
  latitude?: string;
  isActive : boolean;
};
export type ILocationEdit = {
  id: any;
  name: string;
  code: string;
  pincode: string;
  longitude?: string;
  latitude?: string;
  isActive : boolean;
};
export type ILocation = {
  id: any;
  name: string;
  code: string;
  pincode: string;
  longitude?: string;
  latitude?: string;
  isActive : boolean;
  
};

// export type Address = {
//   addressLine1: string;
//   addressLine2: string;
//   area: string;
//   landmark: string;
//   city: string;
//   pincode: string;
//   state: string;
// };

// export type LocationDoc = {
//   addressLine1: string;
//   addressLine2: string;
//   area: string;
//   landmark: string;
//   city: string;
//   pincode: string;
//   state: string;
//   country: string;
// };

 

 
export enum RentingType {
  HOURLY="HOURLY",
  ONEDAY="ONEDAY",
  AIRPORT="AIRPORT",
  ONEWAY="ONEWAY",
  ROUNDTRIP="ROUNDTRIP",
  LTH="LTH",  
}
export enum LocationSearchParams {
  NAME="NAME" ,
  CODE="CODE",
   
}
