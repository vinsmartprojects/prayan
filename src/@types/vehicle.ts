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
  vendorId:any
  vehicleTypeId: any;

};
export type IVehicleEdit = {
  id: any;
  name: string;
  features: string;
};
export type IVehicle = {
  id: any;
  name: string;
  features: string;
};
