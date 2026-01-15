import { useNavigate } from 'react-router-dom';
import TwoFactorAuthForm from '@/components/forms/TwoFactorAuthForm';

export const TwoFactorAuthPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/app');
  };

  const handleResend = () => {
    // Optional: track resend analytics or update state
    console.log('Code resend requested');
  };

  return (
    <TwoFactorAuthForm email="test@test.com" onSuccess={handleSuccess} onResend={handleResend} />
  );
};

export default TwoFactorAuthPage;
