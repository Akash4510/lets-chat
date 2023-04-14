import {
  ChatCircleDots,
  Gear,
  GearSix,
  Phone,
  SignOut,
  User,
  Users,
} from 'phosphor-react';

export const PROFILE_MENU_ITEMS = [
  {
    index: 0,
    title: 'Profile',
    icon: <User />,
    to: '/profile',
  },
  {
    index: 1,
    title: 'Settings',
    icon: <Gear />,
    to: '/settings',
  },
  {
    index: 2,
    title: 'Logout',
    icon: <SignOut />,
    to: 'auth/login',
  },
];

export const NAV_BUTTONS = [
  {
    index: 0,
    icon: <ChatCircleDots />,
    to: '/chat',
  },
  {
    index: 1,
    icon: <Users />,
    to: '/groups',
  },
  {
    index: 2,
    icon: <Phone />,
    to: '/call',
  },
  {
    index: 3,
    icon: <GearSix />,
    to: '/settings',
  },
];
