import { Typography, Box } from '@mui/material';
import { useAuthStore } from '@/store/authStore';

const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <Box>
      <Typography variant="h4" component="h1">
        {`Witaj${user?.name ? ' ' + user.name : ''}`}
      </Typography>
    </Box>
  );
};

export default DashboardPage;
