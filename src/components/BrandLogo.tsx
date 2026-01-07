import { Box, useTheme } from '@mui/material';
import logoDark from '@/assets/logo-dark.svg';
import logoLight from '@/assets/logo-light.svg';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 72,
  md: 96,
  lg: 120
};

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md' }) => {
  const theme = useTheme();
  const dimension = sizeMap[size];

  const src = theme.palette.mode === 'light' ? logoLight : logoDark;

  return (
    <Box
      component="img"
      src={src}
      alt="Cliffside Brokers"
      sx={{
        width: dimension,
        height: 'auto',
        filter: theme.palette.mode === 'light' ? 'none' : 'brightness(1.05)',
        userSelect: 'none'
      }}
    />
  );
};

export default BrandLogo;
