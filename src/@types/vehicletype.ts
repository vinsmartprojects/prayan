export type IVehicletypeCreate = {
  name: any;
  image: any |undefined;

};

export type IVehicletype = {
  id: any;
  name: string;
  image: any ;
  createdAt: any;
};

export enum VehicletypeSearchParams {
  NAME = 'NAME',
}
