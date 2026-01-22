import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Container } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import AppShell, { BreadcrumbItem } from '@/components/layout/AppShell';
import { MenuSection } from '@/components/navigation/DesktopSidebar';
import { UserMenuOption } from '@/components/navigation/UserMenu';
import { useAuthStore } from '@/store/authStore';

// Mobile navigation items (for bottom bar)
const navItems = [
  {
    label: 'Panel główny',
    to: '/app',
    icon: <DashboardOutlinedIcon sx={{ fontSize: 24, width: 24, height: 24 }} />
  },
  {
    label: 'Konto',
    to: '/konto',
    icon: <ManageAccountsOutlinedIcon sx={{ fontSize: 24, width: 24, height: 24 }} />
  }
];

// Desktop sidebar menu sections
const menuSections: MenuSection[] = [
  {
    items: [
      {
        label: 'Pulpit',
        to: '/app/dashboard',
        icon: <DashboardOutlinedIcon sx={{ fontSize: 24 }} />
      },
      {
        label: 'Polisy',
        to: '/app/policies',
        icon: <SecurityOutlinedIcon sx={{ fontSize: 24 }} />
      },
      {
        label: 'Szkody',
        to: '/app/damages',
        icon: <ImageOutlinedIcon sx={{ fontSize: 24 }} />
      },
      {
        label: 'Płatności składek',
        to: '/app/payments',
        icon: <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 24 }} />
      },
      {
        label: 'Klienci',
        to: '/app/clients',
        icon: <FolderOutlinedIcon sx={{ fontSize: 24 }} />
      },
      {
        label: 'Użytkownicy',
        to: '/app/users',
        icon: <GroupOutlinedIcon sx={{ fontSize: 24 }} />
      },
      {
        label: 'Ubezpieczyciele',
        to: '/app/insurers',
        icon: <BusinessOutlinedIcon sx={{ fontSize: 24 }} />
      },
      {
        label: 'Ubezpieczyciel Kontakty',
        to: '/app/insurer-contacts',
        icon: <PeopleAltOutlinedIcon sx={{ fontSize: 24 }} />
      },
      {
        label: 'Formularze',
        to: '/app/forms',
        icon: <DescriptionOutlinedIcon sx={{ fontSize: 24 }} />
      }
    ]
  },
  {
    items: [
      {
        label: 'Baza wiedzy',
        to: '/app/knowledge-base',
        icon: <LibraryBooksOutlinedIcon sx={{ fontSize: 24 }} />
      },
      {
        label: 'Raporty',
        to: '/app/reports',
        icon: <AssessmentOutlinedIcon sx={{ fontSize: 24 }} />
      },
      {
        label: 'Logi zdarzeń',
        to: '/app/event-logs',
        icon: <HistoryOutlinedIcon sx={{ fontSize: 24 }} />
      }
    ]
  }
];

const AppLayout = () => {
  const resetAuth = useAuthStore((state) => state.resetAuth);
  const navigate = useNavigate();
  const location = useLocation();

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const path = location.pathname;

    // Always start with Pulpit
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Pulpit', href: '/app/dashboard' }];

    // Map of routes to breadcrumb labels
    const routeMap: Record<string, string> = {
      '/app/dashboard': 'Pulpit',
      '/app/account': 'Szczegóły konta',
      '/app/policies': 'Polisy',
      '/app/damages': 'Szkody',
      '/app/payments': 'Płatności składek',
      '/app/clients': 'Klienci',
      '/app/users': 'Użytkownicy',
      '/app/insurers': 'Ubezpieczyciele',
      '/app/insurer-contacts': 'Ubezpieczyciel Kontakty',
      '/app/forms': 'Formularze',
      '/app/knowledge-base': 'Baza wiedzy',
      '/app/reports': 'Raporty',
      '/app/event-logs': 'Logi zdarzeń'
    };

    if (path !== '/app/dashboard' && routeMap[path]) {
      breadcrumbs.push({ label: routeMap[path] });
    }

    return breadcrumbs;
  };

  const handleLogout = () => {
    resetAuth();
    navigate('/login', { replace: true });
  };

  const userMenuOptions: UserMenuOption[] = [
    {
      label: 'Ustawienia konta',
      icon: <SettingsOutlinedIcon sx={{ fontSize: 24 }} />,
      onClick: () => navigate('/app/settings')
    },
    {
      label: 'Dane firmy',
      icon: <BusinessOutlinedIcon sx={{ fontSize: 24 }} />,
      onClick: () => navigate('/app/company')
    },
    {
      label: 'Dane kontaktowe zespołu',
      icon: <PeopleAltOutlinedIcon sx={{ fontSize: 24 }} />,
      onClick: () => navigate('/app/team-contacts')
    }
  ];

  return (
    <AppShell
      navItems={navItems}
      menuSections={menuSections}
      breadcrumbs={getBreadcrumbs()}
      userMenuOptions={userMenuOptions}
      onLogout={handleLogout}
    >
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </AppShell>
  );
};

export default AppLayout;
