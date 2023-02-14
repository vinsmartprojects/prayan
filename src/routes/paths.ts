// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_VENDOR = '/vendor';
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
};
export const PATH_DRIVER = {
  root: ROOTS_DRIVER,
  index: path(ROOTS_DRIVER, '/'),
  list: path(ROOTS_DRIVER, '/list'),
  new: path(ROOTS_DRIVER, '/new'),
  detail: path(ROOTS_DRIVER, '/detail'),
  udpate: path(ROOTS_DRIVER, '/update'),
};
