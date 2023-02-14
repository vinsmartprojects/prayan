import { Suspense } from 'react';

export type IVehicleCreateInput = {
  registerNo: string;
  registrationType: any;
  permitType: any;
  permitNo: string;
  make: string;
  model: string;
  year: string;
  color: string;
  vin: string;
  trNo: string;
  chassiNo: string;
  engineNo: string;
  seatingCapacity: string;
  rcBookDoc: string;
  rcNo: string;
  rcExpritationDate: any;
  insuranceDoc: string;
  insuranceNo: string;
  insurationExpritationDate: any;
  emissionDoc: string;
  emissionNo: string;
  emissionExpritationDate: any;
  taxDoc: string;
  taxno: string;
  taxExpritationDate: any;
  fcExpritationDate: any;
  remarks: string;
  fuelType: any;
  gpsBox: boolean;
  mobileDevice: boolean;
  isAc: boolean;
  vendorId: any
  vehicleTypeId: any;

};
export type IVehicleEdit = {
  id: any;
  name: string;
  features: string;
};
export type IVehicle = {
  id: any;
  registerNo: string;
  registrationType: any;
  permitType: any;
  permitNo: string;
  make: string;
  model: string;
  year: string;
  color: string;
  vin: string;
  trNo: string;
  chassiNo: string;
  engineNo: string;
  seatingCapacity: string;
  rcBookDoc: string;
  rcNo: string;
  rcExpritationDate: any;
  insuranceDoc: string;
  insuranceNo: string;
  insurationExpritationDate: any;
  emissionDoc: string;
  emissionNo: string;
  emissionExpritationDate: any;
  taxDoc: string;
  taxno: string;
  taxExpritationDate: any;
  fcExpritationDate: any;
  remarks: string;
  fuelType: any;
  gpsBox: boolean;
  mobileDevice: boolean;
  isAc: boolean;
  vendorId: any
  vehicleTypeId: any;
  vendor:any,
  type:any,


};


export enum RegistrationType {
  WHITE = "WHITE",
  BLACK = "BLACK"
  ,
  YELLOW = "YELLOW"
}

export enum PermitType {
  STATE = "STATE",

  INTERSTATE = "INTERSTATE"
}

export enum FuelType {
  PETROL = "PETROL",
  DIESEL = "DIESEL",
  CNG = "CNG",
  HYBRID = "CNG"
}