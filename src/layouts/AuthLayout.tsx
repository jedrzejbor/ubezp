import { Outlet } from 'react-router-dom';

import AuthShell from '@/components/layout/AuthLayout';

const AuthLayout = () => (
  <AuthShell>
    <Outlet />
  </AuthShell>
);

export default AuthLayout;
