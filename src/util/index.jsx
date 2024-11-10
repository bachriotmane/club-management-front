
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  HomeIcon,
  AcademicCapIcon,
  StarIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";

export const sidebar = [
    {
        title: 'Accueil',
        to: '/',
        icon: <HomeIcon className="h-5 w-5" />,
    },
    {
        title: 'Clubs',
        to: '/clubs',
        icon: <AcademicCapIcon className="h-5 w-5" />,
    },
    {
        title: 'Evenements',
        to: '/events',
        icon: <StarIcon className="h-5 w-5" />,
    },
    {
        title: 'Demandes',
        to: '/demandes',
        icon: <EnvelopeIcon className="h-5 w-5" />,
    },
]