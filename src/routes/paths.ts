// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_VENDOR = '/vendor';
const ROOTS_VEHICLE = '/vehicle';
const ROOTS_VEHICLETYPE = '/vehicletype';
const ROOTS_DRIVER = '/driver';
const ROOTS_CLIENT = '/client';
const ROOTS_BOOKING = '/booking';
const ROOTS_PLAN = '/plan';
const ROOTS_LOCATION = '/location';
const ROOTS_CUSTOMER = '/customer';
const ROOTS_TRIP = '/trip';
// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  index: path(ROOTS_DASHBOARD, '/analytics'),
};
export const PATH_VENDOR = {
  root: ROOTS_VENDOR,
  index: path(ROOTS_VENDOR, '/'),
  list: path(ROOTS_VENDOR, '/list'),
  new: path(ROOTS_VENDOR, '/new'),
  udpate: path(ROOTS_VENDOR, '/update'),
  edit: (name: string) => path(ROOTS_VENDOR, `/${name}/edit`),
  detail: (name: string) => path(ROOTS_VENDOR, `/${name}/detail`),
};

export const PATH_VEHICLE = {
  root: ROOTS_VEHICLE,
  index: path(ROOTS_VEHICLE, '/'),
  list: path(ROOTS_VEHICLE, '/list'),
  new: path(ROOTS_VEHICLE, '/new'),
  VehicleMakerNewForm: path(ROOTS_VEHICLE, '/VehicleMakerNewForm'),
  VehicleSegmentNewForm: path(ROOTS_VEHICLE, '/VehicleSegmentNewForm'),
  VehicleModelsNewForm: path(ROOTS_VEHICLE, '/VehicleModelsNewForm'),
  settings: path(ROOTS_VEHICLE, '/settings'),
  detail: (name: string) => path(ROOTS_VEHICLETYPE, `/${name}/detail`),
  udpate: path(ROOTS_VEHICLE, '/update'),
  edit: (name: string) => path(ROOTS_VEHICLE, `/${name}/edit`),
};
export const PATH_DRIVER = {
  root: ROOTS_DRIVER,
  index: path(ROOTS_DRIVER, '/'),
  list: path(ROOTS_DRIVER, '/list'),
  new: path(ROOTS_DRIVER, '/new'),
  detail: (name: string) => path(ROOTS_DRIVER, `/${name}/detail`),
  udpate: path(ROOTS_DRIVER, '/update'),
  edit: (name: string) => path(ROOTS_DRIVER, `/${name}/edit`),
};

export const PATH_CLIENT = {
  root: ROOTS_CLIENT,
  index: path(ROOTS_CLIENT, '/'),
  list: path(ROOTS_CLIENT, '/list'),
  new: path(ROOTS_CLIENT, '/new'),
  detail: (name: string) => path(ROOTS_CLIENT, `/${name}/detail`),
  udpate: path(ROOTS_CLIENT, '/update'),
  edit: (name: string) => path(ROOTS_CLIENT, `/${name}/edit`),
};
export const PATH_BOOKING = {
  root: ROOTS_BOOKING,
  index: path(ROOTS_BOOKING, '/'),
  list: path(ROOTS_BOOKING, '/list'),
  new: path(ROOTS_BOOKING, '/new'),
  detail: (name: string) => path(ROOTS_BOOKING, `/${name}/detail`),
  udpate: path(ROOTS_BOOKING, '/update'),
  edit: (name: string) => path(ROOTS_BOOKING, `/${name}/edit`),
};

export const PATH_TRIP = {
  root: ROOTS_TRIP,
  index: path(ROOTS_TRIP, '/'),
  list: path(ROOTS_TRIP, '/list'),
  new: path(ROOTS_TRIP, '/new'),
  detail: (name: string) => path(ROOTS_TRIP, `/${name}/detail`),
  udpate: path(ROOTS_TRIP, '/update'),
  edit: (name: string) => path(ROOTS_TRIP, `/${name}/edit`),
};

export const PATH_PLAN = {
  root: ROOTS_PLAN,
  index: path(ROOTS_PLAN, '/'),
  list: path(ROOTS_PLAN, '/list'),
  new: path(ROOTS_PLAN, '/new'),
  detail: (name: string) => path(ROOTS_PLAN, `/${name}/detail`),
  udpate: path(ROOTS_PLAN, '/update'),
  edit: (name: string) => path(ROOTS_PLAN, `/${name}/edit`),
};

export const PATH_LOCATION = {
  root: ROOTS_LOCATION,
  index: path(ROOTS_LOCATION, '/'),
  list: path(ROOTS_LOCATION, '/list'),
  new: path(ROOTS_LOCATION, '/new'),
  detail: (name: string) => path(ROOTS_LOCATION, `/${name}/detail`),
  udpate: path(ROOTS_LOCATION, '/update'),
  edit: (name: string) => path(ROOTS_LOCATION, `/${name}/edit`),
};

export const PATH_CUSTOMER = {
  root: ROOTS_CUSTOMER,
  index: path(ROOTS_CUSTOMER, '/'),
  list: path(ROOTS_CUSTOMER, '/list'),
  new: path(ROOTS_CUSTOMER, '/new'),
  detail: (name: string) => path(ROOTS_CUSTOMER, `/${name}/detail`),
  udpate: path(ROOTS_CUSTOMER, '/update'),
  edit: (name: string) => path(ROOTS_CUSTOMER, `/${name}/edit`),
};
