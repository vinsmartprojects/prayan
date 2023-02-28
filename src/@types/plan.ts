import { Suspense } from 'react';

export type IPlanCreateInput = {
  name: string;
  code: string;
  type: RentingType;
  minKM?: string;
  perKm?: string;
  vechicleType: any;  
  minDistance?: string;
  isActive : boolean;
};
export type IPlanEdit = {
  id: any;
 name: string;
  code: string;
  type: RentingType;
  minKM?: string;
  perKm?: string;
  vechicleType: any;
  minDistance?: string;
  isActive : boolean;
};
export type IPlan = {
  id: any;
  name: string;
  code: string;
  type: RentingType;
  minKM?: string;
  perKm?: string;
  vechicleType: any;
  minDistance?: string;
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

// export type PlanDoc = {
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
export enum PlanSearchParams {
  NAME="NAME" ,
  CODE="CODE",
   
}
