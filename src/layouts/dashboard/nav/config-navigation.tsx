// routes
import { PATH_BOOKING,PATH_CUSTOMER, PATH_VEHICLE,  PATH_SETTING, PATH_TRIP } from '../../../routes/paths';

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
        
        title: 'Settings',
        path: PATH_SETTING.root,
        icon: <Iconify icon="carbon:partnership" />,
        children: [
          { title: 'List', path: PATH_SETTING.list },
          { title: 'New', path: PATH_SETTING.new },
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
     




    ],
  },
];

export default navConfig;
