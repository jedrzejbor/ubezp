import { Alert, Snackbar, Stack } from '@mui/material';
import { useUiStore } from '@/store/uiStore';

export const ToastStack: React.FC = () => {
  const { toasts, removeToast } = useUiStore();

  return (
    <Stack
      spacing={1}
      sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: (theme) => theme.zIndex.snackbar }}
    >
      {toasts.map((toast) => (
        <Snackbar
          key={toast.id}
          open
          autoHideDuration={4000}
          onClose={() => removeToast(toast.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            severity={toast.severity ?? 'info'}
            variant="filled"
            onClose={() => removeToast(toast.id)}
            sx={{
              width: '100%',
              color: 'common.white',
              '& .MuiAlert-action': { color: 'inherit' },
              '& .MuiAlert-icon': { color: 'inherit' },
              '& .MuiAlert-message': { color: 'inherit' }
            }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  );
};

export default ToastStack;
