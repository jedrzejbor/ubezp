import React, { useState } from 'react';
import { Box } from '@mui/material';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { SxProps, Theme } from '@mui/system';
import clientSvg from '@/assets/client-icon.svg';

const ClientIcon: React.FC<SvgIconProps> = (props) => {
  const [failed, setFailed] = useState(false);
  const { sx } = props as { sx?: SxProps<Theme> };

  let size = 24;
  if (sx && typeof sx === 'object' && !Array.isArray(sx)) {
    const sxObj = sx as Record<string, unknown>;
    const maybeFontSize = sxObj.fontSize ?? sxObj.width ?? sxObj.height;
    if (typeof maybeFontSize === 'number') {
      size = maybeFontSize;
    } else if (typeof maybeFontSize === 'string') {
      const parsed = parseInt(maybeFontSize, 10);
      if (!Number.isNaN(parsed)) size = parsed;
    }
  }

  if (failed) return <Box sx={{ width: size, height: size, bgcolor: 'divider' }} />;

  return (
    <Box
      component="img"
      src={clientSvg}
      alt="clients"
      onError={() => setFailed(true)}
      sx={{ width: size, height: size, display: 'block', ...(sx as object) }}
    />
  );
};

export default ClientIcon;
