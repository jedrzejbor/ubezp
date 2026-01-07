import { useEffect, useState } from 'react';
import { Fade } from '@mui/material';
import { useLocation, useNavigate, type Location } from 'react-router-dom';
import LoginForm from '@/components/forms/LoginForm';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';
import ResetPasswordPlaceholder from '@/components/forms/ResetPasswordPlaceholder';
import { useColorMode } from '@/theme';

export interface LoginPageProps {
  initialStage?: 'login' | 'forgot' | 'reset';
}

export const LoginPage: React.FC<LoginPageProps> = ({ initialStage = 'login' }) => {
  const [stage, setStage] = useState<'login' | 'forgot' | 'reset'>(initialStage);
  const { mode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setStage(initialStage);
  }, [initialStage]);

  const from = (location.state as { from?: Location })?.from?.pathname || '/app';

  const handleLoginSuccess = () => setStage('login');
  const handleLoginRedirect = () => {
    handleLoginSuccess();
    navigate(from, { replace: true });
  };

  return (
    <Fade in key={stage + mode} timeout={300}>
      <div>
        {stage === 'login' && (
          <LoginForm
            onSuccess={handleLoginRedirect}
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
  );
};

export default LoginPage;
