import { useState } from 'react';
import { Fade } from '@mui/material';
import AuthLayout from '@/components/layout/AuthLayout';
import LoginForm from '@/components/forms/LoginForm';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';
import ResetPasswordPlaceholder from '@/components/forms/ResetPasswordPlaceholder';
import ToastStack from '@/components/ToastStack';
import { useColorMode } from '@/theme';

export const LoginPage: React.FC = () => {
  const [stage, setStage] = useState<'login' | 'forgot' | 'reset'>('login');
  const { mode } = useColorMode();

  const handleLoginSuccess = () => setStage('login');

  return (
    <AuthLayout>
      <Fade in key={stage + mode} timeout={300}>
        <div>
          {stage === 'login' && (
            <LoginForm
              onSuccess={handleLoginSuccess}
              onForgotPassword={() => setStage('forgot')}
              onBecomeClient={() => window.open('#', '_blank')}
            />
          )}
          {stage === 'forgot' && (
            <ForgotPasswordForm
              onBackToLogin={() => setStage('login')}
              onProceed={() => setStage('reset')}
            />
          )}
          {stage === 'reset' && <ResetPasswordPlaceholder onBack={() => setStage('login')} />}
        </div>
      </Fade>
      <ToastStack />
    </AuthLayout>
  );
};

export default LoginPage;
