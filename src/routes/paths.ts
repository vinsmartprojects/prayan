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
const ROOTS_PACKAGE = '/package';
const ROOTS_LOCATION = '/location';
const ROOTS_CUSTOMER = '/customer';
const ROOTS_TRIPS="/trips";
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
export const PATH_VEHICLETYPE = {
  root: ROOTS_VEHICLETYPE,
  index: path(ROOTS_VEHICLETYPE, '/'),
  list: path(ROOTS_VEHICLETYPE, '/list'),
  new: path(ROOTS_VEHICLETYPE, '/new'),
  detail: (name: string) => path(ROOTS_VEHICLETYPE, `/${name}/detail`),
  udpate: path(ROOTS_VEHICLETYPE, '/update'),
  edit: (name: string) => path(ROOTS_VEHICLETYPE, `/${name}/edit`),
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

export const PATH_TRIPS= {
  root: ROOTS_TRIPS,
  index: path(ROOTS_TRIPS, '/'),
  list: path(ROOTS_TRIPS, '/list'),
  new: path(ROOTS_TRIPS, '/new'),
  detail: (name: string) => path(ROOTS_TRIPS, `/${name}/detail`),
  udpate: path(ROOTS_TRIPS, '/update'),
  edit: (name: string) => path(ROOTS_TRIPS, `/${name}/edit`),
};


export const PATH_PACKAGE = {
  root: ROOTS_PACKAGE,
  index: path(ROOTS_PACKAGE, '/'),
  list: path(ROOTS_PACKAGE, '/list'),
  new: path(ROOTS_PACKAGE, '/new'),
  detail: (name: string) => path(ROOTS_PACKAGE, `/${name}/detail`),
  udpate: path(ROOTS_PACKAGE, '/update'),
  edit: (name: string) => path(ROOTS_PACKAGE, `/${name}/edit`),
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
