import { Suspense } from 'react';

export type IVehicleCreateInput = {
  registerNo: string;
  registrationType: RegistrationType;
  permitType: PermitType;
  permitNo?: string;
  make?: string;
  model?: string;
  year?: string;
  color?: string;
  vin?: string;
  trNo?: string;
  chassiNo?: string;
  engineNo?: string;
  seatingCapacity?: string;
  rcBookDoc?: string;
  rcNo?: string;
  rcExpritationDate: any;
  insuranceDoc?: string;
  insuranceNo?: string;
  insurationExpritationDate: any;
  emissionDoc?: string;
  emissionNo?: string;
  emissionExpritationDate: any;
  taxDoc?: string;
  taxno?: string;
  taxExpritationDate: any;
  fcExpritationDate: any;
  remarks?: string;
  fuelType: FuelType;
  type: any;
  vendor: any;
  gpsBox: boolean;
  mobileDevice: boolean;
  isAc: boolean;
};

export type IVehicleEdit = {
  id: any;
  registerNo: string;
  registrationType: RegistrationType;
  permitType: PermitType;
  permitNo?: string;
  make?: string;
  model?: string;
  year?: string;
  color?: string;
  vin?: string;
  trNo?: string;
  chassiNo?: string;
  engineNo?: string;
  seatingCapacity?: string;
  rcBookDoc?: any;
  rcNo?: string;
  rcExpritationDate: any;
  insuranceDoc?: any;
  insuranceNo?: string;
  insurationExpritationDate: any;
  emissionDoc?: any;
  emissionNo?: string;
  emissionExpritationDate: any;
  taxDoc?: any;
  taxno?: string;
  taxExpritationDate: any;
  fcExpritationDate: any;
  remarks?: string;
  fuelType: FuelType;
  type: any;
  vendor: any;
  gpsBox: boolean;
  mobileDevice: boolean;
  isAc: boolean;
  createdAt: any;
  updatedAt: any;
  isActive: any;
};

export type IVehicle = {
  id: any;
  registerNo: string;
  registrationType: RegistrationType;
  permitType: PermitType;
  permitNo?: string;
  make?: string;
  model?: string;
  year?: string;
  color?: string;
  vin?: string;
  trNo?: string;
  chassiNo?: string;
  engineNo?: string;
  seatingCapacity?: string;
  rcBookDoc?: any;
  rcNo?: string;
  rcExpritationDate: any;
  insuranceDoc?: any;
  insuranceNo?: string;
  insurationExpritationDate: any;
  emissionDoc?: any;
  emissionNo?: string;
  emissionExpritationDate: any;
  taxDoc?: any;
  taxno?: string;
  taxExpritationDate: any;
  fcExpritationDate: any;
  remarks?: string;
  fuelType: FuelType;
  type: any;
  vendor: any;
  gpsBox: boolean;
  mobileDevice: boolean;
  isAc: boolean;
  createdAt: any;
  updatedAt: any;
  isActive: any;
};
export enum RegistrationType {
  YELLOWBOARD = 'YELLOWBOARD',
  BLACKBOARD = 'BLACKBOARD',
  WHITEBOARD = 'WHITEBOARD',
  GREENBOARD = 'GREENBOARD',
}
export enum FuelType {
  DIESEL = 'DIESEL',
  PETROL = 'PETROL',
  GASOLINE = 'GASOLINE',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
}
export enum PermitType {
  STATE_PERMIT = 'STATE PERMIT',
  ALLINDIA = 'ALL INDIA',
}

export enum VehicleSearchParams {
  REGISTERNO = 'REGISTERNO',
}
