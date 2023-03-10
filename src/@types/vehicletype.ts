export type IVehicletypeCreate = {
  name: any;
  image: any | undefined;
  features: any;
};

export type IVehicletype = {
  id: any;
  name: string;
  image: any;
  createdAt: any;
  features: any;
};

export enum VehicletypeSearchParams {
  NAME = 'NAME',
}
