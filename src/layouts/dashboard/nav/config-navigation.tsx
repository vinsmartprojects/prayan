// routes
import { PATH_BOOKING, PATH_VEHICLE, PATH_VEHICLETYPE, PATH_VENDOR, PATH_PACKAGE, PATH_CLIENT, PATH_DRIVER } from '../../../routes/paths';

// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  vehicle: icon('ic_vehicle'),

  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Admin Access',
    items: [
      {
        title: 'Trips',
        path: PATH_BOOKING.root,
        icon: ICONS.vehicle,
        children: [
          { title: 'List', path: PATH_BOOKING.list },
          { title: 'New', path: PATH_BOOKING.new },
        ],
      },
      {
        title: 'Bookings',
        path: PATH_BOOKING.root,
        icon: ICONS.vehicle,
        children: [
          { title: 'List', path: PATH_BOOKING.list },
          { title: 'New', path: PATH_BOOKING.new },
        ],
      },
      {
        title: 'Drivers',
        path: PATH_DRIVER.root,
        icon: ICONS.user,
        children: [
          { title: 'List', path: PATH_DRIVER.list },
          { title: 'New', path: PATH_DRIVER.new },
        ],
      },

      {
        title: 'Vehicles',
        path: PATH_VEHICLE.root,
        icon: ICONS.vehicle,
        children: [
          { title: 'List', path: PATH_VEHICLE.list },
          { title: 'New', path: PATH_VEHICLE.new },
        ],
      },
      {
        title: 'Clients',
        path: PATH_CLIENT.root,
        icon: ICONS.vehicle,
        children: [
          { title: 'List', path: PATH_CLIENT.list },
          { title: 'New', path: PATH_CLIENT.new },
        ],
      },
      {

        title: 'Vendors',
        path: PATH_VENDOR.root,
        icon: ICONS.user,
        children: [
          { title: 'List', path: PATH_VENDOR.list },
          { title: 'New', path: PATH_VENDOR.new },
        ],
      },
      {
        title: 'Vehicle Types',
        path: PATH_VEHICLETYPE.root,
        icon: ICONS.vehicle,
        children: [
          { title: 'List', path: PATH_VEHICLETYPE.list },
          { title: 'New', path: PATH_VEHICLETYPE.new },
        ],
      },
      {
        title: 'Packages',
        path: PATH_PACKAGE.root,
        icon: ICONS.vehicle,
        children: [
          { title: 'List', path: PATH_PACKAGE.list },
          { title: 'New', path: PATH_PACKAGE.new },
        ],
      },




    ],
  },
];

export default navConfig;
