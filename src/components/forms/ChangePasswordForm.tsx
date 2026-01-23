import CloseIcon from '@mui/icons-material/Close';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema, type ChangePasswordFormValues } from '@/utils/formSchemas';

export interface ChangePasswordFormProps {
  onSubmit: (data: ChangePasswordFormValues) => void;
  onCancel: () => void;
  loading?: boolean;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onSubmit,
  onCancel,
  loading = false
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  });

  const passwordHelperText =
    'Stwórz długie hasło (min. 8 znaków) z różnorodnymi elementami, takimi jak litery (zarówno wielkie, jak i małe), cyfry i znaki specjalne, unikając informacji osobistych.';

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
      <Stack spacing={2.5}>
        {/* Current password */}
        <TextField
          label="Aktualne hasło"
          type={showCurrentPassword ? 'text' : 'password'}
          {...register('currentPassword')}
          error={Boolean(errors.currentPassword)}
          helperText={errors.currentPassword?.message}
          fullWidth
          size="medium"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  edge="end"
                  size="small"
                >
                  {showCurrentPassword ? (
                    <VisibilityOffRoundedIcon sx={{ color: '#74767F' }} />
                  ) : (
                    <VisibilityRoundedIcon sx={{ color: '#74767F' }} />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {/* New password with helper text */}
        <TextField
          label="Nowe hasło"
          type={showNewPassword ? 'text' : 'password'}
          {...register('newPassword')}
          error={Boolean(errors.newPassword)}
          helperText={errors.newPassword?.message || passwordHelperText}
          fullWidth
          size="medium"
          FormHelperTextProps={{
            sx: {
              color: errors.newPassword ? undefined : '#74767F',
              fontSize: '12px',
              lineHeight: isMobile ? '16px' : '20px',
              letterSpacing: isMobile ? 0 : '0.4px',
              mt: 0.5
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                  size="small"
                >
                  {showNewPassword ? (
                    <VisibilityOffRoundedIcon sx={{ color: '#74767F' }} />
                  ) : (
                    <VisibilityRoundedIcon sx={{ color: '#74767F' }} />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {/* Confirm new password */}
        <TextField
          label="Powtórz nowe hasło"
          type={showConfirmPassword ? 'text' : 'password'}
          {...register('confirmNewPassword')}
          error={Boolean(errors.confirmNewPassword)}
          helperText={errors.confirmNewPassword?.message}
          fullWidth
          size="medium"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                  size="small"
                >
                  {showConfirmPassword ? (
                    <VisibilityOffRoundedIcon sx={{ color: '#74767F' }} />
                  ) : (
                    <VisibilityRoundedIcon sx={{ color: '#74767F' }} />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Stack>

      {/* Action buttons */}
      <Stack
        direction="row"
        justifyContent={isMobile ? 'center' : 'space-between'}
        alignItems="center"
        sx={{ mt: 3 }}
      >
        {isMobile ? (
          // Mobile: full-width submit button
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              bgcolor: '#1E1F21',
              color: '#FFFFFF',
              borderRadius: 1,
              py: 1,
              fontSize: '14px',
              fontWeight: 500,
              '&:hover': { bgcolor: '#32343A' }
            }}
          >
            Zapisz zmiany
          </Button>
        ) : (
          // Desktop: Cancel and Submit buttons
          <>
            <Button
              variant="outlined"
              onClick={onCancel}
              endIcon={<CloseIcon sx={{ fontSize: 18 }} />}
              sx={{
                borderColor: '#D0D5DD',
                color: '#1E1F21',
                borderRadius: 1,
                px: 1.5,
                py: 1,
                fontSize: '14px',
                fontWeight: 500,
                '&:hover': { borderColor: '#D0D5DD', bgcolor: 'rgba(0, 0, 0, 0.04)' }
              }}
            >
              Anuluj
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: '#1E1F21',
                color: '#FFFFFF',
                borderRadius: 1,
                px: 3,
                py: 1,
                fontSize: '14px',
                fontWeight: 500,
                '&:hover': { bgcolor: '#32343A' }
              }}
            >
              Zapisz zmiany
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default ChangePasswordForm;
