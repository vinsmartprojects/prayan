// routes
import { PATH_VEHICLE,PATH_VEHICLETYPE, PATH_VENDOR,PATH_CLIENT, PATH_DRIVER } from '../../../routes/paths';

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
      
    ],
  },
];

export default navConfig;
