
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

export const sidebar = [
    {
        title: 'Accueil',
        to: '/',
        icon: <InboxIcon className="h-5 w-5" />,
    },
    {
        title: 'Clubs',
        to: '/clubs',
        icon: <PowerIcon className="h-5 w-5" />,
    },
    {
        title: 'Evenements',
        to: '/evenements',
        icon: <ShoppingBagIcon className="h-5 w-5" />,
    },
    {
        title: 'Demandes',
        to: '/demandes',
        icon: <UserCircleIcon className="h-5 w-5" />,
    },
]