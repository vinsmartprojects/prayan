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
  bodySegment:BodySegment;
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
  seatingCapacity?: CarSeating;
  transmissionType?: TransmissionType;
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
  YELLOW_BOARD = 'YELLOW_BOARD',
  BLACK_BOARD = 'BLACK_BOARD',
  WHITE_BOARD = 'WHITE_BOARD',
  GREEN_BOARD = 'GREEN_BOARD',
}
export enum FuelType {
  DIESEL = 'DIESEL',
  PETROL = 'PETROL',
  GASOLINE = 'GASOLINE',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
}
export enum PermitType {
  STATE_PERMIT = 'STATE_PERMIT',
  ALL_INDIA = 'ALL_INDIA',
}

export enum VehicleSearchParams {
  REGISTERNO = 'REGISTERNO',
  SEGMENT = 'SEGMENT',
}

export enum VehicleFilter {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  SERVICING = 'SERVICING',
  LEASED = 'LEASED',
  REMOVED = 'REMOVED',
}

export enum Maker {
  HONDA = 'HONDA',
  MARUTI_SUZUKI = 'MARUTI_SUZUKI',
  TATA = 'TATA',
  HOUNDAI = 'HOUNDAI',
  FORD = 'FORD',
  NISSAN = 'NISSAN',
  KIA = 'KIA',
  MAHENDRA = 'MAHENDRA',
  FORCE = 'FORCE',
  TOYATA = 'TOYATA',
  RENUALT = 'RENUALT',
  VOLKSWAGEN = 'VOLKSWAGEN',
  MG = 'MG',
  DATSUN = 'DATSUN',
  AUDI = 'AUDI',
}

export enum CarSeating {
  TWO = '2',
  Four = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  EIGHT_PLUS = '8+',
}

export enum TransmissionType {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
  ClUTCHLESS = 'ClUTCHLESS',
}

export enum BodySegment {
  HATCHBACK = 'HATCHBACK',
  SUV = 'SUV',
  SEDAN = 'SEDAN',
}
