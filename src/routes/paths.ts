// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_SETTING = '/setting';
const ROOTS_VEHICLE = '/vehicle';
const ROOTS_VEHICLETYPE = '/vehicletype';
const ROOTS_DRIVER = '/driver';
const ROOTS_USER = '/user';
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
export const PATH_SETTING = {
  root: ROOTS_SETTING,
  index: path(ROOTS_SETTING, '/'),
  list: path(ROOTS_SETTING, '/list'),
  new: path(ROOTS_SETTING, '/new'),
  udpate: path(ROOTS_SETTING, '/update'),
  edit: (name: string) => path(ROOTS_SETTING, `/${name}/edit`),
  detail: (name: string) => path(ROOTS_SETTING, `/${name}/detail`),
};

export const PATH_VEHICLE = {
  root: ROOTS_VEHICLE,
  index: path(ROOTS_VEHICLE, '/'),
  list: path(ROOTS_VEHICLE, '/list'),
  new: path(ROOTS_VEHICLE, '/new'),

  settings: {
    root: path(ROOTS_VEHICLE, '/settings'),
    model: path(ROOTS_VEHICLE, '/settings/models'),
    maker: path(ROOTS_VEHICLE, '/settings/maker'),
    segment: path(ROOTS_VEHICLE, '/settings/segment'),
  },
  detail: (name: string) => path(ROOTS_VEHICLETYPE, `/${name}/detail`),
  udpate: path(ROOTS_VEHICLE, '/update'),
  udpateMaker: path(ROOTS_VEHICLE, '/settings/maker/update'),
  udpateSegment: path(ROOTS_VEHICLE, '/settings/segment/update'),
  udpateModels: path(ROOTS_VEHICLE, '/settings/models/update'),
  edit: (name: string) => path(ROOTS_VEHICLE, `/${name}/edit`),
  editMaker: (name: string) => path(ROOTS_VEHICLE, `/${name}/settings/maker/edit`),
  editSegment: (name: string) => path(ROOTS_VEHICLE, `/${name}/settings/segment/edit`),
  editModels: (name: string) => path(ROOTS_VEHICLE, `/${name}/settings/models/edit`),
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

export const PATH_USER = {
  root: ROOTS_USER,
  index: path(ROOTS_USER, '/'),
  list: path(ROOTS_USER, '/list'),
  new: path(ROOTS_USER, '/new'),
  detail: (name: string) => path(ROOTS_USER, `/${name}/detail`),
  udpate: path(ROOTS_USER, '/update'),
  edit: (name: string) => path(ROOTS_USER, `/${name}/edit`),
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
