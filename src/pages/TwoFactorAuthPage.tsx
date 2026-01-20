import { useNavigate } from 'react-router-dom';
import TwoFactorAuthForm from '@/components/forms/TwoFactorAuthForm';
import { useAuthStore } from '@/store/authStore';

export const TwoFactorAuthPage: React.FC = () => {
  const navigate = useNavigate();
  const pendingAuth = useAuthStore((state) => state.pendingAuth);

  const handleSuccess = () => {
    // Po pomyślnej weryfikacji 2FA przekieruj do aplikacji
    navigate('/app', { replace: true });
  };

  const handleResend = () => {
    // Optional: track resend analytics or update state
    console.log('Code resend requested');
  };

  return (
    <TwoFactorAuthForm
      email={pendingAuth?.email}
      onSuccess={handleSuccess}
      onResend={handleResend}
    />
  );
};

export default TwoFactorAuthPage;
