// routes
import { PATH_BOOKING,PATH_CUSTOMER, PATH_VEHICLE,  PATH_VENDOR, PATH_LOCATION, PATH_PLAN, PATH_CLIENT, PATH_DRIVER, PATH_TRIP } from '../../../routes/paths';

// components
import SvgColor from '../../../components/svg-color';
import Iconify from 'src/components/iconify';

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
        path: PATH_TRIP.root,
        icon: <Iconify icon="bx:trip" />,
        children: [
          { title: 'List', path: "#" },
          { title: 'New', path: '#' },
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
        icon:  <Iconify icon="healthicons:truck-driver" />,
        children: [
          { title: 'List', path: PATH_DRIVER.list },
          { title: 'New', path: PATH_DRIVER.new },
        ],
      },

      {
        title: 'Vehicles',
        path: PATH_VEHICLE.root,
        icon: <Iconify icon="ic:baseline-directions-car" />,
        children: [
          { title: 'List', path: PATH_VEHICLE.list },
          { title: 'New', path: PATH_VEHICLE.new },
          { title: 'Settings', path: PATH_VEHICLE.settings },
        ],
      },
      {
        title: 'Clients',
        path: PATH_CLIENT.root,
        icon: <Iconify icon="clarity:building-outline-alerted" />,
        children: [
          { title: 'List', path: PATH_CLIENT.list },
          { title: 'New', path: PATH_CLIENT.new },
        ],
      },
      {
        
        title: 'Vendors',
        path: PATH_VENDOR.root,
        icon: <Iconify icon="carbon:partnership" />,
        children: [
          { title: 'List', path: PATH_VENDOR.list },
          { title: 'New', path: PATH_VENDOR.new },
        ],
      },
       
       {
        title: 'Customer',
        path: PATH_CUSTOMER.root,
       icon:  <Iconify icon="healthicons:man" />,
        children: [
          { title: 'List', path: PATH_CUSTOMER.list },
          { title: 'New', path: PATH_CUSTOMER.new },
        ],
      },
      {
        title: 'Plans',
        path: PATH_PLAN.root,
        icon: <Iconify icon="ic:twotone-local-offer" />,
        children: [
          { title: 'List', path: PATH_PLAN.list },
          { title: 'New', path: PATH_PLAN.new },
        ],
      },
      {
        title: 'Location',
        path: PATH_LOCATION.root,
        icon: <Iconify icon="majesticons:map-marker-area" />,
        children: [
          { title: 'List', path: PATH_LOCATION.list },
          { title: 'New', path: PATH_LOCATION.new },
        ],
      },




    ],
  },
];

export default navConfig;
