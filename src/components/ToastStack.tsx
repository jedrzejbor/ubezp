import { Alert, Snackbar, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useUiStore } from '@/store/uiStore';

export const ToastStack: React.FC = () => {
  const { toasts, removeToast } = useUiStore();

  return (
    <Stack
      spacing={1}
      sx={{
        position: 'fixed',
        bottom: { xs: 92, sm: 16 },
        left: { xs: '50%', sm: 'auto' },
        right: { xs: 'auto', sm: 16 },
        transform: { xs: 'translateX(-50%)', sm: 'translateX(0)' },
        zIndex: (theme) => theme.zIndex.snackbar,
        alignItems: { xs: 'center', sm: 'flex-end' }
      }}
    >
      {toasts.map((toast) => (
        <Snackbar
          key={toast.id}
          open
          autoHideDuration={4000}
          onClose={() => removeToast(toast.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            position: 'static !important',
            transform: 'none !important',
            left: 'auto !important',
            right: 'auto !important'
          }}
        >
          <Alert
            icon={<CheckCircleIcon sx={{ fontSize: 24 }} />}
            severity={toast.severity ?? 'success'}
            variant="filled"
            onClose={() => removeToast(toast.id)}
            sx={{
              backgroundColor: '#1E1F21',
              color: '#FFFFFF',
              borderRadius: '4px',
              padding: '6px 16px',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.43,
              letterSpacing: '0.17px',
              fontFamily: 'Inter, sans-serif',
              whiteSpace: 'nowrap',
              '& .MuiAlert-icon': {
                color: '#FFFFFF',
                padding: 0,
                marginRight: '8px',
                opacity: 1
              },
              '& .MuiAlert-message': {
                color: '#FFFFFF',
                padding: '8px 0',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: 1.43,
                letterSpacing: '0.17px',
                whiteSpace: 'nowrap'
              },
              '& .MuiAlert-action': {
                color: '#FFFFFF',
                padding: 0,
                marginRight: 0,
                marginLeft: '8px'
              }
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
