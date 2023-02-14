// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_VENDOR = '/vendor';
const ROOTS_VEHICLE = '/vehicle';
const ROOTS_VEHICLETYPE = '/vehicletype';
const ROOTS_DRIVER = '/driver';

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
  detail: path(ROOTS_VENDOR, '/detail'),
  udpate: path(ROOTS_VENDOR, '/update'),
  edit: (name: string) => path(ROOTS_VENDOR, `/${name}/edit`),
};

export const PATH_VEHICLE = {
  root: ROOTS_VEHICLE,
  index: path(ROOTS_VEHICLE, '/'),
  list: path(ROOTS_VEHICLE, '/list'),
  new: path(ROOTS_VEHICLE, '/new'),
  detail: path(ROOTS_VEHICLE, '/detail'),
  udpate: path(ROOTS_VEHICLE, '/update'),
  edit: (name: string) => path(ROOTS_VEHICLE, `/${name}/edit`),
};
export const PATH_DRIVER = {
  root: ROOTS_DRIVER,
  index: path(ROOTS_DRIVER, '/'),
  list: path(ROOTS_DRIVER, '/list'),
  new: path(ROOTS_DRIVER, '/new'),
  detail: path(ROOTS_DRIVER, '/detail'),
  udpate: path(ROOTS_DRIVER, '/update'),
   edit: (name: string) => path(ROOTS_DRIVER, `/${name}/edit`),
};
export const PATH_VEHICLETYPE = {
  root: ROOTS_VEHICLETYPE,
  index: path(ROOTS_VEHICLETYPE, '/'),
  list: path(ROOTS_VEHICLETYPE, '/list'),
  new: path(ROOTS_VEHICLETYPE, '/new'),
  detail: path(ROOTS_VEHICLETYPE, '/detail'),
  udpate: path(ROOTS_VEHICLETYPE, '/update'),
   edit: (name: string) => path(ROOTS_VEHICLETYPE, `/${name}/edit`),
};
