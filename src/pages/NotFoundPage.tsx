import { Box } from '@mui/material';

import ListPlaceholderLayout from '@/components/ListPlaceholderLayout';
import NotFoundContent from '@/components/NotFoundContent';

const NotFoundPage = () => {
  return (
    <Box component="main" px={2} py={4}>
      <ListPlaceholderLayout title="Nie znaleziono strony">
        <NotFoundContent />
      </ListPlaceholderLayout>
    </Box>
  );
};

export default NotFoundPage;
