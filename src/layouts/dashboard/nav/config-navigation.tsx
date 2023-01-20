// routes
import { PATH_VENDOR } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
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
    ],
  },
];

export default navConfig;
